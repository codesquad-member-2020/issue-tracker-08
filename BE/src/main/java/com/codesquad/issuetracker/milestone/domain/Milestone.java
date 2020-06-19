package com.codesquad.issuetracker.milestone.domain;

import com.codesquad.issuetracker.common.BaseTimeEntity;
import com.codesquad.issuetracker.issue.domain.IssueId;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
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

    @Column(name = "title", unique = true)
    private String title;

    private LocalDate dueDate;

    private String description;

    private boolean isOpen = true;
}
