package com.codesquad.issuetracker.comment.ui;

import com.codesquad.issuetracker.comment.application.CommentService;
import com.codesquad.issuetracker.comment.domain.Comment;
import com.codesquad.issuetracker.comment.domain.CommentId;
import com.codesquad.issuetracker.comment.domain.CommentRepository;
import com.codesquad.issuetracker.issue.domain.IssueId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/issues/{issue_id}/comments")
@RestController
public class CommentController {

    private final CommentRepository commentRepository;

    private final CommentService commentService;

    @PostMapping("")
    public ResponseEntity<String> create(@PathVariable("issue_id") Long issueId,
                                         @RequestBody String content) {

        IssueId targetIssueId = new IssueId(issueId);
        CommentId newCommentId = commentService.getNextIdentity();
        Comment comment = buildComment(newCommentId, targetIssueId, content);

        commentRepository.save(comment);

        return new ResponseEntity<>("댓글 생성 성공", HttpStatus.CREATED);
    }

    @PutMapping("/{comment_id}")
    public ResponseEntity<String> update(@PathVariable("issue_id") Long issueId,
                                         @PathVariable("comment_id") Long commentId,
                                         @RequestBody String content) {

        IssueId targetIssueId = new IssueId(issueId);
        CommentId targetCommentId = new CommentId(commentId);
        Comment comment = buildComment(targetCommentId, targetIssueId, content);

        commentRepository.save(comment);

        return new ResponseEntity<>("댓글 수정 성공", HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{comment_id}")
    public ResponseEntity<String> changeStatus(@PathVariable("issue_id") Long issueId,
                                               @PathVariable("comment_id") Long commentId) {
        CommentId targetCommentId = new CommentId(commentId);
        commentService.changeStatus(targetCommentId);
        return new ResponseEntity<>("댓글 상태 변경 성공", HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{comment_id}")
    public ResponseEntity<String> delete(@PathVariable("issue_id") Long issueId,
                                         @PathVariable("comment_id") Long commentId) {
        CommentId targetCommentId = new CommentId(commentId);
        commentService.delete(targetCommentId);
        return new ResponseEntity<>("댓글 삭제 성공", HttpStatus.NO_CONTENT);
    }

    private Comment buildComment(CommentId commentId, IssueId issueId, String content) {
        return Comment.builder()
                .id(commentId)
                .issueId(issueId)
                .content(content)
                .isOpen(true)
                .build();
    }
}

