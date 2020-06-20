package com.codesquad.issuetracker.comment.domain;

import com.codesquad.issuetracker.issue.domain.IssueId;
import com.codesquad.issuetracker.user.domain.UserId;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CommentQuery {

    private CommentId commentId;

    private IssueId issueId;

    private UserId userId;

    private String content;
}
