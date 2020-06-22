package com.codesquad.issuetracker.user.application;

import com.codesquad.issuetracker.user.domain.GithubProperty;
import com.codesquad.issuetracker.user.domain.GithubToken;
import com.codesquad.issuetracker.user.domain.User;
import com.codesquad.issuetracker.user.domain.UserRepository;
import com.codesquad.issuetracker.utils.GithubApiUtils;
import com.codesquad.issuetracker.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final GithubProperty githubProperty;

    public HttpHeaders getGithubCode() {
        HttpHeaders headers = new HttpHeaders();
        URI uri = UriComponentsBuilder.fromUriString(githubProperty.getCodeUrl())
                .queryParam("client_id", githubProperty.getClientId())
                .queryParam("scope", "user")
                .build()
                .toUri();

        headers.setLocation(uri);

        return headers;
    }

    public void login(String code, HttpServletResponse response) throws IOException {
        String jwtToken = JwtUtils.createToken(user);
        List<Cookie> cookies = createCookiesByUser(user, jwtToken);
        setCookies(cookies, response);
    }

    public GithubToken getGithubToken(String code) {
        githubProperty.setCode(code);
        return new RestTemplate().postForEntity(githubProperty.getAccessTokenUrl(), githubProperty, GithubToken.class).getBody();
    }

    private List<Cookie> createCookiesByUser(User user, String jwtToken) {
        List<Cookie> cookies = new ArrayList<>();
        cookies.add(new Cookie("jwt", jwtToken));
        cookies.add(new Cookie("nickname", user.getNickname()));
        cookies.add(new Cookie("avatarUrl", user.getAvatarUrl()));

        return cookies;
    }

    private void setCookies(List<Cookie> cookies, HttpServletResponse response) throws IOException {
        cookies.forEach(cookie -> {
            cookie.setPath("/");
            response.addCookie(cookie);
        });

        response.sendRedirect("/api/issues");
    }
}
