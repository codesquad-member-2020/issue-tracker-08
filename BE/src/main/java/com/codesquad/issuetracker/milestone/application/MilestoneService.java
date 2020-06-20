package com.codesquad.issuetracker.milestone.application;

import com.codesquad.issuetracker.issue.domain.Issue;
import com.codesquad.issuetracker.issue.domain.IssueRepository;
import com.codesquad.issuetracker.milestone.domain.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Slf4j
@Service
@RequiredArgsConstructor
public class MilestoneService {

    private final MileStoneRepository mileStoneRepository;

    private final IssueRepository issueRepository;

    public void createMilestone(Milestone milestone) {
        MilestoneId id = new MilestoneId(getNextIdentity());
        milestone.setId(id);

        mileStoneRepository.save(milestone);
    }

    public MilestoneBoard getAllMilestones() {
        List<Milestone> milestones = StreamSupport.stream(mileStoneRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());

        long numberOfOpenMilestone = milestones.stream().filter(Milestone::isOpen).count();
        long numberOfClosedMilestone = milestones.stream().filter(m -> !m.isOpen()).count();
        List<MilestoneDTO> milestoneDTOS = parseMilestonesToDTO(milestones);

        return new MilestoneBoard(numberOfOpenMilestone, numberOfClosedMilestone, milestoneDTOS);
    }

    private long getNextIdentity() {
        return Optional.ofNullable(mileStoneRepository.findFirstByOrderByIdDesc())
                .map(milestone -> milestone.getId().getMilestoneId())
                .orElse(0L) + 1;
    }

    private List<MilestoneDTO> parseMilestonesToDTO(List<Milestone> milestones) {
        return milestones.stream().map(m -> {

            Map<String, Long> metaData = getMetaDataOfMilestones(StreamSupport.stream(issueRepository.findAllById(m.getIssues()).spliterator(), false)
                    .collect(Collectors.toList()));

            // 현재는 List<IssueDTO>를 세팅하지 않지만 /milestones/{id}/issues에서 필요할 듯
            return MilestoneDTO.builder()
                    .id(m.getId().getMilestoneId())
                    .title(m.getTitle())
                    .description(m.getDescription())
                    .dueDate(m.getDueDate())
                    .updatedAt(m.getModifiedAt())
                    .isOpen(m.isOpen())
                    .achievementRate(metaData.get("achievementRate"))
                    .numberOfOpenIssue(metaData.get("numberOfOpenIssue"))
                    .numberOfClosedIssue(metaData.get("numberOfClosedIssue"))
                    .build();
        }).collect(Collectors.toList());
    }

    private Map<String, Long> getMetaDataOfMilestones(List<Issue> issues) {
        if (issues.size() == 0) {
            return new HashMap<String, Long>() {{
                put("numberOfOpenIssue", 0L);
                put("numberOfClosedIssue", 0L);
                put("achievementRate", 0L);
            }};
        }

        return new HashMap<String, Long>() {{
            put("numberOfOpenIssue", issues.stream().filter(Issue::getIsOpen).count());
            put("numberOfClosedIssue", issues.stream().filter(i -> !i.getIsOpen()).count());
            put("achievementRate", (long)(get("numberOfOpenIssue") * 1.f / issues.size() * 100));
        }};
    }

    public void modifyMilestone(Milestone milestone) {
        // save는 Milestone의 모든 정보를 변경하므로 update 쿼리를 직접 작성한다.
        mileStoneRepository.updateMilestone(milestone);
    }
}
