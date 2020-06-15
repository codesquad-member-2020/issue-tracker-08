package com.codesquad.issuetracker.utils;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.client.RestTemplate;

public class GithubApiUtils {

    public static <T> T requestApi(String accessToken, String url, Class<T> responseType) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        
        return new RestTemplate().exchange(url, HttpMethod.GET, new HttpEntity<>(headers), responseType).getBody();
    }
}
