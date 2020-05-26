package com.ssafy.backspring.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.backspring.model.dto.Post;

@Mapper
public interface PostDao {
	//CRUD
	public void insert(Post post);
	public Post search(int post_no);
	public List<Post> searchAll();
	public void update(Post post);
	public void delete(int post_no);
	public Post searchPostDetail(int post_no);
	public void addPostViews(int post_no);
	public void addPostRecommendation(int post_no);
}
