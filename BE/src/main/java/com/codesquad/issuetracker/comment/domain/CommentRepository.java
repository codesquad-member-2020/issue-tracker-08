package com.codesquad.issuetracker.comment.domain;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends CrudRepository<Comment, CommentId> {
    Comment findFirstByOrderByIdDesc();
}
