package com.codesquad.issuetracker.issue.infrastructure;

import com.codesquad.issuetracker.issue.domain.IssueId;
import com.codesquad.issuetracker.issue.domain.IssueView;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

@Repository
public class IssueViewDAO {

    @PersistenceContext
    private EntityManager entityManager;

    public IssueView read(IssueId issueId) {
        String selectQuery = "SELECT new com";

        TypedQuery<IssueView> query = entityManager.createQuery(selectQuery, IssueView.class);
        query.setParameter("issueId", issueId);
        return query.getSingleResult();
    }
}
