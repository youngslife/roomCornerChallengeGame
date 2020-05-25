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
	private String post_type;
	private String post_title;
	private String post_content;
	private int post_recommendation_num;
	private int post_views_num;
	private boolean post_blamed;
	private boolean post_del_check;
	private String post_regtime;
	private String post_updatetime;
	private String post_tag;
	private User post_user;
	private List<Comment> post_cmtList;
	private List<Image> post_imgs;
}
/*
게시물 클래스
게시물 관리번호
게시판 번호
유저 번호
게시물 제목
게시물 내용
게시물 추천수
게시물 조회수
게시물 신고여부
게시물 삭제여부
게시물 등록시간
게시물 수정시간
게시물 태그
작성자
댓글 리스트
이미지 리스트
*/