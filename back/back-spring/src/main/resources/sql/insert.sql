use pjt3db;

INSERT INTO BOARD(
board_location,
board_type,
board_subtype,
board_title,
board_category)
VALUES('소식','공지사항'),('소식','이벤트'),('소식','패치노트'),
('가이드','커뮤니티');

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
(2,1,'팁과 노하우 공지사항','공지사항 테스트'),
(1,2,'자유게시판3','글3'),
(1,2,'자유게시판4','글4'),
(1,2,'자유게시판5','글5'),
(1,1,'자유게시판6','글6'),
(1,1,'자유게시판7','글7'),
(1,1,'자유게시판8','글8'),
(1,1,'자유게시판9','8'),
(1,1,'자유게시판10','8'),
(2,1,'팁과 노하우1','공지사항 테스트1'),
(2,1,'팁과 노하우2','공지사항 테스트2'),
(2,2,'팁과 노하우3','공지사항 테스트3'),
(2,2,'팁과 노하우4','공지사항 테스트4'),
(2,2,'팁과 노하우5','공지사항 테스트5');

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


INSERT INTO RSHOP(rshop_name) VALUES (#{rshop_name:VARCHAR});

UPDATE RSHOP
SET
rshop_name = #{rshop_name:VARCHAR}
WHERE rshop_no = #{rshop_no:INTEGER};
;
SELECT * FROM RSHOP;

INSERT INTO IMAGE(
	img_type,
	img_type_no,
	img_name,
	img_path,
	img_purpose,
	img_extension)
VALUES(
#{img_type:VARCHAR},
#{img_type_no:INTEGER},
#{img_name:VARCHAR},
#{img_path:VARCHAR},
#{img_purpose:VARCHAR},
#{img_extension:VARCHAR}
);
	#{img_type:VARCHAR},
	#{img_type_no:INTEGER},
	#{img_name:VARCHAR},
	#{img_path:VARCHAR},
	#{img_purpose:VARCHAR},
	#{img_extension:VARCHAR}
);
UPDATE IMAGE
SET
	img_type = #{img_type:VARCHAR},
	img_type_no= #{img_type_no:INTEGER},
	img_name = #{img_name:VARCHAR},
	img_path = #{img_path:VARCHAR},
	img_purpose = #{img_purpose:VARCHAR},
	img_extension = #{img_extension:VARCHAR}
    img_del_check = #{img_del_check:BOOLEAN}
WHERE img_no = #{img_no:INTEGER};

INSERT INTO RSTAGE(
rstage_name,
rstage_theme)
VALUES(
#{rstage_name:VARCHAR},
#{rstage_theme:VARCHAR}
);
UPDATE RSTAGE
SET
rstage_name = #{rstage_name:VARCHAR},
rstage_theme = #{rstage_theme:VARCHAR},
rstage_del_check = #{rstage_del_check:BOOLEAN}
WHERE rstage_no = #{rstage_no:INTEGER};

INSERT INTO RUSERINFO(
rstage_no,
user_no,
ruserinfo_hp,
ruserinfo_golds)
VALUES(
#{rstage_no:INTEGER},
#{user_no:INTEGER},
#{ruserinfo_hp:INTEGER},
0);

UPDATE RUSERINFO
SET
rstage_no = #{rstage_no: INTEGER}>,
user_no = #{user_no: INTEGER}>,
ruserinfo_hp = #{ruserinfo_hp:INTEGER},
ruserinfo_iscleared = #{ruserinfo_iscleared:BOOLEAN},
ruserinfo_iswon = #{ruserinfo_iswon:BOOLEAN},
ruserinfo_golds = #{ruserinfo_golds: INTEGER},
rsuerinfo_del_check = #{rsuerinfo_del_check:BOOLEAN}
WHERE ruserinfo_no = #{ruserinfo_no:INTEGER};

INSERT INTO RGAMEINFO(
ruserinfo_no,
rgameinfo_level
)
VALUES(
#{ruserinfo_no:INTEGER},
#{rgameinfo_level:INTEGER}
);

UPDATE RGAMEINFO
SET
ruserinfo_no 			= #{ruserinfo_no:INTEGER},
rgameinfo_playtime	 	= #{rgameinfo_playtime:DATETIME},
rgameinfo_enddate 		= #{rgameinfo_enddate:DATETIME}>,
rgameinfo_level 		= #{rgameinfo_level:INTEGER},
rgameinfo_perfect_num	= #{rgameinfo_perfect_num:INTEGER},
rgameinfo_great_num 	= #{rgameinfo_great_num:INTEGER},
rgameinfo_good_num 		= #{rgameinfo_good_num:INTEGER},
rgameinfo_miss_num 		= #{rgameinfo_miss_num:INTEGER},
rgameinfo_rank 			= #{rgameinfo_rank:VARCHAR}>,
rgameinfo_kcal 			= #{rgameinfo_kcal:DOUBLE}>,
rgameinfo_score 		= #{rgameinfo_score:DOUBLE},
rgameinfo_del_check		= #{rgameinfo_del_check:BOOLEAN}
WHERE rgameinfo_no = #{rgameinfo_no:INTEGER};

INSERT INTO RITEM(
ritem_name,
ritem_price,
ritem_category,
ritem_desc,
)
VALUES(
#{ritem_name:VARCHAR},
#{ritem_price:INTEGER},
#{ritem_category:VARCHAR},
#{ritem_desc:VARCHAR},
);

UPDATE RITEM
SET
ritem_name = #{ritem_name:VARCHAR},
ritem_price = #{ritem_price:INTEGER},
ritem_category = #{ritem_category:VARCHAR},
ritem_desc = #{ritem_desc:VARCHAR},
ritem_del_check = #{ritem_del_check:BOOLEAN}
WHERE ritem_no = #{ritem_no:INTEGER};

INSERT INTO RMAP (
rstage_no,
rmap_length)
VALUES(
#{rstage_no:INTEGER},
#{rmap_length:INTEGER}
);

UPDATE RMAP
SET
rstage_no = #{rstage_no:INTEGER},
rmap_length = #{rmap_length:INTEGER},
rmap_del_check = #{rmap_del_check:BOOLEAN}
WHERE rmap_no = #{rmap_no:INTEGER};

INSERT INTO RMONSTER(
rmon_name,
rmon_level,
rmon_hp,
rmon_grade,
rmon_description
)
VALUES(
#{rmon_name:VARCHAR},
#{rmon_level:INTEGER},
#{rmon_hp:INTEGER},
#{rmon_grade:VARCHAR},
#{rmon_description:VARCHAR}
);

UPDATE RMONSTER
SET
rmon_name = #{rmon_name:VARCHAR},
rmon_level = #{rmon_level:INTEGER},
rmon_hp = #{rmon_hp:INTEGER},
rmon_grade = #{rmon_grade:VARCHAR},
rmon_description = #{rmon_description:VARCHAR},
rmon_del_check = #{rmon_del_check:BOOLEAN}
WHERE rmon_no = #{rmon_no:INTEGER};

INSERT INTO UserGameInfo(user_no)VALUES(#{user_no:INTEGER});

UPDATE UserGameInfo
SET
user_no = #{user_no: INTEGER},
uginfo_level = #{uginfo_level:INTEGER},
uginfo_experience = #{uginfo_experience:INTEGER},
uginfo_golds = #{uginfo_golds:INTEGER},
uginfo_active_score = #{uginfo_active_score:DOUBLE}
WHERE uginfo_no = #{uginfo_no:INTEGER};


INSERT INTO Qna(
user_no,
qna_category,
qna_title,
qna_content,
qna_regtime)
VALUES(
#{user_no:INTEGER},
#{qna_category:VARCHAR},
#{qna_title:VARCHAR},
#{qna_content:VARCHAR},
CURRENT_TIMESTAMP()
);

UPDATE Qna
SET
qna_answer = #{qna_answer:VARCHAR},
qna_answertime = CURRENT_TIMESTAMP()
WHERE qna_no = #{qna_no:INTEGER};

SELECT * FROM Qna;

INSERT INTO Faq(
faq_category,
faq_question,
faq_answer)
VALUES(
#{faq_category:VARCHAR},
#{faq_question:VARCHAR},
#{faq_answer:VARCHAR}
);

UPDATE Faq
SET
faq_category = #{faq_category:VARCHAR},
faq_question = #{faq_question:VARCHAR},
faq_answer = #{faq_answer:VARCHAR},
faq_del_check = #{faq_del_check:BOOLEAN}
WHERE faq_no = #{faq_no:INTEGER};

SELECT * FROM Faq;
SELECT * FROM Faq WHERE faq_no = #{faq_no:INTEGER};
SELECT * FROM Faq WHERE faq_category = #{faq_category:VARCHAR};

