package com.codesquad.issuetracker.comment.ui;

import com.codesquad.issuetracker.comment.application.CommentService;
import com.codesquad.issuetracker.comment.domain.Comment;
import com.codesquad.issuetracker.comment.domain.CommentId;
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

    private final CommentService commentService;

    @PostMapping("")
    public ResponseEntity<String> create(@PathVariable Long issueId, @RequestBody String content) {
        CommentId newCommentId = commentService.getNextIdentity();
        IssueId targetIssue = new IssueId(issueId);
        Comment comment = buildComment(newCommentId, targetIssue, content);

        commentService.addComment(comment);
        return new ResponseEntity<>("댓글 생성 성공", HttpStatus.CREATED);
    }

    @PutMapping("/{comment_id}")
    public ResponseEntity<String> update(@PathVariable(value = "issue_id") Long id,
                                         @PathVariable(value = "comment_id") CommentId commentId,
                                         @RequestBody String content) {

        Comment comment = buildComment(commentId, content);
        commentService.update(comment);
        return new ResponseEntity<>("댓글 수정 성공", HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{comment_id}")
    public ResponseEntity<String> changeStatus(@PathVariable(value = "comment_id") Long id) {
        CommentId commentId = new CommentId(id);
        commentService.changeStatus(commentId);
        return new ResponseEntity<>("댓글 상태 변경 성공", HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{comment_id}")
    public ResponseEntity<String> delete(@PathVariable(value = "comment_id") Long id) {
        CommentId commentId = new CommentId(id);
        commentService.delete(commentId);
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

