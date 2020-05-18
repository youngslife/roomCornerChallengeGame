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
	private String uesr_password;
	private String user_token;
	private int user_sex;
	private int user_age;
	private String user_grant;
	private int user_login_type;
	private boolean user_del_check;
	private String user_lastlogin;
	private String user_regtime;
	
}
