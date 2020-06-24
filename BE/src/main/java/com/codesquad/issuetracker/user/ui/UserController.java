package com.codesquad.issuetracker.user.ui;

import com.codesquad.issuetracker.user.application.LoginService;
import com.codesquad.issuetracker.user.application.UserService;
import com.codesquad.issuetracker.user.domain.GithubProperty;
import com.codesquad.issuetracker.user.domain.User;
import com.codesquad.issuetracker.user.domain.UserId;
import com.codesquad.issuetracker.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Optional;

import static com.codesquad.issuetracker.utils.GithubApiUtils.requestApi;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final GithubProperty githubProperty;

    private final UserRepository userRepository;

    private final LoginService loginService;

    private final UserService userService;

    @GetMapping("")
    public Iterable<User> userList() {
        return userRepository.findAll();
    }

    @PostMapping("")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        UserId userId = userService.getNextIdentity();
        userService.createUser(userId, user);
        return new ResponseEntity<>("유저 생성 성공", HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user, HttpServletResponse response) throws IOException {
        User loginUser = Optional.ofNullable(userRepository.findByNickname(user.getNickname())).orElseThrow(() -> new EntityNotFoundException("없는 유저입니다!"));
        loginUser.checkPassword(user);

        loginService.login(loginUser, response);
        response.sendRedirect("/IssueListPage");

        return new ResponseEntity<>("로그인 성공", HttpStatus.CREATED);
    }

    @GetMapping("/oauth/code")
    public ResponseEntity<Void> getCode() {
        return new ResponseEntity<>(getGithubCode(githubProperty), HttpStatus.SEE_OTHER);
    }

    @GetMapping("/oauth")
    public ResponseEntity<Void> oauth(@RequestParam String code, HttpServletResponse response) throws IOException {
        String accessToken = loginService.getGithubToken(githubProperty, code).getAccessToken();
        User user = requestApi(accessToken, githubProperty.getUserApiUrl(), User.class);
        UserId userId = userService.getNextIdentity();

        loginService.login(user, response);
        userService.createUser(userId, user);

        response.sendRedirect("/IssueListPage");

        return new ResponseEntity<>(HttpStatus.FOUND);
    }

    private HttpHeaders getGithubCode(GithubProperty githubProperty) {
        HttpHeaders headers = new HttpHeaders();

        URI uri = UriComponentsBuilder.fromUriString(githubProperty.getCodeUrl())
                .queryParam("client_id", githubProperty.getClientId())
                .queryParam("scope", "user")
                .build()
                .toUri();

        headers.setLocation(uri);

        return headers;
    }
}
