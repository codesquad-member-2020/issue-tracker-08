package com.codesquad.issuetracker.comment.application;

import com.codesquad.issuetracker.comment.domain.Comment;
import com.codesquad.issuetracker.comment.domain.CommentId;
import com.codesquad.issuetracker.comment.domain.CommentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public Long getNextIdentity() {
        return Optional.ofNullable(commentRepository.findFirstByOrderByIdDesc())
                .map(comment -> comment.getId().getCommentId() + 1L)
                .orElseGet(() -> 1L);
    }

    public void changeStatus(CommentId commentId) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 댓글입니다!"));
        comment.changeStatus();
        commentRepository.save(comment);
    }

    public void delete(CommentId commentId) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new IllegalArgumentException("존재하지 않는 댓글입니다!"));
        commentRepository.delete(comment);
    }

    public Comment save(CommentId compositeCommentId, String content) {
        Comment comment = Comment.of(compositeCommentId, content);
        return commentRepository.save(comment);
    }
}
