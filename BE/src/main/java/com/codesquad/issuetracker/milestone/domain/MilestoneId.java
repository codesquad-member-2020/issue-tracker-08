package com.codesquad.issuetracker.milestone.domain;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class MilestoneId implements Serializable {

    private Long milestoneId;
}
