package com.codesquad.issuetracker.issue.ui;

import com.codesquad.issuetracker.issue.domain.Filter;
import com.codesquad.issuetracker.issue.domain.IssueBoard;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/issues")
public class IssueController {

    @GetMapping("")
    public IssueBoard listIssue(Filter filter) {
        return null;
    }

    @PostMapping("")
    public IssueBoard createIssue() {
        return null;
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
