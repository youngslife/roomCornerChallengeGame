USE pjt3db;

DROP TABLE COMMENT;
DROP TABLE POST;
DROP TABLE BOARD;
DROP TABLE USER;

#################################유저#################################
CREATE TABLE User(
	user_no INT PRIMARY KEY AUTO_INCREMENT,								# 유저 관리번호
	user_email VARCHAR(150) NOT NULL UNIQUE,							# 이메일
	user_name VARCHAR( 50),												# 유저이름
	user_token VARCHAR(500), 											# 토큰 (없앨수도 있지만 일단)
	user_sex INT DEFAULT 0,												# 유저성별(남 0, 여 1)
    user_birthday DATETIME,												# 유저 생년월일
	user_age INT DEFAULT 0, CHECK (user_age >= 0 AND user_age <= 100),	# 유저 나이(0~100)
	user_grant INT DEFAULT 0,											# 유저 권한 수준 (일반사용자 0, 관리자 1)
	user_login_type INT,												# 어떤 종류로 로그인했는지 (사이트 0, 카카오 1, 구글 2)
	user_del_check BOOLEAN DEFAULT FALSE,								# 유저 탈퇴여부
	user_lastlogin DATETIME DEFAULT CURRENT_TIMESTAMP(), 				# 마지막 로그인시간
	user_regtime DATETIME DEFAULT CURRENT_TIMESTAMP()					# 유저 가입 시간
);

CREATE TABLE Usergameinfo (
	uginfo_no INT PRIMARY KEY AUTO_INCREMENT,
	user_no INT NOT NULL,
	uginfo_level INT DEFAULT 1,
	uginfo_experience INT DEFAULT 0,
	uginfo_gold INT DEFAULT 0,
	uginfo_active_score DOUBLE DEFAULT 0.0,
	uginfo_del_check BOOLEAN DEFAULT FALSE,
	FOREIGN KEY (user_no) REFERENCES User (user_no)
);

###############################웹 기본#################################
CREATE TABLE Board(
	board_no INT PRIMARY KEY AUTO_INCREMENT,							# 게시판 관리번호
	board_location INT NOT NULL,										# 게시판 위치 main(1), game1(2), game2 ... 
	board_title VARCHAR(200) NOT NULL,									# 게시판 종류 소식, 가이드, 커뮤니티..
	board_subtitle VARCHAR(200) NOT NULL,								# 게시판내 종류 공지사항, 이벤트, 패치노트, 게임가이드..											
	board_del_check BOOLEAN DEFAULT FALSE								# 게시판 삭제여부
);

CREATE TABLE Post(
	post_no INT PRIMARY KEY AUTO_INCREMENT,						# 게시물 관리번호
	board_no INT NOT NULL,										# 게시판 번호
	user_no INT NOT NULL,										# 유저번호
	post_type VARCHAR(100),										# 게시물 종류(자유, 공지,  
	post_title VARCHAR(200) NOT NULL, 							# 게시물 제목
	post_content VARCHAR(3000) NOT NULL, 						# 게시물 내용
	post_recommendation_num INT DEFAULT 0,						# 게시물 추천수
	post_views_num INT DEFAULT 0,								# 게시물 조회수
	post_blamed BOOLEAN DEFAULT FALSE,							# 게시물 신고여부
	post_del_check BOOLEAN DEFAULT FALSE,						# 게시물 삭제여부
	post_regtime DATETIME DEFAULT CURRENT_TIMESTAMP(), 			# 게시물 등록시간
	post_updatetime DATETIME DEFAULT CURRENT_TIMESTAMP(),		# 게시물 수정시간
	FOREIGN KEY(board_no) REFERENCES BOARD(board_no),
	FOREIGN KEY(user_no) REFERENCES USER(user_no)
);

CREATE TABLE Comment(
	cmt_no INT PRIMARY KEY AUTO_INCREMENT,						# 댓글 관리번호
	post_no INT NOT NULL,										# 게시물 번호
	user_no INT NOT NULL,										# 유저번호
	cmt_parent_no INT, 											# 댓글 제목
	cmt_content VARCHAR(1000) NOT NULL, 						# 댓글 내용
	cmt_recommendation_num INT DEFAULT 0,						# 댓글 추천수
	cmt_blamed BOOLEAN DEFAULT FALSE,							# 댓글 신고여부
	cmt_del_check BOOLEAN DEFAULT FALSE,						# 댓글 삭제여부
	cmt_regtime DATETIME DEFAULT CURRENT_TIMESTAMP(), 			# 댓글 등록시간
	cmt_updatetime DATETIME DEFAULT CURRENT_TIMESTAMP(),		# 댓글 수정시간
	FOREIGN KEY(post_no) REFERENCES POST(post_no),
	FOREIGN KEY(user_no) REFERENCES USER(user_no)
);

CREATE TABLE Qna(
	qna_no INT PRIMARY KEY AUTO_INCREMENT,
	user_no INT NOT NULL,
	qna_category VARCHAR(100) NOT NULL,
	qna_title VARCHAR(200) NOT NULL,
	qna_content VARCHAR(3000) NOT NULL,
	qna_answer VARCHAR(3000),
	qna_regtime DATETIME DEFAULT CURRENT_TIMESTAMP(),
	qna_updatetime DATETIME DEFAULT CURRENT_TIMESTAMP(),
	qna_anstime DATETIME,
	qna_del_check BOOLEAN DEFAULT FALSE,
	FOREIGN KEY(user_no) REFERENCES USER(user_no)
);

CREATE TABLE Faq(
	faq_no INT PRIMARY KEY AUTO_INCREMENT,
	faq_category VARCHAR(100) NOT NULL,
	faq_question VARCHAR(200) NOT NULL,
	faq_answer VARCHAR(3000) NOT NULL,
	faq_del_check BOOLEAN DEFAULT FALSE
);

CREATE TABLE Image (
	img_no INT PRIMARY KEY AUTO_INCREMENT,
	img_type VARCHAR(50) NOT NULL,
	img_type_no INT DEFAULT NULL,
	img_name VARCHAR(300) DEFAULT NULL,
	img_path VARCHAR(1000) DEFAULT NULL,
	img_purpose VARCHAR(100) DEFAULT NULL,
	img_extension VARCHAR(50) DEFAULT NULL,
	img_del_check BOOLEAN DEFAULT FALSE
);

#################################링피트(싸피몬)#############################

CREATE TABLE RStage (
  rstage_no INT PRIMARY KEY AUTO_INCREMENT,
  rstage_name VARCHAR(100) NOT NULL,
  rstage_theme VARCHAR(200),
  rstage_del_check BOOLEAN DEFAULT FALSE
);

CREATE TABLE RUserinfo (
  ruserinfo_no INT PRIMARY KEY AUTO_INCREMENT,
  rstage_no INT NOT NULL,
  user_no INT NOT NULL,
  ruserinfo_hp INT DEFAULT 10,
  ruserinfo_iscleared BOOLEAN DEFAULT FALSE,
  ruserinfo_iswon BOOLEAN DEFAULT FALSE,
  ruserinfo_golds INT DEFAULT 0,
  ruserinfo_del_check BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (rstage_no) REFERENCES RStage (rstage_no),
  FOREIGN KEY (user_no) REFERENCES User (user_no)
);

CREATE TABLE RGameinfo (
	rgameinfo_no INT PRIMARY KEY AUTO_INCREMENT,
	ruserinfo_no INT NOT NULL,
	rgameinfo_startdate DATETIME DEFAULT CURRENT_TIMESTAMP(),
	rgameinfo_playtime TIME,
	rgameinfo_enddate DATETIME,
	rgameinfo_level INT DEFAULT 1,
	rgameinfo_perfect_num INT DEFAULT 0,
	rgameinfo_great_num INT DEFAULT 0,
	rgameinfo_good_num INT DEFAULT 0,
	rgameinfo_miss_num INT DEFAULT 0,
	rgameinfo_rank VARCHAR(5) ,
	rgameinfo_kcal DOUBLE DEFAULT 0,
	rgameinfo_score DOUBLE DEFAULT 0,
	rgameinfo_del_check BOOLEAN DEFAULT FALSE,
	FOREIGN KEY(ruserinfo_no) REFERENCES RUserinfo(ruserinfo_no)
);

CREATE TABLE RMap (
  rmap_no INT PRIMARY KEY AUTO_INCREMENT,
  rstage_no INT NOT NULL,
  rmap_length INT DEFAULT NULL,
  rmap_del_check BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (rstage_no) REFERENCES RStage (rstage_no)
);

CREATE TABLE RMonster (
  rmon_no INT PRIMARY KEY AUTO_INCREMENT,
  rmon_name VARCHAR(100) NOT NULL,
  rmon_level INT DEFAULT 1,
  rmon_hp INT DEFAULT 10,
  rmon_grade VARCHAR(50) ,
  rmon_description VARCHAR(1000) DEFAULT NULL,
  rmon_del_check BOOLEAN DEFAULT FALSE
);

CREATE TABLE RShop (
  rshop_no INT PRIMARY KEY AUTO_INCREMENT,
  rshop_name VARCHAR(100) NOT NULL,
  rshop_del_check BOOLEAN DEFAULT FALSE
);

CREATE TABLE RItem (
  ritem_no INT PRIMARY KEY AUTO_INCREMENT,
  rshop_no INT NOT NULL,
  ritem_name VARCHAR(100) NOT NULL,
  ritem_price INT NOT NULL,
  ritem_category VARCHAR(200),
  ritem_desc VARCHAR(1000),
  ritem_del_check BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (rshop_no) REFERENCES RShop (rshop_no)
);



select * from RStage;
select * from RMonster;
select * from RMap;
select * from Image;

select * from User;

select * from RStage;

