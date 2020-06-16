package com.codesquad.issuetracker.milestone.ui;

import com.codesquad.issuetracker.milestone.domain.MileStoneRepository;
import com.codesquad.issuetracker.milestone.domain.Milestone;
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

    private final MileStoneRepository mileStoneRepository;

    @PostMapping("")
    public ResponseEntity<String> createMilestone(@RequestBody Milestone milestone) {
        Milestone milestone1 = mileStoneRepository.save(milestone);
        log.info("milestone : {}", milestone1);
        return new ResponseEntity<>("마일스톤 생성 성공", HttpStatus.CREATED);
    }
}
