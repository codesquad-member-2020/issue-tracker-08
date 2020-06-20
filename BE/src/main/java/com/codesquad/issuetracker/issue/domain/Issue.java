package com.codesquad.issuetracker.issue.domain;

import com.codesquad.issuetracker.common.BaseTimeEntity;
import com.codesquad.issuetracker.label.domain.LabelId;
import com.codesquad.issuetracker.milestone.domain.MilestoneId;
import com.codesquad.issuetracker.user.domain.UserId;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
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
    private UserId authorId;

    @ElementCollection
    @CollectionTable(
            name = "assigner",
            joinColumns = @JoinColumn(name = "issue_id")
    )
    private Set<UserId> assignees = new HashSet<>();

    @Embedded
    private MilestoneId milestoneId;

    @ElementCollection
    @CollectionTable(
            name = "tag",
            joinColumns = @JoinColumn(name = "issue_id")
    )
    private Set<LabelId> labels = new HashSet<>();
}
