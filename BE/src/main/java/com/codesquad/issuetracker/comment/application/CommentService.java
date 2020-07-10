package com.codesquad.issuetracker.comment.application;

import com.codesquad.issuetracker.comment.domain.Comment;
import com.codesquad.issuetracker.comment.domain.CommentId;
import com.codesquad.issuetracker.comment.domain.CommentRepository;
import com.codesquad.issuetracker.issue.domain.IssueId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public Long getNextIdentity() {
        return Optional.ofNullable(commentRepository.findFirstByOrderById_commentIdDesc())
                .map(comment -> comment.getId().getCommentId() + 1L)
                .orElseGet(() -> 1L);
    }

    public void changeStatus(CommentId commentId) {
        Comment comment = findCommentById(commentId);
        comment.changeStatus();
        commentRepository.save(comment);
    }

    public void delete(CommentId commentId) {
        Comment comment = findCommentById(commentId);
        commentRepository.delete(comment);
    }

    public Comment save(CommentId commentId, String content) {
        Comment comment = Comment.of(commentId, content);
        return commentRepository.save(comment);
    }

    public void update(CommentId commentId, String content) {
        Comment comment = findCommentById(commentId);
        comment.updateContent(content);
        commentRepository.save(comment);
    }

    private Comment findCommentById(CommentId commentId) {
        return commentRepository.findById(commentId).orElseThrow(() -> new EntityNotFoundException("존재하지 않는 댓글입니다!"));
    }

    public long countByIssueId(IssueId issueId) {
        return commentRepository.countByIssueId(issueId);
    }
}
