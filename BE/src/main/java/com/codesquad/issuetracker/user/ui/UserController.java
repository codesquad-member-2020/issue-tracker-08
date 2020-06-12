package com.codesquad.issuetracker.user.ui;

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
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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
    public Object oauth(@RequestParam String code, HttpServletResponse response) throws IOException {
        githubProperty.setCode(code);
        GithubToken githubToken = new RestTemplate().postForEntity(githubProperty.getAccessTokenUrl(), githubProperty, GithubToken.class).getBody();

        User user = GithubApiUtils.requestApi(githubToken.getAccessToken(), githubProperty.getUserApiUrl(), User.class);

        Map<String, Object> userMap = new ObjectMapper().convertValue(user, Map.class);

        String jwtToken = JwtUtils.createToken(userMap);

        List<Cookie> cookies = new ArrayList<>();
        cookies.add(new Cookie("jwt", jwtToken));
        cookies.add(new Cookie("nickname", user.getNickname()));
        cookies.add(new Cookie("avatarUrl", user.getAvatarUrl()));

        cookies.forEach(cookie -> {
            cookie.setPath("/");
            response.addCookie(cookie);
        });

        response.sendRedirect("/");
        return new ResponseEntity<>(HttpStatus.FOUND);
    }
}
