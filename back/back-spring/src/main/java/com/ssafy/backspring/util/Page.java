package com.ssafy.backspring.util;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Page {
	@Getter
	private int page; // 현재 페이지 번호( != 특정 페이지의 첫번째 게시글 번호(이건 getPageStart() 거쳐야 함) )
	public void setPage(int page) {
		if (page <= 0) {
			this.page = 1;
		} else {
			this.page = page;
		}
	}
	@Getter
	@Setter
	private int perPageNum; // 한 페이지당 보여줄 게시글 개수
	
	
}
