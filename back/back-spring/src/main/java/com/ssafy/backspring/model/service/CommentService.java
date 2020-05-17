package com.ssafy.backspring.model.service;

import java.util.List;

import com.ssafy.backspring.model.dto.Comment;

public interface CommentService {
	public void insert(Comment cmt);
	public Comment search(int cmt_no);
	public List<Comment> searchAll();
	public void update(Comment cmt);
	public void delete(int cmt_no);
}
