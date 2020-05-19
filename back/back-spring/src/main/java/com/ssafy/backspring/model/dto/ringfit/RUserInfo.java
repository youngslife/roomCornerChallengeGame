package com.ssafy.backspring.model.dto.ringfit;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RUserInfo implements Serializable{
	private static final long serialVersionUID = -397072170135779950L;
	private int ruserinfo_no;
	private int ruserinfo_difficulty;
	private int rstage_no;
	private int user_no;
	private int ruserinfo_challenge_num;
	private boolean ruserinfo_iscleared;
	private RGameInfo ruserinfo_gameinfo;
}
/*
유저 정보 클래스
유저 정보 관리 번호
난이도
스테이지 번호
유저 번호
도전 회수
클리어 여부
게임 정보
*/