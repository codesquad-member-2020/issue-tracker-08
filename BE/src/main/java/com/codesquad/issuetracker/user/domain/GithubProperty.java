package com.codesquad.issuetracker.user.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Getter
@Setter
@Component
@ConfigurationProperties("github")
public class GithubProperty {

    @JsonProperty("code")
    private String code;

    @JsonProperty("client_id")
    private String clientId;

    @JsonProperty("client_secret")
    private String clientSecret;

    @JsonIgnore
    private String codeUrl;

    @JsonIgnore
    private String userApiUrl;

    @JsonIgnore
    private String accessTokenUrl;

}
