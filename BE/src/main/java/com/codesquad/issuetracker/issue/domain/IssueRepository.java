package com.codesquad.issuetracker.issue.domain;

import com.codesquad.issuetracker.milestone.domain.MilestoneId;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IssueRepository extends CrudRepository<Issue, IssueId> {

    Issue findFirstByOrderByIdDesc();

    @Query("SELECT i " +
            "FROM  Issue AS i " +
            "WHERE milestone_id = :#{#milestoneId.milestoneId}")
    List<Issue> findByMilestoneId(@Param(value = "milestoneId") MilestoneId milestoneId);
}
