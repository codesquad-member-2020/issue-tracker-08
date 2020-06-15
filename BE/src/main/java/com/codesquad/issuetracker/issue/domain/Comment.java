package com.codesquad.issuetracker.issue.domain;

import com.codesquad.issuetracker.user.domain.User;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User author;

    private String content;

    private LocalDateTime createdAt;

    private boolean isHide;
}
