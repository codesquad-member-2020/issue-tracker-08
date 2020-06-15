package com.codesquad.issuetracker.issue.ui;

import com.codesquad.issuetracker.issue.domain.IssueBoard;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/issues")
public class IssueController {

    @GetMapping("")
    public IssueBoard listIssue() {
        return null;
    }

    @GetMapping("")
    public IssueBoard createIssue() {
        return null;
    }

    @GetMapping("")
    public IssueBoard changeStatusOfIssues() {
        return null;
    }

    @GetMapping("")
    public IssueBoard readIssue() {
        return null;
    }

    @GetMapping("")
    public IssueBoard changeStatus() {
        return null;
    }

    @GetMapping("")
    public IssueBoard editTitle() {
        return null;
    }

    @GetMapping("")
    public IssueBoard editContent() {
        return null;
    }

    @GetMapping("")
    public IssueBoard modifyAssignees() {
        return null;
    }

    @GetMapping("")
    public IssueBoard modifyLabels() {
        return null;
    }

    @GetMapping("")
    public IssueBoard modifyMilestone() {
        return null;
    }
}
