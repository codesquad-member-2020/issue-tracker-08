package com.codesquad.issuetracker.issue.domain;

import com.codesquad.issuetracker.comment.domain.CommentView;
import com.codesquad.issuetracker.label.domain.Label;
import com.codesquad.issuetracker.milestone.domain.Milestone;
import com.codesquad.issuetracker.user.domain.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class IssueView {

    @JsonIgnoreProperties({"authorId", "assignees", "milestoneId", "labels"})
    @NonNull
    private Issue issue;

    @NonNull
    private User author;

    @NonNull
    private Milestone milestone;

    private List<User> assignees;

    private List<Label> labels;

    private List<CommentView> comments;

    public IssueView(IssueView issueView, List<User> assignees, List<Label> labels, List<CommentView> comments) {
        this.issue = issueView.issue;
        this.author = issueView.author;
        this.milestone = issueView.milestone;
        this.assignees = assignees;
        this.labels = labels;
        this.comments = comments;
    }
}
