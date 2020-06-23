package com.codesquad.issuetracker.issue.domain;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IssueBoard {

    private List<IssueResponse> issues;

    private long numberOfLabels;

    private long numberOfMilestones;

    private long numberOfOpenIssues;

    private long numberOfClosedIssues;
}
