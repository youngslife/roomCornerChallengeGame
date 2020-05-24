USE pjt3db;


DROP TABLE COMMENT;
DROP TABLE POST;
DROP TABLE BOARD;
DROP TABLE USER;

CREATE TABLE USER(
		user_no INT PRIMARY KEY AUTO_INCREMENT,								# 유저 관리번호
        user_email VARCHAR(150) NOT NULL UNIQUE,							# 이메일
		user_name VARCHAR( 50),												# 유저이름
        uesr_password VARCHAR(500), 										# 비밀번호 (없앨수도 있지만 일단)
        user_token VARCHAR(500), 											# 토큰 (없앨수도 있지만 일단)
        user_sex INT DEFAULT 0,												# 유저성별(남 0, 여 1)
        user_age INT DEFAULT 0, CHECK (user_age >= 0 AND user_age <= 100),	# 유저 나이(0~100)
        user_grant INT DEFAULT 0,											# 유저 권한 수준 (일반사용자 0, 관리자 1)
		user_login_type INT,												# 어떤 종류로 로그인했는지 (사이트 0, 카카오 1, 구글 2)
        user_del_check BOOLEAN DEFAULT FALSE,								# 유저 탈퇴여부
		user_lastlogin DATETIME DEFAULT CURRENT_TIMESTAMP(), 				# 마지막 로그인시간
        user_regtime DATETIME DEFAULT CURRENT_TIMESTAMP()					# 유저 가입 시간
);

CREATE TABLE BOARD(
		board_no INT PRIMARY KEY AUTO_INCREMENT,							# 게시판 관리번호
        board_title VARCHAR(200) NOT NULL UNIQUE,							# 게시판 이름
		board_category VARCHAR(200),										# 게시판 카테고리											# 어떤 종류로 로그인했는지 (사이트 0, 카카오 1, 구글 2)
        board_del_check BOOLEAN DEFAULT FALSE								# 게시판 삭제여부
);

CREATE TABLE POST(
		post_no INT PRIMARY KEY AUTO_INCREMENT,						# 게시물 관리번호
        board_no INT NOT NULL,										# 게시판 번호
		user_no INT NOT NULL,										# 유저번호
        post_title VARCHAR(200) NOT NULL, 							# 게시물 제목
        post_content VARCHAR(3000) NOT NULL, 						# 게시물 내용
        post_recommendation_num INT DEFAULT 0,						# 게시물 추천수
        post_views_num INT DEFAULT 0,								# 게시물 조회수
		post_blamed BOOLEAN DEFAULT FALSE,							# 게시물 신고여부
        post_del_check BOOLEAN DEFAULT FALSE,						# 게시물 삭제여부
		post_regtime DATETIME DEFAULT CURRENT_TIMESTAMP(), 			# 게시물 등록시간
        post_updatetime DATETIME DEFAULT CURRENT_TIMESTAMP(),		# 게시물 수정시간
        post_tag VARCHAR(500),										# 게시물 태그
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

CREATE TABLE IMAGE(
		img_no INT PRIMARY KEY AUTO_INCREMENT, # 이미지 관리번호
		img_type VARCHAR(50) NOT NULL, # 이미지 종류
		# user_profile, post_img, monster_img, map_img
		img_type_no INT, 		# 해당 테이블에서 필요에 맞는 번호 가져오기
		img_name VARCHAR(300),	# 이미지 이름
		img_path VARCHAR(1000),	# 이미지 경로
		img_purpose VARCHAR(100),# 이미지 사옹 목적
        img_extension VARCHAR(50), # 이미지 확장자
        img_del_check BOOLEAN DEFAULT FALSE
);
CREATE TABLE UserGameInfo(
		uginfo_no INT PRIMARY KEY AUTO_INCREMENT,
        user_no INT NOT NULL,
		uginfo_level INT DEFAULT 1,
		uginfo_experience INT DEFAULT 0,
		uginfo_golds INT DEFAULT 0,
		uginfo_active_score DOUBLE DEFAULT 0.0,
        uginfo_del_check BOOLEAN DEFAULT FALSE,
        FOREIGN KEY(user_no) REFERENCES USER(user_no)
);

CREATE TABLE RStage(
		rstage_no INT PRIMARY KEY AUTO_INCREMENT, # 스테이지 관리번호
		rstage_name VARCHAR(100) NOT NULL, #스테이지 이름
		rstage_theme VARCHAR(200), #스테이지 테마
        rstage_del_check BOOLEAN DEFAULT FALSE
);
CREATE TABLE RUserInfo(
		ruserinfo_no INT PRIMARY KEY AUTO_INCREMENT,
		rstage_no INT NOT NULL,
		user_no INT NOT NULL,
		ruserinfo_hp INT DEFAULT 10,
		ruserinfo_iscleared BOOLEAN DEFAULT FALSE,
		ruserinfo_iswon BOOLEAN DEFAULT FALSE,
        ruserinfo_golds INT DEFAULT 0,
        rsuerinfo_del_check BOOLEAN DEFAULT FALSE,
        FOREIGN KEY(rstage_no) REFERENCES RStage(rstage_no),
        FOREIGN KEY(user_no) REFERENCES USER(user_no)
);

CREATE TABLE RGameInfo(
		rgameinfo_no INT PRIMARY KEY AUTO_INCREMENT,
		ruserinfo_no INT NOT NULL,
		rgameinfo_startdate DATETIME DEFAULT CURRENT_TIMESTAMP(),
		rgameinfo_playtime DATETIME,
		rgameinfo_enddate DATETIME,
		rgameinfo_level INT DEFAULT 1,
		rgameinfo_perfect_num INT DEFAULT 0,
		rgameinfo_great_num INT DEFAULT 0,
		rgameinfo_good_num INT DEFAULT 0,
		rgameinfo_miss_num INT DEFAULT 0,
		rgameinfo_rank VARCHAR(5) , # S+ S S- A+ A A- .. F
		rgameinfo_kcal DOUBLE DEFAULT 0.0,
		rgameinfo_score DOUBLE DEFAULT 0.0,
        rgameinfo_del_check BOOLEAN DEFAULT FALSE,
        FOREIGN KEY(ruserinfo_no) REFERENCES RUserInfo(ruserinfo_no)
);

CREATE TABLE RMap(
		rmap_no INT PRIMARY KEY AUTO_INCREMENT,
        rstage_no INT NOT NULL,
        rmap_length INT,
        rmap_del_check BOOLEAN DEFAULT FALSE,
        FOREIGN KEY(rstage_no) REFERENCES RStage(rstage_no)
);

CREATE TABLE RMonster(
		rmon_no INT PRIMARY KEY AUTO_INCREMENT,
		rmon_name VARCHAR(100) NOT NULL,
		rmon_level INT DEFAULT 1,
		rmon_hp INT DEFAULT 10,
		rmon_grade VARCHAR(50),
		rmon_description VARCHAR(1000),
        rmon_del_check BOOLEAN DEFAULT FALSE
);

CREATE TABLE RItem(
		ritem_no INT PRIMARY KEY AUTO_INCREMENT,
		ritem_name VARCHAR(100) NOT NULL,
		ritem_price INT NOT NULL,
		ritem_category VARCHAR(200),
		ritem_desc VARCHAR(1000),
        ritem_del_check BOOLEAN DEFAULT FALSE
);

CREATE TABLE RShop(
		rshop_no INT PRIMARY KEY AUTO_INCREMENT,
		rshop_name VARCHAR(100) NOT NULL,
        rshop_del_check BOOLEAN DEFAULT FALSE
);


DROP TABLE rmap;
DROP TABLE rmonster;
DROP TABLE rstage;
DROP TABLE ruserinfo;
DROP TABLE rgameinfo;
DROP TABLE image;