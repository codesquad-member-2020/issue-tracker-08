package com.codesquad.issuetracker.issue.domain;

import com.codesquad.issuetracker.milestone.domain.MilestoneId;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface IssueRepository extends CrudRepository<Issue, IssueId>, QuerydslPredicateExecutor<Issue> {

    Issue findFirstByOrderByIdDesc();

    List<Issue> findAllByMilestoneId(MilestoneId milestoneId);

    long count();

    long countByIsOpenTrue();

    long countByIsOpenFalse();
}
