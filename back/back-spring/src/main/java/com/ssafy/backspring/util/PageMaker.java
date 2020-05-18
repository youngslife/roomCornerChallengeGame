package com.ssafy.backspring.util;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

public class PageMaker {
	@Getter
	@Setter
	private Page pageBean; 
	@Getter
	private int startPage;
	public void setStartPage(int startPage) {
		this.startPage = (startPage-1)*this.pageBean.getPerPageNum();
	}
	@Getter
	private int endPage;
	public void setEndPage(int startPage) {
		this.endPage = startPage+this.pageBean.getPerPageNum();
	}
	@Getter
	@Setter
	private String searchOption; //검색조건
	@Getter
	@Setter
	private String word; //검색용 단어
	@Getter
	@Setter
	private List<String> filters;// 태그필터링
	@Getter
	@Setter int target_no; //특정게시판 번호

	


}
