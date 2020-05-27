package com.ssafy.backspring.model.dto;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Faq implements Serializable{
	private static final long serialVersionUID = -4093560822416793031L;
	private int faq_no;// 자주하는 질문 관리번호 기본키, 자동증가
	private String faq_category; // 질문 카테고리
	private String faq_question;// 질문 제목
	private String faq_answer;// 답변 내용
	private boolean faq_del_check;
}
/*
CREATE TABLE Faq(
		faq_no INT PRIMARY KEY AUTO_INCREMENT,
        faq_category VARCHAR(100) NOT NULL,
        faq_question VARCHAR(200) NOT NULL,
        faq_answer VARCHAR(3000) NOT NULL,
        faq_del_check BOOLEAN DEFAULT FALSE
);
*/
