package com.ssafy.backspring.model.dto.ringfit;

import java.io.Serializable;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RGameInfo implements Serializable{
	private static final long serialVersionUID = 9036685713488321811L;
	private int rgameinfo_no;
	private String rgameinfo_startdate;
	private String rgameinfo_playtime;
	private String rgameinfo_enddate;
	private int rgameinfo_perfect_num;
	private int rgameinfo_great_num;
	private int rgameinfo_good_num;
	private int rgameinfo_miss_num;
	private double rgameinfo_kcal;
	private double rgameinfo_point;
}
/*
게임정보 클래스
게임정보 관리번호
게임시작 날짜 및 시간
플레이타임
게임종료 날짜 및 시간
퍼펙트 횟수
그레이트 횟수
굿 횟수
미스 횟수
소모한 총 칼로리
총점수
*/