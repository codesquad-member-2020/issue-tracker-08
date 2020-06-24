package com.codesquad.issuetracker.issue.domain;

import com.codesquad.issuetracker.common.BaseTimeEntity;
import com.codesquad.issuetracker.label.domain.LabelId;
import com.codesquad.issuetracker.milestone.domain.MilestoneId;
import com.codesquad.issuetracker.user.domain.UserId;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity(name = "Issue")
@Getter
@Setter
@Table(name = "issue")
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@ToString
public class Issue extends BaseTimeEntity {

    @EmbeddedId
    private IssueId id;

    private String title;

    private String content;

    private Boolean isOpen;

    @Embedded
    @AttributeOverride(name = "userId",
            column = @Column(name = "author_id"))
    private UserId authorId;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "assigner",
            joinColumns = @JoinColumn(name = "issue_id")
    )
    private Set<UserId> assignees = new HashSet<>();

    @Embedded
    private MilestoneId milestoneId;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "tag",
            joinColumns = @JoinColumn(name = "issue_id")
    )
    private Set<LabelId> labels = new HashSet<>();

    public static Issue of(IssueId issueId, Issue issue) {
        return Issue.builder()
                .id(issueId)
                .title(issue.title)
                .content(issue.content)
                .assignees(issue.assignees)
                .labels(issue.labels)
                .milestoneId(issue.milestoneId)
                .isOpen(true)
                .build();
    }

    public void changeStatus() {
        this.isOpen = !isOpen;
    }

    public void editTitle(String title) {
        this.title = title;
    }

    public void editContent(String content) {
        this.content = content;
    }

    public void reassign(Set<UserId> assigness) {
        this.assignees = assigness;
    }

    public void putLabels(Set<LabelId> labels) {
        this.labels = labels;
    }

    public void changeMilestone(MilestoneId milestoneId) {
        this.milestoneId = milestoneId;
    }
}
