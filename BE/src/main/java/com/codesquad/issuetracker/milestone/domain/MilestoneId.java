package com.codesquad.issuetracker.milestone.domain;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class MilestoneId implements Serializable {

    @Column(name = "milestone_id")
    private Long milestoneId;
}
