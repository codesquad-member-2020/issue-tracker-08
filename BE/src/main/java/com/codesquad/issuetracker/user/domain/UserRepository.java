package com.codesquad.issuetracker.user.domain;

import com.codesquad.issuetracker.issue.domain.IssueId;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends CrudRepository<User, UserId> {
    User findFirstByOrderByIdDesc();

    @Query(value = "SELECT u.user_id, u.nickname, u.avatar_url, u.email FROM User u JOIN assigner a ON a.user_id = u.user_id WHERE a.issue_id = :issueId", nativeQuery = true)
    List<User> findByIdIssueId(@Param("issueId") IssueId issueId);
}
