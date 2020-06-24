package com.codesquad.issuetracker.milestone.ui;

import com.codesquad.issuetracker.milestone.application.MilestoneService;
import com.codesquad.issuetracker.milestone.domain.Milestone;
import com.codesquad.issuetracker.milestone.domain.MilestoneBoard;
import com.codesquad.issuetracker.milestone.domain.MilestoneDTO;
import com.codesquad.issuetracker.milestone.domain.MilestoneId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/milestones")
public class MilestoneController {

    private final MilestoneService milestoneService;

    @GetMapping("")
    public ResponseEntity<MilestoneBoard> listMilestone() {
        return new ResponseEntity<>(milestoneService.getAllMilestones(), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<String> createMilestone(@RequestBody Milestone milestone) {
        MilestoneId milestoneId = milestoneService.getNextIdentity();
        milestoneService.save(milestoneId, milestone);
        return new ResponseEntity<>("마일스톤 생성 성공", HttpStatus.CREATED);
    }

    @GetMapping("/{milestone_id}")
    public ResponseEntity<?> readMilestone(@PathVariable(name = "milestone_id") Long milestoneId) {
        MilestoneId targetMilestoneId = new MilestoneId(milestoneId);
        MilestoneDTO milestoneDTO = milestoneService.readMilestoneById(targetMilestoneId);
        return new ResponseEntity<>(milestoneDTO, HttpStatus.OK);
    }

    @PutMapping("/{milestone_id}")
    public ResponseEntity<?> modifyMilestone(@PathVariable(name = "milestone_id") Long milestoneId,
                                             @RequestBody Milestone milestone) {
        MilestoneId targetMilestoneId = new MilestoneId(milestoneId);
        milestoneService.save(targetMilestoneId, milestone);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{milestone_id}")
    public ResponseEntity<?> changeStatus(@PathVariable(name = "milestone_id") Long milestoneId) {
        MilestoneId targetMilestoneId = new MilestoneId(milestoneId);
        milestoneService.changeStatus(targetMilestoneId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{milestone_id}")
    public ResponseEntity<?> deleteMilestone(@PathVariable(name = "milestone_id") Long milestoneId) {
        MilestoneId targetMilestoneId = new MilestoneId(milestoneId);
        milestoneService.deleteMilestone(targetMilestoneId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
