package com.ssafy.backspring.model.dto.ringfit;

import java.io.Serializable;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RUserInfo implements Serializable{
	private static final long serialVersionUID = -397072170135779950L;
	private int ruserinfo_no;
	private int rstage_no;
	private int user_no;
	private int ruserinfo_hp;
	private boolean ruserinfo_iscleared;
	private boolean ruserinfo_iswon;
	private int ruserinfo_golds;
	private boolean ruserinfo_del_check;
	private RGameInfo ruserinfo_gameinfo;
}
/*
유저 정보 클래스
유저 정보 관리 번호
스테이지 번호
유저 번호
유저 체력 
클리어 여부(1회이상 승리한적이 있는가 있을 때 최고 점수 등을 표기하자)
승리 여부(승리 / 유저사망 or 실패)
게임 정보
유저 코스튬 리스트 (없으면 기본 0번 선택)
유저 재화 (해당 게임에서 먹은 돈)
유저 아이템 리스트

도전 회수 이거는 걍 이거 갯수 뽑아다주면되니까
*/