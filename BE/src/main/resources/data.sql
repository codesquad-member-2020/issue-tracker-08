INSERT INTO user (user_id, avatar_url, email, nickname, password)
VALUES (1, 'https://codesquad-project.s3.ap-northeast-2.amazonaws.com/sad.jpg', 'jayjay@gmail.com', 'jayjay', 'jay1234!');


INSERT INTO issue (issue_id, created_at, modified_at, author_id, content, is_open, title)
VALUES (1, CURRENT_TIMESTAMP(), current_timestamp(), 1, '코멘트 생성용 이슈입니다.', 1, '테스트');

INSERT INTO comment (comment_id, issue_id, user_id, created_at, modified_at, content, is_open)
VALUES (1, 1, 1, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), '댓글이지롱', 1);
