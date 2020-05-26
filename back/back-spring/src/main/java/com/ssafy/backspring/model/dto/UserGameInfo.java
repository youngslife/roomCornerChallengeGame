package com.ssafy.backspring.model.dto;

import java.io.Serializable;
import java.util.List;

import com.ssafy.backspring.model.dto.ringfit.RItem;
import com.ssafy.backspring.model.dto.ringfit.RUserInfo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserGameInfo implements Serializable{
	//그냥 User Class가 진짜 회원자체에 대한 정보를 가지고 있다면 여기서는 유저가 전체게임을 통틀어서 갖는 정보를 갖는다.
	//유저의 재화, 레벨, 경험치, 게임별로 갖고 있는 아이템 리스트, 활동지수, 각 게임별 깬 업적 개수
	private int uginfo_no;
	private int user_no;
	private int uginfo_level;
	private int uginfo_experience;
	private int uginfo_gold;//링피트에서 쓰는거로 해두고 나중에 추가해야하거나 따로 떼어내는 건 필요하면
	private double uginfo_active_score; //게임별로 하면 유저 활동지수를 나타내는 유의미한 통계를 위한 자료로 사용될 수 있지만 일단 게시판용으로만
	private boolean uginfo_del_check;
	private List<RUserInfo> uginfo_ruserinfo;
	private List<RItem> uginfo_ritemList;
	
}
