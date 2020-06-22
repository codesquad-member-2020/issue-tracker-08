package com.codesquad.issuetracker.issue.ui;

import com.codesquad.issuetracker.issue.application.IssueService;
import com.codesquad.issuetracker.issue.domain.Filter;
import com.codesquad.issuetracker.issue.domain.Issue;
import com.codesquad.issuetracker.issue.domain.IssueBoard;
import com.codesquad.issuetracker.issue.domain.IssueId;
import com.codesquad.issuetracker.label.domain.LabelId;
import com.codesquad.issuetracker.milestone.domain.MilestoneId;
import com.codesquad.issuetracker.user.domain.UserId;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

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
    public Issue readIssue(@PathVariable(name = "issue_id") Long issueId) {
        IssueId targetIssueId = new IssueId(issueId);
        return issueService.read(targetIssueId);
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
                                      @RequestBody Issue issue) {
        IssueId targetIssueId = new IssueId(issueId);
        Set<UserId> assignees = issue.getAssignees();
        issueService.reassign(targetIssueId, assignees);
        return null;
    }

    @PutMapping("/{issue_id}/labels")
    public IssueBoard modifyLabels(@PathVariable(name = "issue_id") Long issueId,
                                   @RequestBody Issue issue) {
        IssueId targetIssueId = new IssueId(issueId);
        Set<LabelId> labels = issue.getLabels();
        issueService.putLabels(targetIssueId, labels);
        return null;
    }

    @PutMapping("/{issue_id}/milestone")
    public IssueBoard modifyMilestone(@PathVariable(name = "issue_id") Long issueId,
                                      @RequestBody Long milestoneId) {
        IssueId targetIssueId = new IssueId(issueId);
        MilestoneId targetMilestoneId = new MilestoneId(milestoneId);
        issueService.changeMilestone(targetIssueId, targetMilestoneId);
        return null;
    }
}
