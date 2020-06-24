package com.codesquad.issuetracker.user.infrastructure;

import com.codesquad.issuetracker.common.exception.UnauthorizedException;
import com.codesquad.issuetracker.user.domain.User;
import com.codesquad.issuetracker.utils.JwtUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Component
public class LoginInterceptor extends HandlerInterceptorAdapter {

    public static final String COOKIE_JWT = "jwt";

    @Override
    public boolean preHandle(HttpServletRequest request,
                             HttpServletResponse response,
                             Object handler) {

        Cookie[] cookies = Optional.ofNullable(request.getCookies()).orElseThrow(UnauthorizedException::new);
        String jwtToken = getJwtToken(cookies);

        Claims claims = JwtUtils.decrypt(jwtToken);
        User loginUser = new ObjectMapper().convertValue(claims, User.class);

        request.setAttribute("id", loginUser.getId().getUserId());
        return true;
    }

    private String getJwtToken(Cookie[] cookies) {
        List<Cookie> cookieList = Arrays.stream(cookies).filter(cookie -> cookie.getName().equals(COOKIE_JWT)).collect(Collectors.toList());
        if (cookieList.size() != 1) {
            throw new IllegalArgumentException("JWT 쿠키가 없거나 여러개 존재합니다");
        }

        return cookieList.get(0).getValue();
    }
}
