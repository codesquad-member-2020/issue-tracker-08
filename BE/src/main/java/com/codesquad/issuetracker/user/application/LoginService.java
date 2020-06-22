package com.codesquad.issuetracker.user.application;

import com.codesquad.issuetracker.user.domain.GithubProperty;
import com.codesquad.issuetracker.user.domain.User;
import com.codesquad.issuetracker.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LoginService {

    public void login(User user, HttpServletResponse response) {
        String jwtToken = JwtUtils.createToken(user);
        List<Cookie> cookies = createCookiesByUser(user, jwtToken);
        setCookies(cookies, response);
    }

    private List<Cookie> createCookiesByUser(User user, String jwtToken) {
        List<Cookie> cookies = new ArrayList<>();
        cookies.add(new Cookie("jwt", jwtToken));
        cookies.add(new Cookie("nickname", user.getNickname()));
        cookies.add(new Cookie("avatarUrl", user.getAvatarUrl()));

        return cookies;
    }

    private void setCookies(List<Cookie> cookies, HttpServletResponse response) {
        cookies.forEach(cookie -> {
            cookie.setPath("/");
            response.addCookie(cookie);
        });
    }
}
