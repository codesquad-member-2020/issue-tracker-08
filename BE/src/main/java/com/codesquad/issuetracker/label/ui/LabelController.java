package com.codesquad.issuetracker.label.ui;

import com.codesquad.issuetracker.common.exception.ErrorMessage;
import com.codesquad.issuetracker.label.application.LabelService;
import com.codesquad.issuetracker.label.domain.Label;
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
@RequestMapping("/labels")
public class LabelController {

    private final LabelService labelService;

    @PostMapping("")
    public ResponseEntity<String> createLabel(@RequestBody Label label) {
        try {
            labelService.saveLabel(label);
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>(ErrorMessage.LABEL_NAME_DUPLICATED.getMesssage(), HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return new ResponseEntity<>("라벨 생성 성공", HttpStatus.CREATED);
    }
}
