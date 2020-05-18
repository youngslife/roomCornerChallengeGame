use pjt3db;

INSERT INTO BOARD(
board_title,
board_category)
VALUES('팁과 노하우','정보'),('공략','정보'),('방탈출','커뮤니티'),('마피아','커뮤니티');

INSERT INTO `pjt3db`.`post`
(
`board_no`,
`user_no`,
`post_title`,
`post_content`
)
VALUES
(1,2,'자유게시판 오픈','첫글'),
(1,2,'자유게시판이잖아','두번째 글'),
(2,1,'팁과 노하우 공지사항','공지사항 테스트');

INSERT INTO `pjt3db`.`comment`
(
`post_no`,
`user_no`,
`cmt_content`)
VALUES
(1,2,'첫 댓글이다'),(1,2,'두번째 댓글이다');

INSERT INTO `pjt3db`.`comment`
(
`post_no`,
`user_no`,
`cmt_parent_no`,
`cmt_content`)
VALUES
(1,1,1,'첫댓글에 대한 첫 답글이다');