package com.codesquad.issuetracker.milestone.domain;

import com.codesquad.issuetracker.common.BaseTimeEntity;
import com.codesquad.issuetracker.issue.domain.Issue;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Transient;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Milestone extends BaseTimeEntity {

    @EmbeddedId
    private MilestoneId id;

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

    public static Milestone of(MilestoneId milestoneId, Milestone milestone) {
        return Milestone.builder()
                .id(milestoneId)
                .title(milestone.title)
                .dueDate(milestone.dueDate)
                .description(milestone.description)
                .isOpen(milestone.isOpen)
                .numberOfOpenIssue(milestone.numberOfOpenIssue)
                .numberOfClosedIssue(milestone.numberOfClosedIssue)
                .achievementRate(milestone.achievementRate)
                .build();
    }

    public void changeStatus() {
        this.isOpen = !this.isOpen;
    }

    public void setMetaData(List<Issue> issues) {
        this.numberOfOpenIssue = countNumberOfOpenIssue(issues);
        this.numberOfClosedIssue = issues.size() - numberOfOpenIssue;
        this.achievementRate = calculateAchievementRate(issues.size());
    }

    private long countNumberOfOpenIssue(List<Issue> issue) {
        return issue.stream().filter(Issue::getIsOpen).count();
    }

    private int calculateAchievementRate(int numberOfIssue) {
        return (int)(numberOfClosedIssue * 1.f / numberOfIssue * 100);
    }
}
