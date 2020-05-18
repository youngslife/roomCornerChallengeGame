package com.ssafy.backspring.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.backspring.model.dao.PostDao;
import com.ssafy.backspring.model.dto.Post;

@Service
public class PostServiceImpl implements PostService {

	@Autowired
	private PostDao dao;

	@Override
	public void insert(Post post) {
		try {
			dao.insert(post);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public Post search(int post_no) {
		try {
			return dao.search(post_no);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<Post> searchAll() {
		try {
			return dao.searchAll();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public void update(Post post) {
		try {
			dao.update(post);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void delete(int post_no) {
		try {
			dao.delete(post_no);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public Post searchPostDetail(int post_no){
		try{
			return dao.searchPostDetail(post_no);
		} catch(Exception e){
			e.printStackTrace();
		}
		return null;
	}

}
