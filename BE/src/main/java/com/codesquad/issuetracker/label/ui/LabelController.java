package com.codesquad.issuetracker.label.ui;

import com.codesquad.issuetracker.label.domain.Label;
import com.codesquad.issuetracker.label.domain.LabelRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/labels")
public class LabelController {

    private final LabelRepository labelRepository;

    public LabelController(LabelRepository labelRepository) {
        this.labelRepository = labelRepository;
    }

    @PostMapping("")
    public ResponseEntity<String> createLabel(@RequestBody Label label){
        labelRepository.save(label);
        return new ResponseEntity<>("라벨 생성 성공", HttpStatus.CREATED);
    }
}
