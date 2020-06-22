package com.codesquad.issuetracker.user.ui;

import com.codesquad.issuetracker.user.application.LoginService;
import com.codesquad.issuetracker.user.domain.User;
import com.codesquad.issuetracker.user.domain.UserId;
import com.codesquad.issuetracker.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final UserRepository userRepository;

    private final LoginService loginService;

    @GetMapping("")
    public Iterable<User> userList() {
        return userRepository.findAll();
    }

    @PostMapping("")
    public ResponseEntity<String> createUser(@RequestBody User user) {
        UserId userId = getNextIdentity();
        userRepository.save(newUser);

        return new ResponseEntity<>("유저 생성 성공", HttpStatus.CREATED);
    }

    @GetMapping("/oauth/code")
    public ResponseEntity<Void> getCode() {
        HttpHeaders headers = loginService.getGithubCode();
        return new ResponseEntity<>(headers, HttpStatus.SEE_OTHER);
    }

    @GetMapping("/oauth")
    public ResponseEntity<Void> oauth(@RequestParam String code, HttpServletResponse response) throws IOException {
        loginService.login(code, response);
        return new ResponseEntity<>(HttpStatus.FOUND);
    }

    public UserId getNextIdentity() {
        return Optional.ofNullable(userRepository.findFirstByOrderByIdDesc())
                .map(user -> new UserId(user.getId().getUserId() + 1L))
                .orElseGet(() -> new UserId(1L));
    }
}
