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

    public CommentId getNextIdentity() {
        return Optional.ofNullable(commentRepository.findFirstByOrderByIdDesc())
                .map(comment -> new CommentId(comment.getId().getCommentId() + 1L))
                .orElseGet(() -> new CommentId(1L));
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
}
