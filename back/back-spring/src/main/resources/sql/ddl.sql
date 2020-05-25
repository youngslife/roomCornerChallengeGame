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
        board_location INT NOT NULL,										# 게시판 위치 main(1), game1(2), game2 ... 
        board_title VARCHAR(200) NOT NULL,									# 게시판 종류 소식, 가이드, 커뮤니티..
        board_subtitle VARCHAR(200) NOT NULL,								# 게시판내 종류 공지사항, 이벤트, 패치노트, 게임가이드..											
        board_del_check BOOLEAN DEFAULT FALSE								# 게시판 삭제여부
);

CREATE TABLE POST(
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
