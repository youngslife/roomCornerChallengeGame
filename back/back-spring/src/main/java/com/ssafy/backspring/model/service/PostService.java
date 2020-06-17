package com.ssafy.backspring.model.service;

import java.util.List;

import com.ssafy.backspring.model.dto.Post;

public interface PostService {
	public void insert(Post post);
	public Post search(int post_no);
	public List<Post> searchAll();
	public void update(Post post);
	public void delete(int post_no);
	public Post searchPostDetail(int post_no);
	public void addPostViews(int post_no);
	public void addPostRecommendation(int post_no);
}
