package com.codesquad.issuetracker.label.application;

import com.codesquad.issuetracker.label.domain.Label;
import com.codesquad.issuetracker.label.domain.LabelId;
import com.codesquad.issuetracker.label.domain.LabelRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Slf4j
@Service
@AllArgsConstructor
public class LabelService {

    private final LabelRepository labelRepository;

    public Label save(Label label) {
        return labelRepository.save(label);
    }

    public List<Label> getAllLabels() {
        return StreamSupport.stream(labelRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    public LabelId getNextIdentity() {
        return Optional.ofNullable(labelRepository.findFirstByOrderByIdDesc())
                .map(label -> new LabelId(label.getId().getLabelId() + 1L))
                .orElseGet(() -> new LabelId(1L));
    }

    public void delete(LabelId id) {
        labelRepository.deleteById(id);
    }

    public long count() {
        return labelRepository.count();
    }

    public List<Label> findAllByIds(Set<LabelId> labelIds) {
        return StreamSupport.stream(labelRepository.findAllById(labelIds).spliterator(), false).collect(Collectors.toList());
    }
}
