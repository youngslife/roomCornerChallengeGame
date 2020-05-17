package com.ssafy.backspring.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.backspring.model.dto.Comment;

@Mapper
public interface CommentDao {
	//CRUD
	public void insert(Comment cmt);
	public Comment search(int cmt_no);
	public List<Comment> searchAll();
	public void update(Comment cmt);
	public void delete(int cmt_no);
}
