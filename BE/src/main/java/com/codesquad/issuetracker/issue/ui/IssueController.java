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
        return issueService.createIssue(issue);
    }

    @PatchMapping("")
    public ResponseEntity<Void> changeStatusOfIssues(@RequestBody List<IssueId> issueIds) {
        issueService.changeStatusOfIssues(issueIds);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{issue_id}")
    public IssueBoard readIssue(@PathVariable(name = "issue_id") Long issueId) {
        return null;
    }

    @PatchMapping("/{issue_id}")
    public IssueBoard changeStatus(@PathVariable(name = "issue_id") Long issueId) {
        IssueId targetIssueId = new IssueId(issueId);
        issueService.changeStatus(targetIssueId);
        return null;
    }

    @PatchMapping("/{issue_id}/titles")
    public IssueBoard editTitle(@PathVariable(name = "issue_id") Long issueId) {
        return null;
    }

    @PatchMapping("/{issue_id}/content")
    public IssueBoard editContent(@PathVariable(name = "issue_id") Long issueId) {
        return null;
    }

    @PutMapping("/{issue_id}/assignees")
    public IssueBoard modifyAssignees(@PathVariable(name = "issue_id") Long issueId) {
        return null;
    }

    @PutMapping("/{issue_id}/labels")
    public IssueBoard modifyLabels(@PathVariable(name = "issue_id") Long issueId) {
        return null;
    }

    @PutMapping("/{issue_id}/milestone")
    public IssueBoard modifyMilestone(@PathVariable(name = "issue_id") Long issueId) {
        return null;
    }
}
