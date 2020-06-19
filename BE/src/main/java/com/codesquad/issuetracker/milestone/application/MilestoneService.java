package com.codesquad.issuetracker.milestone.application;

import com.codesquad.issuetracker.milestone.domain.MileStoneRepository;
import com.codesquad.issuetracker.milestone.domain.Milestone;
import com.codesquad.issuetracker.milestone.domain.MilestoneId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MilestoneService {

    private final MileStoneRepository mileStoneRepository;

    public void createMilestone(Milestone milestone) {
        MilestoneId id = new MilestoneId(getNextIdentity());
        milestone.setId(id);

        mileStoneRepository.save(milestone);
    }

    private long getNextIdentity() {
        return Optional.ofNullable(mileStoneRepository.findFirstByOrderByIdDesc())
                .map(milestone -> milestone.getId().getMilestoneId())
                .orElse(0L) + 1;
    }
}
