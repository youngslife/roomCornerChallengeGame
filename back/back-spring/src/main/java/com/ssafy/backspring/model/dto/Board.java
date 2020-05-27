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
	private int board_location;//main, game1, game2 ... 해당 게시판 종류
	private String board_title; // 소식, 가이드, 커뮤니티..
	private String board_subtitle; //공지사항, 이벤트, 패치노트, 게임가이드..	
	private boolean board_del_check;
	private List<Post> board_postList;
}
