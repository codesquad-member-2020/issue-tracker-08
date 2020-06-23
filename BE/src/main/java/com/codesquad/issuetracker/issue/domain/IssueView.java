package com.codesquad.issuetracker.issue.domain;

import com.codesquad.issuetracker.comment.domain.CommentView;
import com.codesquad.issuetracker.label.domain.Label;
import com.codesquad.issuetracker.milestone.domain.Milestone;
import com.codesquad.issuetracker.user.domain.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class IssueView {

    @JsonIgnoreProperties({"authorId", "assignees", "milestoneId", "labels"})
    private Issue issue;

    private User author;

    private List<User> assignees;

    private List<Label> labels;

    private Milestone milestone;

    private List<CommentView> comments;
}
