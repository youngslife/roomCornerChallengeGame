package com.ssafy.backspring.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.backspring.model.dao.CommentDao;
import com.ssafy.backspring.model.dto.Comment;

@Service
public class CommentServiceImpl implements CommentService {

	@Autowired
	private CommentDao dao;

	@Override
	public void insert(Comment cmt) {
		try {
			dao.insert(cmt);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public Comment search(int cmt_no) {
		try {
			return dao.search(cmt_no);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<Comment> searchAll() {
		try {
			return dao.searchAll();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public void update(Comment cmt) {
		try {
			dao.update(cmt);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void delete(int cmt_no) {
		try {
			dao.delete(cmt_no);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
