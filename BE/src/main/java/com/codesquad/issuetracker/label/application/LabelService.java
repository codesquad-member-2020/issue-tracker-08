package com.codesquad.issuetracker.label.application;

import com.codesquad.issuetracker.issue.application.IssueService;
import com.codesquad.issuetracker.label.domain.Label;
import com.codesquad.issuetracker.label.domain.LabelDTO;
import com.codesquad.issuetracker.label.domain.LabelId;
import com.codesquad.issuetracker.label.domain.LabelRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Slf4j
@Service
@AllArgsConstructor
public class LabelService {

    private final LabelRepository labelRepository;

    private final IssueService issueService;

    public void save(Label label) {
        labelRepository.save(label);
    }

    public List<LabelDTO> getAllLabels() {
        return StreamSupport.stream(labelRepository.findAll().spliterator(), false)
                .map(LabelDTO::from)
                .collect(Collectors.toList());
    }

    public LabelId getNextIdentity() {
        return Optional.ofNullable(labelRepository.findFirstByOrderByIdDesc())
                .map(label -> new LabelId(label.getId().getLabelId() + 1L))
                .orElseGet(() -> new LabelId(1L));
    }

    @Transactional
    public void delete(LabelId id) {
        labelRepository.deleteById(id);
        issueService.deleteLabelOfIssues(id);
    }
}
