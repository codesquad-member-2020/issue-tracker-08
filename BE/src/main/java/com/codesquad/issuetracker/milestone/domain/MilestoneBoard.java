package com.codesquad.issuetracker.milestone.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class MilestoneBoard {

    private long numberOfOpenMilestone;

    private long numberOfClosedMilestone;

    private List<MilestoneDTO> milestones;
}
