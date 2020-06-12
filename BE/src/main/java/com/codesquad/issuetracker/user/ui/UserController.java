package com.codesquad.issuetracker.user.ui;

import com.codesquad.issuetracker.user.domain.GithubProperty;
import com.codesquad.issuetracker.user.domain.GithubToken;
import com.codesquad.issuetracker.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {

    private final GithubProperty githubProperty;

    @GetMapping("/oauth/code")
    public Object getCode() {
        HttpHeaders headers = new HttpHeaders();
        URI uri = UriComponentsBuilder.fromUriString(githubProperty.getCodeUrl())
                .queryParam("client_id", githubProperty.getClientId())
                .queryParam("scope", "user")
                .build()
                .toUri();

        headers.setLocation(uri);
        return new ResponseEntity<>(headers, HttpStatus.SEE_OTHER);
    }

    @GetMapping("/oauth")
    public Object oauth(@RequestParam String code) {
        githubProperty.setCode(code);

        GithubToken githubToken = new RestTemplate().postForEntity(githubProperty.getAccessTokenUrl(), githubProperty, GithubToken.class).getBody();

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(githubToken.getAccessToken());

        User user = new RestTemplate().exchange(githubProperty.getUserApiUrl(), HttpMethod.GET, new HttpEntity<>(headers), User.class).getBody();
        return user;
    }
}
