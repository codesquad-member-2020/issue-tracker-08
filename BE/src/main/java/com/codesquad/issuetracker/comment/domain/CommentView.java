package com.codesquad.issuetracker.comment.domain;

import com.codesquad.issuetracker.user.domain.User;
import com.codesquad.issuetracker.user.domain.UserDTO;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class CommentView {

    private Comment comment;

    private UserDTO user;

    public CommentView(Comment comment, User user) {
        this.comment = comment;
        this.user = UserDTO.from(user);
    }
}
