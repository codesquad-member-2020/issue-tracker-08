package com.codesquad.issuetracker.milestone.domain;

import lombok.Getter;

import java.util.List;

@Getter
public class MilestoneBoard {

    private long numberOfOpenMilestone;

    private long numberOfClosedMilestone;

    private List<MilestoneDTO> milestones;

    public MilestoneBoard(List<MilestoneDTO> milestones) {
        this.milestones = milestones;
        this.numberOfOpenMilestone = countOpenMilestone(milestones);
        this.numberOfClosedMilestone = countClosedMilestone(milestones);
    }

    private long countOpenMilestone(List<MilestoneDTO> milestones) {
        return milestones.stream().filter(MilestoneDTO::getIsOpen).count();
    }

    private long countClosedMilestone(List<MilestoneDTO> milestones) {
        return milestones.size() - this.numberOfOpenMilestone;
    }
}
