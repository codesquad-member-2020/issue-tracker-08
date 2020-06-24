package com.codesquad.issuetracker.issue.infrastructure;

import com.codesquad.issuetracker.comment.domain.CommentView;
import com.codesquad.issuetracker.issue.domain.IssueId;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

@Repository
public class IssueViewDAO {

    @PersistenceContext
    private EntityManager entityManager;

    public List<CommentView> readAllComment(IssueId issueId) {
        String selectQuery = "SELECT new com.codesquad.issuetracker.comment.domain.CommentView(c, u1) FROM Comment c, User u1 WHERE c.id.issueId = :issueId AND c.id.userId = u1.id.userId";
        TypedQuery<CommentView> query = entityManager.createQuery(selectQuery, CommentView.class);
        query.setParameter("issueId", issueId.getIssueId());
        return query.getResultList();
    }
}
