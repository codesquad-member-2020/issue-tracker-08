package com.codesquad.issuetracker.issue.domain;

import com.codesquad.issuetracker.comment.domain.CommentId;
import com.codesquad.issuetracker.common.BaseTimeEntity;
import com.codesquad.issuetracker.label.domain.LabelId;
import com.codesquad.issuetracker.milestone.domain.MilestoneId;
import com.codesquad.issuetracker.user.domain.UserId;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
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

    private boolean isOpen;

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

    @ElementCollection
    @CollectionTable(
            name = "comment",
            joinColumns = @JoinColumn(name = "issue_id")
    )
    private Set<CommentId> comments = new HashSet<>();
}
