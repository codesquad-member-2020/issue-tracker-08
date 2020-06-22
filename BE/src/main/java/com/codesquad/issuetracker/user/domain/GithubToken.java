package com.codesquad.issuetracker.user.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import org.springframework.web.client.RestTemplate;

@Getter
public class GithubToken {

    @JsonProperty("access_token")
    private String accessToken;

    @JsonProperty("token_type")
    private String tokenType;

    private String scope;

    public static GithubToken getGithubToken(GithubProperty githubProperty, String code) {
        githubProperty.setCode(code);
        return new RestTemplate().postForEntity(githubProperty.getAccessTokenUrl(), githubProperty, GithubToken.class).getBody();
    }
}
