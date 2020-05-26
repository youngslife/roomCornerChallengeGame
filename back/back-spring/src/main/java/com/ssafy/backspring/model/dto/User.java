package com.ssafy.backspring.model.dto;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
//User별 포인트, 업적같은것은 다른 테이블에서 가져오는걸로하자.
//https://stufeel.tistory.com/18 lombok 인식 못할때 이걸로
@AllArgsConstructor
@NoArgsConstructor
@Data
public class User implements Serializable{
	private static final long serialVersionUID = -6840107029150158241L;
	private int user_no;
	private String user_email;
	private String user_name;
	private String user_token;
	private int user_sex;
	private String user_birthday;
	private int user_age;
	private String user_grant;
	private int user_login_type;
	private boolean user_del_check;
	private String user_lastlogin;
	private String user_regtime;
	private Image user_profile; //이미지 추가
}
/*
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
프로필사진
*/