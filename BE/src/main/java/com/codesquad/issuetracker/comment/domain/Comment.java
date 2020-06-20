package com.codesquad.issuetracker.comment.domain;

import com.codesquad.issuetracker.common.BaseTimeEntity;
import com.codesquad.issuetracker.issue.domain.IssueId;
import com.codesquad.issuetracker.user.domain.UserId;
import lombok.*;

import javax.persistence.Embedded;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "comment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Comment extends BaseTimeEntity {

    @EmbeddedId
    private CommentId id;

    @Embedded
    private IssueId issueId;

    @Embedded
    private UserId userId;

    private String content;

    private boolean isOpen;

    public void changeStatus() {
        this.isOpen = !isOpen;
    }
}
