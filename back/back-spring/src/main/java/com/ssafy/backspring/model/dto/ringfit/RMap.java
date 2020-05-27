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
public class RMap implements Serializable{
	private static final long serialVersionUID = -1170428055306499932L;
	private int rmap_no;
	private int rstage_no;
	private int rmap_length;
	private boolean rmap_del_check;
	private List<Image> rmap_imgs;
}
/*
맵 클래스
맵 관리번호
스테이지 번호(스테이지마다 맵 다르게하려면 스테이지클래스에서 리스트로 받을 것)
맵길이(난이도에 따라 변화하도록 셋팅할 것)
맵이미지리스트
*/