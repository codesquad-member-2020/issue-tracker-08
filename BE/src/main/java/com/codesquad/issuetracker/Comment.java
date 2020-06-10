package com.codesquad.issuetracker;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class Comment {

    private Long userId;

    private Long issueId;

    private String content;

    private LocalDateTime createdAt;

    private boolean isHide;
}
