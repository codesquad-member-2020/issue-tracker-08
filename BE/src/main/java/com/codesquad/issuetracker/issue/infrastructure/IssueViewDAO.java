package com.codesquad.issuetracker.issue.infrastructure;

import com.codesquad.issuetracker.issue.domain.IssueId;
import com.codesquad.issuetracker.issue.domain.IssueView;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository
public class IssueViewDAO {

    @PersistenceContext
    private EntityManager entityManager;

    public IssueView read(IssueId issueId) {
        return null;
    }
}
