package com.codesquad.issuetracker.comment.domain;

import com.codesquad.issuetracker.user.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class CommentView {

    private Comment comment;

    private User user;
}
