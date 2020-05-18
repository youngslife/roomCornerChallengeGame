package com.ssafy.backspring.model.dto;

import java.io.Serializable;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Post implements Serializable{
	private static final long serialVersionUID = -4122024090200597898L;
	private int post_no;
	private int board_no;
	private int user_no; //유저번호로 게시물 작성자 연동
	private String post_title;
	private String post_content;
	private int post_recommendation_num;
	private int post_views_num;
	private boolean post_blamed;
	private boolean post_del_check;
	private String post_regtime;
	private String post_updatetime;
	private User post_user;
	private List<Comment> post_cmtList;
}
