package com.codesquad.issuetracker.comment.domain;

import com.codesquad.issuetracker.common.BaseTimeEntity;
import com.codesquad.issuetracker.issue.domain.IssueId;
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

    private String content;

    private boolean isOpen;
}
