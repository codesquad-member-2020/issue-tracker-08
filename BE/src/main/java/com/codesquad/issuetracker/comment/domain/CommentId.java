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
@ToString
public class CommentId implements Serializable {

    @Column(name = "comment_id")
    private Long commentId;
}
