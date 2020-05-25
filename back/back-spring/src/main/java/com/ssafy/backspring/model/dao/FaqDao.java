package com.ssafy.backspring.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.backspring.model.dto.Faq;

@Mapper
public interface FaqDao {
	public void insert(Faq Faq);
	public void update(Faq Faq);
	public void delete(int faq_no);
	public Faq search(int faq_no);
	public List<Faq> searchAll();
	public List<Faq> searchFaqCategory(String faq_category); //카테고리로 검색
}
