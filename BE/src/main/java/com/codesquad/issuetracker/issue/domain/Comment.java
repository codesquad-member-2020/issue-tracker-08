package com.codesquad.issuetracker.issue.domain;

import com.codesquad.issuetracker.user.domain.User;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.time.LocalDateTime;

@Entity
public class Comment {

    @Id
    private Long id;

    @ManyToOne
    private User author;

    private String content;

    private LocalDateTime createdAt;

    private boolean isHide;
}
