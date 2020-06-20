package com.codesquad.issuetracker.issue.domain;

import org.springframework.data.repository.CrudRepository;

public interface IssueRepository extends CrudRepository<Issue, IssueId> {

    long count();
}
