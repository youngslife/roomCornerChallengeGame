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
public class RShop implements Serializable {
	private static final long serialVersionUID = -655219218457354366L;
	private int rshop_no;
	private String rshop_name;
	private boolean rshop_del_check;
	private List<RItem> rshop_itemList;
	private List<Image> rshop_imgList;
}          
/*
상점 관리번호 //샵별로 나눌 수 있을 때는 대비. 1개로 충분하면 1번만 쓰면됨
//원래 재화가 여러개면 재화별 상점 등으로도 가능한데 음 일단 이정도만
상점 이름
아이템 리스트
이미지 리스트 광고용
*/