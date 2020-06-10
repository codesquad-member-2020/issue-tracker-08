package com.codesquad.issuetracker;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class IssueBoard {

    private int numberOfOpenIssue;

    private int numberOfClosedIssue;

    private List<Issue> issues;
}
