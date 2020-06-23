package com.codesquad.issuetracker.milestone.ui;

import com.codesquad.issuetracker.common.exception.ErrorMessage;
import com.codesquad.issuetracker.milestone.application.MilestoneService;
import com.codesquad.issuetracker.milestone.domain.Milestone;
import com.codesquad.issuetracker.milestone.domain.MilestoneBoard;
import com.codesquad.issuetracker.milestone.domain.MilestoneDTO;
import com.codesquad.issuetracker.milestone.domain.MilestoneId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;

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
        try {
            milestoneService.createMilestone(milestone);
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>(ErrorMessage.MILESTONE_TITLE_DUPLICATED.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return new ResponseEntity<>("마일스톤 생성 성공", HttpStatus.CREATED);
    }

    @GetMapping("/{milestone_id}")
    public ResponseEntity<MilestoneDTO> readMilestone(@PathVariable(name = "milestone_id") Long milestoneId) {
        return new ResponseEntity<>(milestoneService.readMilestoneById(new MilestoneId(milestoneId)), HttpStatus.OK);
    }

    @PutMapping("/{milestone_id}")
    public ResponseEntity<?> modifyMilestone(@PathVariable(name = "milestone_id") Long milestoneId,
                                             @RequestBody Milestone milestone) {
        try {
            milestoneService.modifyMilestone(Milestone.of(new MilestoneId(milestoneId), milestone));
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>(ErrorMessage.MILESTONE_TITLE_DUPLICATED.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{milestone_id}")
    public ResponseEntity<?> changeStatus(@PathVariable(name = "milestone_id") Long milestoneId) {
        try {
            milestoneService.changeStatus(new MilestoneId(milestoneId));
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(ErrorMessage.ENTITY_UPDATE_FAILED.getMessage(), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{milestone_id}")
    public ResponseEntity<?> deleteMilestone(@PathVariable(name = "milestone_id") Long milestoneId) {
        try {
            milestoneService.deleteMilestone(new MilestoneId(milestoneId));
        } catch (EmptyResultDataAccessException e) {
            return new ResponseEntity<>(ErrorMessage.ENTITY_DELETE_FAILED.getMessage(), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
