package com.codesquad.issuetracker.issue.domain;

import com.codesquad.issuetracker.comment.domain.Comment;
import com.codesquad.issuetracker.label.domain.Label;
import com.codesquad.issuetracker.milestone.domain.Milestone;
import com.codesquad.issuetracker.user.domain.User;

import java.util.List;

public class IssueView {

    private Issue issue;

    private User author;

    private List<User> assignees;

    private List<Label> labels;

    private Milestone milestone;

    private List<Comment> comments;
}
