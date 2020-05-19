package com.ssafy.backspring.model.dto.ringfit;

import java.io.Serializable;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class RStage implements Serializable {
	private static final long serialVersionUID = 4283029554981714441L;
	private int rstage_no;
	private String rstage_name;
	private String rstage_theme;
	private RMap rstage_map;
	private List<RMonster> rstage_monster;
}
/*
스테이지 클래스
스테이지 관리번호
스테이지 이름
스테이지 테마 //필요하다면 사용
맵
몬스터 리스트
*/