package com.ssafy.backspring.util;

import java.util.List;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@ToString
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
	@Setter 
	int location;// 게시판 위치(홈,링피트,등등) 숫자로
	@Getter
	@Setter
	String title;//게시판 제목(게임소식, 가이드 등등)
	@Getter
	@Setter
	String subtitle;//게시판내 소제목(공지사항, 이벤트, 등등)
	


}
