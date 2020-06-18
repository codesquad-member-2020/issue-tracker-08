package com.codesquad.issuetracker.comment.domain;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@NoArgsConstructor
@Embeddable
@EqualsAndHashCode
public class CommentId implements Serializable {

    private Long commentId;
}
