package com.codesquad.issuetracker.milestone.domain;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

public interface MileStoneRepository extends CrudRepository<Milestone, MilestoneId> {

    public Milestone findFirstByOrderByIdDesc();

    @Transactional
    @Modifying
    @Query("UPDATE Milestone " +
            "SET  title = :#{#milestone.title}," +
            "      description = :#{#milestone.description}," +
            "      due_date = :#{#milestone.dueDate} " +
            "WHERE milestone_id = :#{#milestone.id.milestoneId}")
    public void updateMilestone(@Param("milestone") Milestone milestone);

    public Long countById(MilestoneId milestoneId);
}
