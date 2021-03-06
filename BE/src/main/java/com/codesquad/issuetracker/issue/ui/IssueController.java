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
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

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
    public ResponseEntity<Void> changeStatusOfIssues(@RequestBody Map<String, Object> requestBody) {
        List<IssueId> issueIds = ((List<Number>) requestBody.get("issues"))
                .stream()
                .map(Number::longValue)
                .map(IssueId::new)
                .collect(Collectors.toList());
        boolean isOpen = (boolean) requestBody.get("isOpen");
        issueService.changeStatusOfIssues(issueIds, isOpen);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{issue_id}")
    public IssueView readIssue(@PathVariable(name = "issue_id") Long issueId) {
        IssueId targetIssueId = new IssueId(issueId);
        return issueService.readIssue(targetIssueId);
    }

    @PatchMapping("/{issue_id}")
    public ResponseEntity<Void> changeStatus(@PathVariable(name = "issue_id") Long issueId) {
        IssueId targetIssueId = new IssueId(issueId);
        issueService.changeStatus(targetIssueId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{issue_id}/titles")
    public ResponseEntity<Void> editTitle(@PathVariable(name = "issue_id") Long issueId,
                                @RequestBody Issue issue) {
        IssueId targetIssueId = new IssueId(issueId);
        issueService.editTitle(targetIssueId, issue.getTitle());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{issue_id}/content")
    public ResponseEntity<Void> editContent(@PathVariable(name = "issue_id") Long issueId,
                                  @RequestBody Issue issue) {
        IssueId targetIssueId = new IssueId(issueId);
        issueService.editContent(targetIssueId, issue.getContent());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{issue_id}/assignees")
    public ResponseEntity<Void> reassign(@PathVariable(name = "issue_id") Long issueId,
                                      @RequestBody Issue issue) {
        IssueId targetIssueId = new IssueId(issueId);
        Set<UserId> assignees = issue.getAssignees();
        issueService.reassign(targetIssueId, assignees);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{issue_id}/labels")
    public ResponseEntity<Void> putLabels(@PathVariable(name = "issue_id") Long issueId,
                                   @RequestBody Issue issue) {
        IssueId targetIssueId = new IssueId(issueId);
        Set<LabelId> labels = issue.getLabels();
        issueService.putLabels(targetIssueId, labels);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{issue_id}/milestone")
    public ResponseEntity<Void> changeMilestone(@PathVariable(name = "issue_id") Long issueId,
                                      @RequestBody Issue issue) {
        IssueId targetIssueId = new IssueId(issueId);
        if (issue.getMilestoneId() == null) {
            issueService.deleteMilestone(targetIssueId);
        } else {
            MilestoneId targetMilestoneId = new MilestoneId(issue.getMilestoneId().getMilestoneId());
            issueService.changeMilestone(targetIssueId, targetMilestoneId);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
