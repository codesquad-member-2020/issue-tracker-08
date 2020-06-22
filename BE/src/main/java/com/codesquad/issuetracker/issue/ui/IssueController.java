package com.codesquad.issuetracker.issue.ui;

import com.codesquad.issuetracker.issue.application.IssueService;
import com.codesquad.issuetracker.issue.domain.Filter;
import com.codesquad.issuetracker.issue.domain.Issue;
import com.codesquad.issuetracker.issue.domain.IssueBoard;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/issues")
public class IssueController {

    private final Logger logger = LoggerFactory.getLogger(IssueController.class);

    private final IssueService issueService;

    @GetMapping("")
    public List<Issue> listIssue(Filter filter) {
        return null;
    }

    @PostMapping("")
    public Issue createIssue(@RequestBody Issue issue) {
        return issueService.createIssue(issue);
    }

    @PatchMapping("")
    public IssueBoard changeStatusOfIssues() {
        return null;
    }

    @GetMapping("/{issue_id}")
    public IssueBoard readIssue() {
        return null;
    }

    @PatchMapping("/{issue_id}")
    public IssueBoard changeStatus() {
        return null;
    }

    @PatchMapping("/{issue_id}/titles")
    public IssueBoard editTitle() {
        return null;
    }

    @PatchMapping("/{issue_id}/content")
    public IssueBoard editContent() {
        return null;
    }

    @PutMapping("/{issue_id}/assignees")
    public IssueBoard modifyAssignees() {
        return null;
    }

    @PutMapping("/{issue_id}/labels")
    public IssueBoard modifyLabels() {
        return null;
    }

    @PutMapping("/{issue_id}/milestone")
    public IssueBoard modifyMilestone() {
        return null;
    }
}
