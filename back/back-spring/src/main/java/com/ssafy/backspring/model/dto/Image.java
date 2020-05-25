package com.ssafy.backspring.model.dto;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Image implements Serializable{
	private static final long serialVersionUID = -4885012139050946296L;
	private int img_no;
	private String img_type; 
	// user_profile, post_img, monster_img, map_img
	private int img_type_no;
	// 필요에 맞는 번호 가져오기
	private String img_name;
	private String img_path;
	private String img_purpose; 
	private String img_extension;
	private boolean img_del_check;
	// 기본(프로필, 게시글), 
	// 몬스터 기본1, 기본2, 기본3, 피격1, 피격2, 피격3, 사망
	// 배경 맵, 조형물, 캐릭터
	// 아이콘용 등등 필요에 따라 추가하면 될듯
}
/*
이미지 클래스
이미지 관리 번호
이미지 타입(어디서 사용할 것인지)
해당 타입 관리 번호
이미지 이름
이미지 경로
이미지 목적
*/