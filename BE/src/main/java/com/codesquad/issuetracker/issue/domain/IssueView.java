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
@Builder
public class IssueView {

    @JsonIgnoreProperties({"authorId", "assignees", "milestoneId", "labels"})
    private Issue issue;

    private User author;

    private Milestone milestone;

    private List<User> assignees;

    private List<Label> labels;

    private List<CommentView> comments;

    public IssueView(Issue issue, User author, Milestone milestone) {
        this.issue = issue;
        this.author = author;
        this.milestone = milestone;
    }

    public static IssueView of(Issue issue, User author, Milestone milestone, List<User> assignees, List<Label> labels, List<CommentView> comments) {
        return IssueView.builder()
                .issue(issue)
                .author(author)
                .milestone(milestone)
                .assignees(assignees)
                .labels(labels)
                .comments(comments)
                .build();
    }
}
