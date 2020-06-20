package com.codesquad.issuetracker.user.ui;

import com.codesquad.issuetracker.user.application.LoginService;
import com.codesquad.issuetracker.user.domain.GithubProperty;
import com.codesquad.issuetracker.user.domain.GithubToken;
import com.codesquad.issuetracker.user.domain.User;
import com.codesquad.issuetracker.utils.GithubApiUtils;
import com.codesquad.issuetracker.utils.JwtUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final LoginService loginService;

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
