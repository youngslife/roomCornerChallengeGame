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
/*
CREATE TABLE Comment(
		cmt_no INT PRIMARY KEY AUTO_INCREMENT,						# 댓글 관리번호
        post_no INT NOT NULL,										# 게시물 번호
		user_no INT NOT NULL,										# 유저번호
        cmt_parent_no INT, 											# 댓글 제목
        cmt_content VARCHAR(1000) NOT NULL, 						# 댓글 내용
        cmt_recommendation_num INT DEFAULT 0,						# 댓글 추천수
		cmt_blamed BOOLEAN DEFAULT FALSE,							# 댓글 신고여부
        cmt_del_check BOOLEAN DEFAULT FALSE,						# 댓글 삭제여부
		cmt_regtime DATETIME DEFAULT CURRENT_TIMESTAMP(), 			# 댓글 등록시간
        cmt_updatetime DATETIME DEFAULT CURRENT_TIMESTAMP(),		# 댓글 수정시간
        FOREIGN KEY(post_no) REFERENCES POST(post_no),
        FOREIGN KEY(user_no) REFERENCES USER(user_no)
);
 */
