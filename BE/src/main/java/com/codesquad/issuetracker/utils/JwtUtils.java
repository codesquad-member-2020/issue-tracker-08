package com.codesquad.issuetracker.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
public class JwtUtils {

    public static String jwtKey;

    @Value("${jwt.key}")
    public void setJwtKey(String key) {
        jwtKey = key;
    }

    public static String createToken(Map<String, Object> payloads) {
        Date expirationDate = new Date(System.currentTimeMillis() + (1000 * 60 * 60));

        Map<String, Object> header = new HashMap<>();
        header.put("typ", "JWT");
        header.put("alg", "HS256");

        return Jwts.builder()
                .setExpiration(expirationDate)
                .setHeader(header)
                .setClaims(payloads)
                .signWith(SignatureAlgorithm.HS256, jwtKey.getBytes())
                .compact();
    }

    public static Claims decrypt(String jwtToken) {
        Claims claims = null;

        try {
            claims = Jwts.parser()
                    .setSigningKey(jwtKey.getBytes())
                    .parseClaimsJws(jwtToken)
                    .getBody();
        } catch (Exception e) {
            throw new JwtException("잘못된 JWT 토큰입니다", e.getCause());
        }

        return claims;
    }
}
