package com.codesquad.issuetracker.issue.ui;

import com.codesquad.issuetracker.issue.application.IssueRequest;
import com.codesquad.issuetracker.issue.application.IssueService;
import com.codesquad.issuetracker.issue.domain.Filter;
import com.codesquad.issuetracker.issue.domain.Issue;
import com.codesquad.issuetracker.issue.domain.IssueBoard;
import com.codesquad.issuetracker.issue.domain.IssueDTO;
import com.codesquad.issuetracker.label.domain.LabelId;
import com.codesquad.issuetracker.milestone.domain.MilestoneId;
import com.codesquad.issuetracker.user.domain.UserId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/issues")
public class IssueController {

    private final IssueService issueService;

    @GetMapping("")
    public List<Issue> listIssue(Filter filter) {
        log.info("filter: {}", filter);
        return null;
    }

    @PostMapping("")
    public Issue createIssue(@RequestBody IssueDTO requestIssue) {
        String title = requestIssue.getTitle();
        String content = requestIssue.getContent();

        Set<UserId> assignees = requestIssue.getAssignees().stream().map(UserId::new).collect(Collectors.toSet());
        Set<LabelId> labels = requestIssue.getLabels().stream().map(LabelId::new).collect(Collectors.toSet());

        MilestoneId milestoneId = new MilestoneId(requestIssue.getMilestoneId());

        return issueService.createIssue(new IssueRequest(title, content, assignees, labels, milestoneId));
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
