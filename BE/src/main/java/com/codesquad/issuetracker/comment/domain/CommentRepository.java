package com.codesquad.issuetracker.comment.domain;

import com.codesquad.issuetracker.issue.domain.IssueId;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends CrudRepository<Comment, CommentId> {
    Comment findFirstByOrderByIdDesc();

    @Query("SELECT count(comment_id) " +
            "FROM  Comment " +
            "WHERE issue_id = :#{#issueId.issueId}")
    long countByIssueId(IssueId issueId);
}
