package com.codesquad.issuetracker.comment.domain;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class CommentId implements Serializable {

    @Column(name = "comment_id")
    private Long commentId;

    @Column(name = "issue_id")
    private Long issueId;

    @Column(name = "userId")
    private Long userId;
}
