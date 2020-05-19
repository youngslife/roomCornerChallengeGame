package com.ssafy.backspring.model.dto;

import java.io.Serializable;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Board implements Serializable{
	private static final long serialVersionUID = 8743362152756927500L;
	private int board_no;
	private String board_title;
	private String board_category;
	private boolean board_del_check;
	private List<Post> board_postList;
}
/*
게시판 클래스
게시판 번호
제목
카테고리
삭제여부
게시물 리스트
*/