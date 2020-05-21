package com.ssafy.backspring.model.dto.ringfit;

import java.io.Serializable;
import java.util.List;

import com.ssafy.backspring.model.dto.Image;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RMonster implements Serializable{
	private static final long serialVersionUID = 7025964702192442665L;
	private int rmon_no;
	private String rmon_name;
	private int rmon_level;
	private int rmon_hp;
	private String rmon_grade;
	private String rmon_description;
	private List<Image> rmon_imgs;
}
/*
몬스터 클래스
 몬스터 관리번호
 몬스터 이름 
 몬스터 레벨 (난이도에 따라 상승)
 몬스터 체력 (레벨에 따라 상승)
 몬스터 등급 (Ordinary, MiddleBoss, FinalBoss)
 몬스터 정보(간단한 설명)
 몬스터 이미지 리스트 List<ImgFile>
*/