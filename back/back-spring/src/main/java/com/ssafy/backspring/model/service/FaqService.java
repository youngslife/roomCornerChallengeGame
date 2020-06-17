package com.ssafy.backspring.model.service;

import java.util.List;

import com.ssafy.backspring.model.dto.Faq;

public interface FaqService {
	public Faq search(int faq_no);
	public List<Faq> searchAll();
	public void insert(Faq Faq);
	public void update(Faq Faq);
	public void delete(int faq_no);
	public List<Faq> searchFaqCategory(String faq_category); //카테고리로 검색
}
