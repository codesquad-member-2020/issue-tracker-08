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

import java.util.HashSet;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class IssueService {

    private final IssueRepository issueRepository;

    public Issue createIssue(IssueRequest issueRequest) {

        Issue issue = Issue.builder()
                .id(nextId())
                .title(issueRequest.getTitle())
                .content(issueRequest.getContent())
                .assignees(issueRequest.getAssignees())
                .labels(issueRequest.getLabels())
                .milestoneId(issueRequest.getMilestoneId())
                .isOpen(true)
                .build();

        return issueRepository.save(issue);
    }

    public IssueId nextId() {
        return new IssueId(issueRepository.count() + 1);
    }
}
