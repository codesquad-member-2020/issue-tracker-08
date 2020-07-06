package com.codesquad.issuetracker.issue.ui;

import com.codesquad.issuetracker.issue.application.IssueService;
import com.codesquad.issuetracker.issue.domain.*;
import com.codesquad.issuetracker.label.domain.LabelId;
import com.codesquad.issuetracker.milestone.domain.MilestoneId;
import com.codesquad.issuetracker.user.domain.UserId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Set;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/issues")
public class IssueController {

    private final Logger logger = LoggerFactory.getLogger(IssueController.class);

    private final IssueService issueService;

    @GetMapping("")
    public IssueBoard listIssue(Filter filter) {
        log.info("filter: {}", filter);
        return issueService.findIssuesByFilter(filter);
    }

    @PostMapping("")
    public IssueView createIssue(@RequestBody Issue issue,
                             HttpServletRequest request) {
        UserId authorId = new UserId((Long) request.getAttribute("id"));
        return issueService.createIssue(issue, authorId);
    }

    @PatchMapping("")
    public ResponseEntity<Void> changeStatusOfIssues(@RequestBody List<IssueId> issueIds) {
        issueService.changeStatusOfIssues(issueIds);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{issue_id}")
    public IssueView readIssue(@PathVariable(name = "issue_id") Long issueId) {
        IssueId targetIssueId = new IssueId(issueId);
        return issueService.readIssue(targetIssueId);
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
    public IssueBoard reassign(@PathVariable(name = "issue_id") Long issueId,
                                      @RequestBody Issue issue) {
        IssueId targetIssueId = new IssueId(issueId);
        Set<UserId> assignees = issue.getAssignees();
        issueService.reassign(targetIssueId, assignees);
        return null;
    }

    @PutMapping("/{issue_id}/labels")
    public IssueBoard putLabels(@PathVariable(name = "issue_id") Long issueId,
                                   @RequestBody Issue issue) {
        IssueId targetIssueId = new IssueId(issueId);
        Set<LabelId> labels = issue.getLabels();
        issueService.putLabels(targetIssueId, labels);
        return null;
    }

    @PutMapping("/{issue_id}/milestone")
    public IssueBoard changeMilestone(@PathVariable(name = "issue_id") Long issueId,
                                      @RequestBody Issue issue) {
        IssueId targetIssueId = new IssueId(issueId);
        MilestoneId targetMilestoneId = new MilestoneId(issue.getMilestoneId().getMilestoneId());
        issueService.changeMilestone(targetIssueId, targetMilestoneId);
        return null;
    }
}
