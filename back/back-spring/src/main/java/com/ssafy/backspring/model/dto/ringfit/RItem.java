package com.ssafy.backspring.model.dto.ringfit;

import java.io.Serializable;

import com.ssafy.backspring.model.dto.Image;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class RItem implements Serializable {
	private static final long serialVersionUID = 3184610670029224329L;
	private int ritem_no;
	private int rshop_no;
	private String ritem_name;
	private int ritem_price;
	private String ritem_category;
	private String ritem_desc;
	private boolean ritem_del_check;
	private Image ritem_img;
}
/*
아이템 관리번호
아이템 이름
아이템 가격
아이템 이미지
아이템 카테고리
아이템 효과 설명
 */
