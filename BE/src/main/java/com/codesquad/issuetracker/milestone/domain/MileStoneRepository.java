package com.codesquad.issuetracker.milestone.domain;

import org.springframework.data.repository.CrudRepository;

public interface MileStoneRepository extends CrudRepository<Milestone, Long> {

    public Milestone findFirstByOrderByIdDesc();
}
