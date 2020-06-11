package com.codesquad.issuetracker;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class IssueBoard {

    private int numberOfOpenIssue;

    private int numberOfClosedIssue;

    private int numberOfLabels;

    private int numberOfMilestones;

    private List<Issue> issues;
}
