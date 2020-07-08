package com.codesquad.issuetracker.issue.application;

import com.codesquad.issuetracker.comment.domain.CommentRepository;
import com.codesquad.issuetracker.comment.domain.CommentView;
import com.codesquad.issuetracker.issue.domain.*;
import com.codesquad.issuetracker.issue.infrastructure.IssuePredicate;
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
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class IssueService {

    private final IssueViewDAO issueViewDAO;

    private final IssueRepository issueRepository;

    private final UserRepository userRepository;

    private final CommentRepository commentRepository;

    private final LabelRepository labelRepository;

    private final MileStoneRepository mileStoneRepository;

    public IssueBoard findIssuesByFilter(Filter filter) {
        List<IssueView> issues = StreamSupport.stream(issueRepository.findAll(IssuePredicate.search(filter)).spliterator(), false)
                .map(i -> IssueView.of(i,
                        userRepository.findById(i.getAuthorId()).orElseThrow(EntityNotFoundException::new),
                        findMilestone(i.getMilestoneId()),
                        StreamSupport.stream(userRepository.findAllById(i.getAssignees()).spliterator(), false).collect(Collectors.toList()),
                        StreamSupport.stream(labelRepository.findAllById(i.getLabels()).spliterator(), false).collect(Collectors.toList()),
                        commentRepository.countByIssueId(i.getId())))
                .collect(Collectors.toList());

         return IssueBoard.builder()
                .issues(issues)
                .numberOfLabels(labelRepository.count())
                .numberOfMilestones(mileStoneRepository.count())
                .numberOfOpenIssue(issueRepository.countByIsOpenTrue())
                .numberOfClosedIssue(issueRepository.countByIsOpenFalse())
                .build();
    }

    public IssueView createIssue(Issue issue, UserId userId) {
        Issue newIssue = Issue.of(getNextIdentity(), issue, userId);
        issueRepository.save(newIssue);
        return readIssue(newIssue.getId());
    }

    public void changeStatusOfIssues(List<Number> issueIds, boolean isOpen) {
        Iterable<Issue> issues = issueRepository.findAllById(issueIds.stream().map(Number::longValue).map(IssueId::new).collect(Collectors.toList()));
        issues.forEach(i -> i.changeStatus(isOpen));
        issueRepository.saveAll(issues);
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
        Milestone milestone = findMilestone(issue.getMilestoneId());
        List<User> assignees = (List<User>) userRepository.findAllById(issue.getAssignees());
        List<Label> labels = (List<Label>) labelRepository.findAllById(issue.getLabels());
        List<CommentView> commentViews = issueViewDAO.readAllComment(issueId);
        return IssueView.of(issue,author, milestone, assignees, labels, commentViews);
    }

    public void deleteMilestoneOfIssue(MilestoneId milestoneId) {
        List<Issue> issues = issueRepository.findAllByMilestoneId(milestoneId);
        issues.forEach(Issue::deleteMilestone);
        issueRepository.saveAll(issues);
    }

    public void deleteLabelOfIssue(LabelId labelId) {
        List<Issue> issues = issueRepository.findAllByLabelId(labelId);
        issues.forEach(i -> i.deleteLabel(labelId));
        issueRepository.saveAll(issues);
    }

    private Issue findIssueById(IssueId issueId) {
        return issueRepository.findById(issueId).orElseThrow(() -> new EntityNotFoundException("존재하지 않는 이슈입니다!"));
    }

    private IssueId getNextIdentity() {
        return Optional.ofNullable(issueRepository.findFirstByOrderByIdDesc())
                .map(issue -> new IssueId(issue.getId().getIssueId() + 1L))
                .orElseGet(() -> new IssueId(1L));
    }

    private Milestone findMilestone(MilestoneId milestoneId) {
        return milestoneId == null ? null : mileStoneRepository.findById(milestoneId).orElseThrow(() -> new EntityNotFoundException("존재하지 않는 마일스톤입니다!"));
    }
}
