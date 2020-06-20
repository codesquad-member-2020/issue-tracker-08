package com.codesquad.issuetracker.label.ui;

import com.codesquad.issuetracker.common.exception.ErrorMessage;
import com.codesquad.issuetracker.label.application.LabelService;
import com.codesquad.issuetracker.label.domain.LabelProperty;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/labels")
public class LabelController {

    private final LabelService labelService;

    @GetMapping("")
    public ResponseEntity<List<LabelProperty>> listLabel() {
        return new ResponseEntity<>(labelService.getAllLabels(), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<String> createLabel(@RequestBody LabelProperty label) {
        try {
            labelService.saveLabel(label);
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>(ErrorMessage.LABEL_NAME_DUPLICATED.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return new ResponseEntity<>("라벨 생성 성공", HttpStatus.CREATED);
    }
}
