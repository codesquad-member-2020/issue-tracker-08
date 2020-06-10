package com.codesquad.issuetracker;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class MilestoneBoard {

    private int numberOfOpenMilestone;

    private int numberOfClosedMilestone;

    @JsonIgnoreProperties({"issues"})
    List<Milestone> milestones;
}
