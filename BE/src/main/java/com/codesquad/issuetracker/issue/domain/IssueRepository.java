package com.codesquad.issuetracker.issue.domain;

import com.codesquad.issuetracker.label.domain.LabelId;
import com.codesquad.issuetracker.milestone.domain.MilestoneId;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IssueRepository extends CrudRepository<Issue, IssueId>, QuerydslPredicateExecutor<Issue> {

    Issue findFirstByOrderByIdDesc();

    List<Issue> findAllByMilestoneId(MilestoneId milestoneId);

    @Query("SELECT i " +
            "FROM  Issue i " +
            "LEFT  JOIN i.labels tag " +
            "WHERE tag.labelId = :#{#labelId.labelId}")
    List<Issue> findAllByLabelId(@Param("labelId") LabelId labelId);

    long count();

    long countByIsOpenTrue();

    long countByIsOpenFalse();
}
