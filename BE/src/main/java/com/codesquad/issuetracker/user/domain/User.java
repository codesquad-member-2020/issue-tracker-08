package com.codesquad.issuetracker.user.domain;

import com.codesquad.issuetracker.common.exception.UnauthorizedException;
import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.validation.constraints.Size;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class User {

    @EmbeddedId
    private UserId id;

    @JsonAlias({"login", "nickname"})
    @Size(max = 50)
    @Column(name = "nickname", unique = true)
    private String nickname;

    @JsonProperty("avatar_url")
    private String avatarUrl = "https://codesquad-project.s3.ap-northeast-2.amazonaws.com/sad.jpg";

    @JsonProperty("email")
    private String email;

    private String password;

    public static User of(UserId userId, User user) {
        return User.builder()
                .id(userId)
                .nickname(user.getNickname())
                .avatarUrl(user.getAvatarUrl())
                .email(user.getEmail())
                .password(user.password)
                .build();
    }

    public void checkPassword(User user) {
        if(!this.nickname.equals(user.nickname) || !this.password.equals(user.password)) {
            throw new UnauthorizedException("아이디 또는 비밀번호가 틀렸습니다!");
        }
    }
}
