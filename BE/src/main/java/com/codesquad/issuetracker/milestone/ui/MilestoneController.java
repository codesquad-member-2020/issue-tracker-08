package com.codesquad.issuetracker.milestone.ui;

import com.codesquad.issuetracker.common.exception.ErrorMessage;
import com.codesquad.issuetracker.milestone.application.MilestoneService;
import com.codesquad.issuetracker.milestone.domain.Milestone;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/milestones")
public class MilestoneController {

    private final MilestoneService milestoneService;

    @PostMapping("")
    public ResponseEntity<String> createMilestone(@RequestBody Milestone milestone) {
        try {
            milestoneService.createMilestone(milestone);
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>(ErrorMessage.MILESTONE_TITLE_DUPLICATED.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return new ResponseEntity<>("마일스톤 생성 성공", HttpStatus.CREATED);
    }
}
