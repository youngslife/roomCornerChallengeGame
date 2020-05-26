package com.ssafy.backspring.model.dto;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Qna implements Serializable{
	private static final long serialVersionUID = 7638286426467205887L;
	private int qna_no;//  Q&A 관리번호 기본키, 자동증가
	private int user_no;// 질문한 회원 번호 외래키
	private String qna_category;// 카테고리
	private String qna_title;   // Q&A 질문 제목
	private String qna_content; // Q&A 질문 내용
	private String qna_answer;  // 질문 답변
	private String qna_regtime; // 질문 등록 시간
	private String qna_updatetime; //질문 수정 시간
	private String qna_anstime; // 답변시간
	private boolean qna_del_check;
}
/*
CREATE TABLE Qna(
		qna_no INT PRIMARY KEY AUTO_INCREMENT,
        user_no INT NOT NULL,
        qna_category VARCHAR(100) NOT NULL,
        qna_title VARCHAR(200) NOT NULL,
        qna_content VARCHAR(3000) NOT NULL,
        qna_answer VARCHAR(3000),
        qna_regtime DATETIME DEFAULT CURRENT_TIMESTAMP(),
        qna_updatetime DATETIME DEFAULT CURRENT_TIMESTAMP(),
        qna_anstime DATETIME,
        qna_del_check BOOLEAN DEFAULT FALSE,
        FOREIGN KEY(user_no) REFERENCES USER(user_no)
);
*/
