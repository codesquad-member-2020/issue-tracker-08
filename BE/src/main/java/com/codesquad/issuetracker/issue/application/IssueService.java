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
import com.codesquad.issuetracker.user.application.UserService;
import com.codesquad.issuetracker.user.domain.User;
import com.codesquad.issuetracker.user.domain.UserId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class IssueService {

    private final IssueViewDAO issueViewDAO;

    private final IssueRepository issueRepository;

    private final UserService userService;

    private final CommentRepository commentRepository;

    private final LabelRepository labelRepository;

    private final MileStoneRepository mileStoneRepository;

    public IssueBoard findIssuesByFilter(Filter filter) {
        Page<Issue> pages = issueRepository.findAll(IssuePredicate.search(filter), filter.getPageRequest());
        List<IssueView> issues = pages.stream()
                .map(i -> IssueView.of(i,
                        userService.findById(i.getAuthorId()),
                        findMilestone(i.getMilestoneId()),
                        userService.getAllById(i.getAssignees()),
                        findAllLabelsById(i.getLabels()),
                        commentRepository.countByIssueId(i.getId())))
                .collect(Collectors.toList());

         return IssueBoard.builder()
                .issues(issues)
                .numberOfLabels(labelRepository.count())
                .numberOfMilestones(mileStoneRepository.count())
                .numberOfOpenIssue(issueRepository.countByIsOpenTrue())
                .numberOfClosedIssue(issueRepository.countByIsOpenFalse())
                .numberOfPage(pages.getTotalPages())
                .build();
    }

    public IssueView createIssue(Issue issue, UserId userId) {
        if (!userService.containsAll(issue.getAssignees())) {
            throw new EntityNotFoundException("존재하지 않는 회원입니다!");
        }

        if (!containsAllLabels(issue.getLabels())) {
            throw new EntityNotFoundException("존재하지 않는 라벨입니다!");
        }

        Optional.ofNullable(issue.getMilestoneId()).ifPresent(milestoneId -> {
            if (mileStoneRepository.countById(milestoneId) == 0) {
                throw new EntityNotFoundException("존재하지 않는 마일스톤입니다!");
            }
        });

        Issue newIssue = Issue.of(getNextIdentity(), issue, userId);
        issueRepository.save(newIssue);
        return readIssue(newIssue.getId());
    }

    public void changeStatusOfIssues(List<IssueId> issueIds, boolean isOpen) {
        Iterable<Issue> issues = issueRepository.findAllById(issueIds);
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
        issue.reassign(userService.getAllById(assignees));
        issueRepository.save(issue);
    }

    public void putLabels(IssueId issueId, Set<LabelId> labels) {
        Issue issue = findIssueById(issueId);
        issue.putLabels(findAllLabelsById(labels));
        issueRepository.save(issue);
    }

    public void changeMilestone(IssueId issueId, MilestoneId targetMilestoneId) {
        Issue issue = findIssueById(issueId);
        issue.changeMilestone(findMilestone(targetMilestoneId));
        issueRepository.save(issue);
    }

    public void deleteMilestone(IssueId issueId) {
        Issue issue = findIssueById(issueId);
        issue.deleteMilestone();
        issueRepository.save(issue);
    }

    public IssueView readIssue(IssueId issueId) {
        Issue issue = findIssueById(issueId);
        User author = userService.findById(issue.getAuthorId());
        Milestone milestone = findMilestone(issue.getMilestoneId());
        List<User> assignees = userService.getAllById(issue.getAssignees());
        List<Label> labels = findAllLabelsById(issue.getLabels());
        List<CommentView> commentViews = issueViewDAO.readAllComment(issueId);
        return IssueView.of(issue,author, milestone, assignees, labels, commentViews);
    }

    public void deleteMilestoneOfIssues(MilestoneId milestoneId) {
        List<Issue> issues = issueRepository.findAllByMilestoneId(milestoneId);
        issues.forEach(Issue::deleteMilestone);
        issueRepository.saveAll(issues);
    }

    public void deleteLabelOfIssues(LabelId labelId) {
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

    private List<Label> findAllLabelsById(Set<LabelId> labelIds) {
        List<Label> labels = (List<Label>) labelRepository.findAllById(labelIds);
        if (labels.size() == labelIds.size()) {
            return labels;
        }
        throw new EntityNotFoundException("존재하지 않는 라벨입니다!");
    }

    private boolean containsAllLabels(Set<LabelId> labelIds) {
        return labelIds.size() == ((List<Label>) labelRepository.findAllById(labelIds)).size();
    }
}
