package com.ssafy.backspring.model.dto;

import java.io.Serializable;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Comment implements Serializable{
	private static final long serialVersionUID = -1588809196273555099L;
	private int cmt_no;
	private int post_no;
	private int user_no; //댓글작성자
	private int cmt_parent_no; //null가능 
	//post번호로 가져오고 이 parent번호로 정렬하면 수정해도 순서대로 그대로 있다. 이 번호 넣는거는 댓글에서 첫댓글의 답글들을 따라 내려가서 마지막 번호를 취해야하네
	private String cmt_content;
	private int cmt_recommendation_num;
	private boolean cmt_blamed;
	private boolean cmt_del_check;
	private String cmt_regtime;
	private String cmt_updatetime;
	private User cmt_user;
	//음 이걸로 대댓글할거였는데 귀찮아지니까 일단 냅두고 나중에 ㄱ
	private List<Comment> cmt_childList;
}
