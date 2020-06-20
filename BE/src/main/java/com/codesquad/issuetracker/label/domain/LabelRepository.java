package com.codesquad.issuetracker.label.domain;

import org.springframework.data.repository.CrudRepository;

public interface LabelRepository extends CrudRepository<Label, Long> {

    public Label findFirstByOrderByIdDesc();
}
