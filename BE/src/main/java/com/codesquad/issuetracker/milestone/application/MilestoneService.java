package com.codesquad.issuetracker.milestone.application;

import com.codesquad.issuetracker.issue.domain.Issue;
import com.codesquad.issuetracker.issue.domain.IssueRepository;
import com.codesquad.issuetracker.milestone.domain.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Slf4j
@Service
@RequiredArgsConstructor
public class MilestoneService {

    private final MileStoneRepository mileStoneRepository;

    private final IssueRepository issueRepository;

    public Milestone save(MilestoneId milestoneId, Milestone milestone) {
        Milestone newMilestone = Milestone.of(milestoneId, milestone);
        return mileStoneRepository.save(newMilestone);
    }

    public MilestoneBoard getAllMilestones() {
        List<Milestone> milestones = StreamSupport.stream(mileStoneRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());

        long numberOfOpenMilestone = milestones.stream().filter(Milestone::isOpen).count();
        long numberOfClosedMilestone = milestones.size() - numberOfOpenMilestone;
        List<MilestoneDTO> milestoneDTOS = parseMilestonesToDTO(milestones);

        return new MilestoneBoard(numberOfOpenMilestone, numberOfClosedMilestone, milestoneDTOS);
    }

    public MilestoneId getNextIdentity() {
        return Optional.ofNullable(mileStoneRepository.findFirstByOrderByIdDesc())
                .map(milestone -> new MilestoneId(milestone.getId().getMilestoneId() + 1))
                .orElseGet(() -> new MilestoneId(1L));
    }

    private List<MilestoneDTO> parseMilestonesToDTO(List<Milestone> milestones) {
        return milestones.stream().map(m -> {

            List<Issue> issues = issueRepository.findAllByMilestoneId(m.getId());

            m.setMetaData(issues);

            // 현재는 List<IssueDTO>를 세팅하지 않지만 /milestones/{id}/issues에서 필요할 듯
            return MilestoneDTO.from(m);
        }).collect(Collectors.toList());
    }

    public void modifyMilestone(Milestone milestone) {
        // save는 Milestone의 모든 정보를 변경하므로 update 쿼리를 직접 작성한다.
        mileStoneRepository.updateMilestone(milestone);
    }

    public void changeStatus(MilestoneId milestoneId) {
        Milestone milestone = mileStoneRepository.findById(milestoneId).orElseThrow(EntityNotFoundException::new);
        milestone.changeStatus();
        mileStoneRepository.save(milestone);
    }

    public void deleteMilestone(MilestoneId milestoneId) {
        mileStoneRepository.deleteById(milestoneId);
    }

    public MilestoneDTO readMilestoneById(MilestoneId milestoneId) {
        Milestone milestone = mileStoneRepository.findById(milestoneId).orElseThrow(EntityNotFoundException::new);
        return MilestoneDTO.from(milestone);
    }
}
