package com.codesquad.issuetracker.user.ui;

import com.codesquad.issuetracker.user.application.LoginService;
import com.codesquad.issuetracker.user.application.UserService;
import com.codesquad.issuetracker.user.domain.GithubProperty;
import com.codesquad.issuetracker.user.domain.User;
import com.codesquad.issuetracker.user.domain.UserId;
import com.codesquad.issuetracker.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.codesquad.issuetracker.user.domain.GithubProperty.getGithubCode;
import static com.codesquad.issuetracker.user.domain.GithubToken.getGithubToken;
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

    @GetMapping("/oauth/code")
    public ResponseEntity<Void> getCode() {
        return new ResponseEntity<>(getGithubCode(githubProperty), HttpStatus.SEE_OTHER);
    }

    @GetMapping("/oauth")
    public ResponseEntity<Void> oauth(@RequestParam String code, HttpServletResponse response) throws IOException {
        String accessToken = getGithubToken(githubProperty, code).getAccessToken();
        User user = requestApi(accessToken, githubProperty.getUserApiUrl(), User.class);
        UserId userId = user.getId();

        loginService.login(user, response);
        userService.createUser(userId, user);

        response.sendRedirect("/issues");

        return new ResponseEntity<>(HttpStatus.FOUND);
    }


}
