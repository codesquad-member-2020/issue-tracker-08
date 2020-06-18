package com.codesquad.issuetracker.comment.domain;

import com.codesquad.issuetracker.issue.domain.KeyOfUserAndIssue;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity(name = "Comment")
@Table(name = "comment")
@Getter
@Setter
public class Comment {

    @EmbeddedId
    private CommentId id;

    @EmbeddedId
    private KeyOfUserAndIssue commentId;

    private String content;

    private LocalDateTime createdAt;

    private boolean isHide;
}
