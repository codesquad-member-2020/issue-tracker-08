package com.codesquad.issuetracker.label.application;

import com.codesquad.issuetracker.label.domain.Label;
import com.codesquad.issuetracker.label.domain.LabelDTO;
import com.codesquad.issuetracker.label.domain.LabelId;
import com.codesquad.issuetracker.label.domain.LabelRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

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

    public List<LabelDTO> getAllLabels() {
        return StreamSupport.stream(labelRepository.findAll().spliterator(), false)
                .map(label -> LabelDTO.builder()
                        .name(label.getName())
                        .description(label.getDescription())
                        .color(label.getColor())
                        .isFontColorBlack(label.isFontColorBlack())
                        .build())
                .collect(Collectors.toList());
    }

    private long getNextIdentity() {
        return Optional.ofNullable(labelRepository.findFirstByOrderByIdDesc())
                .map(label -> label.getId().getLabelId())
                .orElse(0L) + 1;
    }
}
