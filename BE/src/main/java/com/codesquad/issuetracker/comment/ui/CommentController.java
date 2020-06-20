package com.codesquad.issuetracker.comment.ui;

import com.codesquad.issuetracker.comment.application.CommentService;
import com.codesquad.issuetracker.comment.domain.Comment;
import com.codesquad.issuetracker.comment.domain.CommentId;
import com.codesquad.issuetracker.comment.domain.CommentQuery;
import com.codesquad.issuetracker.comment.domain.CommentRepository;
import com.codesquad.issuetracker.issue.domain.IssueId;
import com.codesquad.issuetracker.user.domain.UserId;
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
                                         @RequestBody CommentQuery query) {

        CommentId newCommentId = commentService.getNextIdentity();
        IssueId targetIssueId = new IssueId(issueId);
        UserId userId = query.getUserId();
        String content =query.getContent();

        CommentQuery newQuery = new CommentQuery(newCommentId, targetIssueId, userId, content);

        Comment comment = Comment.of(newQuery);
        commentRepository.save(comment);

        return new ResponseEntity<>("댓글 생성 성공", HttpStatus.CREATED);
    }

    @PutMapping("/{comment_id}")
    public ResponseEntity<String> update(@PathVariable("issue_id") Long issueId,
                                         @PathVariable("comment_id") Long commentId,
                                         @RequestBody CommentQuery query) {


        CommentId newCommentId = new CommentId(commentId);
        IssueId targetIssueId = new IssueId(issueId);
        UserId userId = query.getUserId();
        String content =query.getContent();

        CommentQuery newQuery = new CommentQuery(newCommentId, targetIssueId, userId, content);

        Comment comment = Comment.of(newQuery);
        commentRepository.save(comment);

        return new ResponseEntity<>("댓글 수정 성공", HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{comment_id}")
    public ResponseEntity<String> changeStatus(@PathVariable("issue_id") Long issueId,
                                               @PathVariable("comment_id") Long commentId,
                                               @RequestBody String userId) {
        CommentId targetCommentId = new CommentId(commentId);
        commentService.changeStatus(targetCommentId);
        return new ResponseEntity<>("댓글 상태 변경 성공", HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{comment_id}")
    public ResponseEntity<String> delete(@PathVariable("issue_id") Long issueId,
                                         @PathVariable("comment_id") Long commentId,
                                         @RequestBody String userId) {
        CommentId targetCommentId = new CommentId(commentId);
        commentService.delete(targetCommentId);
        return new ResponseEntity<>("댓글 삭제 성공", HttpStatus.NO_CONTENT);
    }
}

