package com.ssafy.backspring.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.backspring.model.dao.FaqDao;
import com.ssafy.backspring.model.dto.Faq;
@Service
public class FaqServiceImpl implements FaqService {

	@Autowired
	private FaqDao dao;
	
	@Override
	public Faq search(int faq_no) {
		try {
			return dao.search(faq_no);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<Faq> searchAll() {
		try {
			return dao.searchAll();
		}catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public void insert(Faq Faq) {
		try {
			dao.insert(Faq);
		}catch(Exception e) {
			e.printStackTrace();
		}		
	}

	@Override
	public void update(Faq Faq) {
		try {
			dao.update(Faq);
		}catch(Exception e) {
			e.printStackTrace();
		}		
	}

	@Override
	public void delete(int faq_no) {
		try {
			dao.delete(faq_no);
		}catch(Exception e) {
			e.printStackTrace();
		}		
	}

	@Override
	public List<Faq> searchFaqCategory(String faq_category) {
		try {
			return dao.searchFaqCategory(faq_category);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}

}
