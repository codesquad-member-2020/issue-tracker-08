package com.codesquad.issuetracker;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
@JsonIgnoreProperties({"id", "email", "password"})
public class User {

    private Long id;

    @NonNull
    private String nickname;

    private String password;

    private String email;

    @NonNull
    private String avatarUrl;
}
