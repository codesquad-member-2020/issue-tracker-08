package com.codesquad.issuetracker.comment.domain;

import com.codesquad.issuetracker.common.BaseTimeEntity;
import lombok.*;

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

    private String content;

    private boolean isOpen;

    public void changeStatus() {
        this.isOpen = !isOpen;
    }

    public static Comment of(CommentId commentId, String content) {
        return Comment.builder()
                .id(commentId)
                .content(content)
                .isOpen(true)
                .build();
    }
}
