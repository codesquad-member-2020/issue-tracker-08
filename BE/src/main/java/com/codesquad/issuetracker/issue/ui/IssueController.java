package com.codesquad.issuetracker.issue.ui;

import com.codesquad.issuetracker.issue.application.IssueService;
import com.codesquad.issuetracker.issue.domain.Filter;
import com.codesquad.issuetracker.issue.domain.Issue;
import com.codesquad.issuetracker.issue.domain.IssueBoard;
import com.codesquad.issuetracker.issue.domain.IssueId;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/issues")
public class IssueController {
    
    private final IssueService issueService;

    @GetMapping("")
    public List<Issue> listIssue(Filter filter) {
        return null;
    }

    @PostMapping("")
    public Issue createIssue(@RequestBody Issue issue) {
        return issueService.createIssue(null);
    }

    @PatchMapping("")
    public ResponseEntity<Void> changeStatusOfIssues(@RequestBody List<IssueId> issueIds) {
        issueService.changeStatusOfIssues(issueIds);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
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
