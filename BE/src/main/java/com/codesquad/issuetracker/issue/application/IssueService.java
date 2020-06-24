package com.codesquad.issuetracker.issue.application;

import com.codesquad.issuetracker.comment.domain.CommentView;
import com.codesquad.issuetracker.issue.domain.Issue;
import com.codesquad.issuetracker.issue.domain.IssueId;
import com.codesquad.issuetracker.issue.domain.IssueRepository;
import com.codesquad.issuetracker.issue.domain.IssueView;
import com.codesquad.issuetracker.issue.infrastructure.IssueViewDAO;
import com.codesquad.issuetracker.label.domain.Label;
import com.codesquad.issuetracker.label.domain.LabelId;
import com.codesquad.issuetracker.label.domain.LabelRepository;
import com.codesquad.issuetracker.milestone.domain.MileStoneRepository;
import com.codesquad.issuetracker.milestone.domain.Milestone;
import com.codesquad.issuetracker.milestone.domain.MilestoneId;
import com.codesquad.issuetracker.user.domain.User;
import com.codesquad.issuetracker.user.domain.UserId;
import com.codesquad.issuetracker.user.domain.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class IssueService {

    private final IssueViewDAO issueViewDAO;

    private final IssueRepository issueRepository;

    private final LabelRepository labelRepository;

    private final UserRepository userRepository;

    private final MileStoneRepository mileStoneRepository;

    public Issue createIssue(Issue issue) {
        Issue newIssue = Issue.of(getNextIdentity(), issue);
        return issueRepository.save(newIssue);
    }

    public void changeStatusOfIssues(List<IssueId> issueIds) {
        issueIds.forEach(this::changeStatus);
    }

    public void changeStatus(IssueId issueId) {
        Issue issue = findIssueById(issueId);
        issue.changeStatus();
        issueRepository.save(issue);
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

    public IssueView readIssue(IssueId issueId) {
        Issue issue = findIssueById(issueId);
        User author = userRepository.findById(issue.getAuthorId()).orElseThrow(() -> new EntityNotFoundException("존재하지 않는 유저입니다!"));
        Milestone milestone = mileStoneRepository.findById(issue.getMilestoneId()).orElseThrow(() -> new EntityNotFoundException("존재하지 않는 마일스톤입니다!"));
        List<User> assignees = (List<User>) userRepository.findAllById(issue.getAssignees());
        List<Label> labels = (List<Label>) labelRepository.findAllById(issue.getLabels());
        List<CommentView> commentViews = issueViewDAO.readAllComment(issueId);
        return IssueView.of(issue,author, milestone, assignees, labels, commentViews);
    }

    private Issue findIssueById(IssueId issueId) {
        return issueRepository.findById(issueId).orElseThrow(() -> new EntityNotFoundException("존재하지 않는 이슈입니다!"));
    }

    private IssueId getNextIdentity() {
        return Optional.ofNullable(issueRepository.findFirstByOrderByIdDesc())
                .map(issue -> new IssueId(issue.getId().getIssueId() + 1L))
                .orElseGet(() -> new IssueId(1L));
    }
}
