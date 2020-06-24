package com.codesquad.issuetracker.label.ui;

import com.codesquad.issuetracker.common.exception.ErrorMessage;
import com.codesquad.issuetracker.label.application.LabelService;
import com.codesquad.issuetracker.label.domain.Label;
import com.codesquad.issuetracker.label.domain.LabelDTO;
import com.codesquad.issuetracker.label.domain.LabelId;
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
    public ResponseEntity<List<LabelDTO>> listLabel() {
        return new ResponseEntity<>(labelService.getAllLabels(), HttpStatus.OK);
    }

    @PostMapping("")
    public ResponseEntity<String> createLabel(@RequestBody Label property) {
        try {
            LabelId nextId = labelService.getNextIdentity();
            Label label = Label.of(nextId, property);
            labelService.save(label);
        } catch (DataIntegrityViolationException e) {
            return new ResponseEntity<>(ErrorMessage.LABEL_NAME_DUPLICATED.getMessage(), HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return new ResponseEntity<>("라벨 생성 성공", HttpStatus.CREATED);
    }

    @PutMapping("/{label_id}")
    public ResponseEntity<String> update(@PathVariable(value = "label_id") Long labelId, @RequestBody Label property) {
        LabelId id = new LabelId(labelId);
        Label label = Label.of(id, property);
        labelService.save(label);
        return new ResponseEntity<>("라벨 업데이트 성공", HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{label_id}")
    public ResponseEntity<String> delete(@PathVariable(value = "label_id") Long labelId) {
        LabelId id = new LabelId(labelId);
        labelService.delete(id);
        return new ResponseEntity<>("라벨 삭제 성공", HttpStatus.NO_CONTENT);
    }
}
