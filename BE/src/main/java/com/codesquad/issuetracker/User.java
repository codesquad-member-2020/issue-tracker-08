package com.codesquad.issuetracker;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
@JsonIgnoreProperties({"id", "email", "password"})
public class User {


    private Long id;

    private String nickname;

    private String password;

    private String email;
}
