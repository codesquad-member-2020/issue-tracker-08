package com.codesquad.issuetracker.issue.application;

import com.codesquad.issuetracker.issue.domain.Issue;
import com.codesquad.issuetracker.issue.domain.IssueId;
import com.codesquad.issuetracker.issue.domain.IssueRepository;
import com.codesquad.issuetracker.label.domain.LabelId;
import com.codesquad.issuetracker.milestone.domain.MilestoneId;
import com.codesquad.issuetracker.user.domain.UserId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class IssueService {

    private final IssueRepository issueRepository;

    public Issue createIssue(Issue issue) {
        Issue newIssue = Issue.of(nextId(), issue);
        return issueRepository.save(newIssue);
    }

    public IssueId nextId() {
        return new IssueId(issueRepository.count() + 1);
    }

    public void changeStatus(IssueId issueId) {
        Issue issue = findIssueById(issueId);
        issue.changeStatus();
        issueRepository.save(issue);
    }

    public Issue findIssueById(IssueId issueId) {
        return issueRepository.findById(issueId).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 이슈입니다!"));
    }

    public void editTitle(IssueId issueId, String title) {
        Issue issue = findIssueById(issueId);
        issue.editTitle(title);
        issueRepository.save(issue);
    }

    public void editContent(IssueId issueId, String content) {
        Issue issue = findIssueById(issueId);
        issue.editContent(content);
        issueRepository.save(issue);
    }

    public void reassign(IssueId issueId, Set<UserId> assignees) {
        Issue issue = findIssueById(issueId);
        log.info("assignees : {}", assignees);
        issue.reassign(assignees);
        issueRepository.save(issue);
    }

    public void putLabels(IssueId issueId, Set<LabelId> labels) {
        Issue issue = findIssueById(issueId);
        issue.putLabels(labels);
        issueRepository.save(issue);
    }

    public void changeMilestone(IssueId issueId, MilestoneId targetMilestoneId) {
        Issue issue = findIssueById(issueId);
        issue.changeMilestone(targetMilestoneId);
        issueRepository.save(issue);
    }
}
