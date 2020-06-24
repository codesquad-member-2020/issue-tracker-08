package com.codesquad.issuetracker.issue.ui;

import com.codesquad.issuetracker.comment.domain.CommentView;
import com.codesquad.issuetracker.issue.application.IssueService;
import com.codesquad.issuetracker.issue.domain.*;
import com.codesquad.issuetracker.issue.infrastructure.IssueViewDAO;
import com.codesquad.issuetracker.label.domain.Label;
import com.codesquad.issuetracker.label.domain.LabelId;
import com.codesquad.issuetracker.label.domain.LabelRepository;
import com.codesquad.issuetracker.milestone.domain.MilestoneId;
import com.codesquad.issuetracker.user.domain.User;
import com.codesquad.issuetracker.user.domain.UserId;
import com.codesquad.issuetracker.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
@RequestMapping("/issues")
public class IssueController {

    private final Logger logger = LoggerFactory.getLogger(IssueController.class);

    private final IssueService issueService;

    private final IssueViewDAO issueViewDAO;

    private final LabelRepository labelRepository;

    private final UserRepository userRepository;

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
    public IssueView readIssue(@PathVariable(name = "issue_id") Long issueId) {
        IssueId targetIssueId = new IssueId(issueId);
        IssueView issueView = issueViewDAO.read(targetIssueId);
        List<CommentView> commentViews = issueViewDAO.readAllComment(targetIssueId);
        List<Label> labels = labelRepository.findAllByIssueId(targetIssueId);
        List<User> assignees = userRepository.findByIdIssueId(targetIssueId);
        return new IssueView(issueView, assignees, labels, commentViews);
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
                                      @RequestBody Long milestoneId) {
        IssueId targetIssueId = new IssueId(issueId);
        MilestoneId targetMilestoneId = new MilestoneId(milestoneId);
        issueService.changeMilestone(targetIssueId, targetMilestoneId);
        return null;
    }
}
