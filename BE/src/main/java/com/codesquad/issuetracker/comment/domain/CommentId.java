package com.codesquad.issuetracker.comment.domain;

import lombok.Getter;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Getter
@Embeddable
public class CommentId implements Serializable {

    private Long commentId;
}
