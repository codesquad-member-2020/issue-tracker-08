package com.codesquad.issuetracker.issue.application;

import com.codesquad.issuetracker.label.domain.LabelId;
import com.codesquad.issuetracker.milestone.domain.MilestoneId;
import com.codesquad.issuetracker.user.domain.UserId;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Set;

@Getter
@AllArgsConstructor
public class IssueRequest {

    private String title;

    private String content;

    private Set<UserId> assignees;

    private Set<LabelId> labels;

    private MilestoneId milestoneId;
}
