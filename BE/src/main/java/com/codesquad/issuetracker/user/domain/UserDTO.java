package com.codesquad.issuetracker.user.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {

    private Long id;

    private String nickname;

    private String avatarUrl;

    public static UserDTO from (User user) {
        return UserDTO.builder()
                .id(user.getId().getUserId())
                .nickname(user.getNickname())
                .avatarUrl(user.getAvatarUrl())
                .build();
    }
}
