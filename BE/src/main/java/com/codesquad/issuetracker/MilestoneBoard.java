package com.codesquad.issuetracker;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class MilestoneBoard {

    private int numberOfOpenMilestone;

    private int numberOfClosedMilestone;

    List<Milestone> milestones;
}
