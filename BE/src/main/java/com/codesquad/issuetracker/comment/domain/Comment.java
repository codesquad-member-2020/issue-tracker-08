package com.codesquad.issuetracker.comment.domain;

import com.codesquad.issuetracker.common.BaseTimeEntity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "comment")
@Getter
@Setter
@NoArgsConstructor
public class Comment extends BaseTimeEntity {

    @EmbeddedId
    private CommentId id;

    private String content;

    private boolean isHide;
}
