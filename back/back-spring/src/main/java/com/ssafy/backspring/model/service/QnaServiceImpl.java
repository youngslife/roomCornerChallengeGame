package com.ssafy.backspring.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.backspring.model.dao.QnaDao;
import com.ssafy.backspring.model.dto.Qna;
@Service
public class QnaServiceImpl implements QnaService {

	@Autowired
	private QnaDao dao;
	
	@Override
	public Qna search(int qna_no) {
		try {
			return dao.search(qna_no);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<Qna> searchAll() {
		try {
			return dao.searchAll();
		}catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public void insert(Qna Qna) {
		try {
			dao.insert(Qna);
		}catch(Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void update(Qna Qna) {
		try {
			dao.update(Qna);
		}catch(Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void delete(int qna_no) {
		try {
			dao.delete(qna_no);
		}catch(Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public List<Qna> searchUserQna(int user_no) {
		try {
			return dao.searchUserQna(user_no);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public void insertAnswer(Qna Qna) {
		try {
			dao.insert(Qna);
		}catch(Exception e) {
			e.printStackTrace();
		}
	}

}
