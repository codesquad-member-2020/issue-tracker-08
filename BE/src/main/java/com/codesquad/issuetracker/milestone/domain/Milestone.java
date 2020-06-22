package com.codesquad.issuetracker.milestone.domain;

import com.codesquad.issuetracker.common.BaseTimeEntity;
import com.codesquad.issuetracker.issue.domain.Issue;
import com.codesquad.issuetracker.issue.domain.IssueId;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Milestone extends BaseTimeEntity {

    @EmbeddedId
    private MilestoneId id;

    @ElementCollection (fetch = FetchType.EAGER)
    @CollectionTable (
            name = "issue",
            joinColumns = @JoinColumn(name = "milestone_id")
    )
    Set<IssueId> issues = new HashSet<>();

    @Size(max = 50)
    @Column(name = "title", unique = true)
    private String title;

    @JsonProperty(value = "due_date")
    private LocalDate dueDate;

    private String description;

    private boolean isOpen = true;

    @Transient
    public long numberOfOpenIssue;

    @Transient
    public long numberOfClosedIssue;

    @Transient
    public int achievementRate;

    public void setMetaData(List<Issue> issues) {
        this.numberOfOpenIssue = countNumberOfOpenIssue(issues);
        this.numberOfClosedIssue = countNumberOfClosedIssue(issues);
        this.achievementRate = calculateAchievementRate(issues.size());
    }

    private long countNumberOfOpenIssue(List<Issue> issue) {
        return issue.stream().filter(Issue::getIsOpen).count();
    }

    private long countNumberOfClosedIssue(List<Issue> issue) {
        return issue.stream().filter(i -> !i.getIsOpen()).count();
    }

    private int calculateAchievementRate(int numberOfIssue) {
        return (int)(numberOfClosedIssue * 1.f / numberOfIssue * 100);
    }
}
