package com.codesquad.issuetracker.user.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@ToString
@Entity
@Setter
public class User {

    @JsonProperty("id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonProperty("login")
    private String nickname;

    @JsonProperty("avatar_url")
    private String avatarUrl;

    @JsonProperty("email")
    private String email;
}
