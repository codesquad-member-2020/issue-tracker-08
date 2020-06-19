package com.codesquad.issuetracker.label.application;

import com.codesquad.issuetracker.label.domain.Label;
import com.codesquad.issuetracker.label.domain.LabelId;
import com.codesquad.issuetracker.label.domain.LabelRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@AllArgsConstructor
public class LabelService {

    private final LabelRepository labelRepository;

    public void saveLabel(Label label) {
        LabelId id = new LabelId(getNextIdentity());
        label.setId(id);

        labelRepository.save(label);
    }

    private long getNextIdentity() {
        return Optional.ofNullable(labelRepository.findFirstByOrderByIdDesc())
                .map(label -> label.getId().getLabelId())
                .orElse(0L) + 1;
    }
}
