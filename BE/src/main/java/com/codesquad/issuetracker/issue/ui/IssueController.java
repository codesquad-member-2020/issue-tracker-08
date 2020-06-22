package com.codesquad.issuetracker.issue.ui;

import com.codesquad.issuetracker.issue.application.IssueService;
import com.codesquad.issuetracker.issue.domain.Filter;
import com.codesquad.issuetracker.issue.domain.Issue;
import com.codesquad.issuetracker.issue.domain.IssueBoard;
import com.codesquad.issuetracker.issue.domain.IssueId;
import com.codesquad.issuetracker.user.domain.UserId;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

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
    public IssueBoard editTitle(@PathVariable(name = "issue_id") Long issueId,
                                @RequestBody String title) {
        IssueId targetIssueId = new IssueId(issueId);
        issueService.editTitle(targetIssueId, title);
        return null;
    }

    @PatchMapping("/{issue_id}/content")
    public IssueBoard editContent(@PathVariable(name = "issue_id") Long issueId,
                                  @RequestBody String content) {
        IssueId targetIssueId = new IssueId(issueId);
        issueService.editContent(targetIssueId, content);
        return null;
    }

    @PutMapping("/{issue_id}/assignees")
    public IssueBoard modifyAssignees(@PathVariable(name = "issue_id") Long issueId,
                                      @RequestBody Set<UserId> assignees) {
        IssueId targetIssueId = new IssueId(issueId);
        issueService.reassign(targetIssueId, assignees);
        return null;
    }

    @PutMapping("/{issue_id}/labels")
    public IssueBoard modifyLabels(@PathVariable(name = "issue_id") Long issueId) {
        IssueId targetIssueId = new IssueId(issueId);
        return null;
    }

    @PutMapping("/{issue_id}/milestone")
    public IssueBoard modifyMilestone(@PathVariable(name = "issue_id") Long issueId) {
        IssueId targetIssueId = new IssueId(issueId);
        return null;
    }
}
