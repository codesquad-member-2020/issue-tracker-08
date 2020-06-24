package com.codesquad.issuetracker.issue.domain;

import com.codesquad.issuetracker.comment.domain.CommentView;
import com.codesquad.issuetracker.label.domain.Label;
import com.codesquad.issuetracker.label.domain.LabelDTO;
import com.codesquad.issuetracker.milestone.domain.Milestone;
import com.codesquad.issuetracker.milestone.domain.MilestoneDTO;
import com.codesquad.issuetracker.user.domain.User;
import com.codesquad.issuetracker.user.domain.UserDTO;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@Builder
public class IssueView {

    private Long id;

    private String title;

    private String content;

    private Boolean isOpen;

    private LocalDateTime createdAt;

    private long numberOfComment;

    private UserDTO author;

    private MilestoneDTO milestone;

    private List<UserDTO> assignees;

    private List<LabelDTO> labels;

    private List<CommentView> comments;

    public static IssueView of(Issue issue, User author, Milestone milestone, List<User> assignees, List<Label> labels, List<CommentView> comments) {
        return IssueView.builder()
                .id(issue.getId().getIssueId())
                .title(issue.getTitle())
                .content(issue.getContent())
                .isOpen(issue.getIsOpen())
                .createdAt(issue.getCreatedAt())
                .numberOfComment(comments.size())
                .author(UserDTO.from(author))
                .milestone(MilestoneDTO.from(milestone))
                .assignees(assignees.stream()
                        .map(UserDTO::from)
                        .collect(Collectors.toList()))
                .labels(labels.stream()
                        .map(LabelDTO::from)
                        .collect(Collectors.toList()))
                .comments(comments)
                .build();
    }

    public static IssueView of(Issue issue, User author, Milestone milestone, List<User> assignees, List<Label> labels, long numberOfComment) {
        return IssueView.builder()
                .id(issue.getId().getIssueId())
                .title(issue.getTitle())
                .content(issue.getContent())
                .isOpen(issue.getIsOpen())
                .createdAt(issue.getCreatedAt())
                .numberOfComment(numberOfComment)
                .author(UserDTO.from(author))
                .milestone(MilestoneDTO.from(milestone))
                .assignees(assignees.stream()
                        .map(UserDTO::from)
                        .collect(Collectors.toList()))
                .labels(labels.stream()
                        .map(LabelDTO::from)
                        .collect(Collectors.toList()))
                .build();
    }
}
