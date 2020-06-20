package com.codesquad.issuetracker.user.ui;

import com.codesquad.issuetracker.user.application.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final LoginService loginService;

    @GetMapping("")
    public Object userList() {
        return null;
    }

    @PostMapping("")
    public Object createUser() {
        return null;
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
}
