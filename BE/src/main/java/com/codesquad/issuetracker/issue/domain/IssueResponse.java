package com.codesquad.issuetracker.issue.domain;

import com.codesquad.issuetracker.label.domain.Label;
import com.codesquad.issuetracker.milestone.domain.MilestoneDTO;
import com.codesquad.issuetracker.user.domain.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IssueResponse {

    private Long id;

    private String title;

    private String content;

    private Boolean isOpen;

    private LocalDateTime createdAt;

    private User author;

    private List<User> assignees;

    private List<Label> labels;

    private MilestoneDTO milestone;

    private long numberOfComment;
}
