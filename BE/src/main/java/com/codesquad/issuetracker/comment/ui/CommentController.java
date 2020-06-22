package com.codesquad.issuetracker.comment.ui;

import com.codesquad.issuetracker.comment.application.CommentService;
import com.codesquad.issuetracker.comment.domain.CommentId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static com.codesquad.issuetracker.utils.JwtUtils.decrypt;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/issues/{issue_id}/comments")
@RestController
public class CommentController {

    private final CommentService commentService;

    @PostMapping("")
    public ResponseEntity<String> create(@PathVariable("issue_id") Long issueId,
                                         @RequestBody String content,
                                         @CookieValue(name = "jwt") String jwtToken) {

        Long commentId = commentService.getNextIdentity();
        Long userId = Long.valueOf(decrypt(jwtToken).get("id").toString());
        CommentId compositeCommentId = new CommentId(issueId, commentId, userId);

        commentService.save(compositeCommentId, content);

        return new ResponseEntity<>("댓글 생성 성공", HttpStatus.CREATED);
    }

    @PutMapping("/{comment_id}")
    public ResponseEntity<String> update(@PathVariable("issue_id") Long issueId,
                                         @PathVariable("comment_id") Long commentId,
                                         @RequestBody String content,
                                         @CookieValue(name = "jwt") String jwtToken) {


        Long userId = Long.valueOf(decrypt(jwtToken).get("id").toString());
        CommentId compositeCommentId = new CommentId(issueId, commentId, userId);

        commentService.update(compositeCommentId, content);

        return new ResponseEntity<>("댓글 수정 성공", HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/{comment_id}")
    public ResponseEntity<String> changeStatus(@PathVariable("issue_id") Long issueId,
                                               @PathVariable("comment_id") Long commentId,
                                               @CookieValue(name = "jwt") String jwtToken) {

        Long userId = Long.valueOf(decrypt(jwtToken).get("id").toString());
        CommentId compositeCommentId = new CommentId(issueId, commentId, userId);

        commentService.changeStatus(compositeCommentId);

        return new ResponseEntity<>("댓글 상태 변경 성공", HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{comment_id}")
    public ResponseEntity<String> delete(@PathVariable("issue_id") Long issueId,
                                         @PathVariable("comment_id") Long commentId,
                                         @RequestBody String userId) {
//        CommentId targetCommentId = new CommentId(commentId);
//        commentService.delete(targetCommentId);
        return new ResponseEntity<>("댓글 삭제 성공", HttpStatus.NO_CONTENT);
    }
}

