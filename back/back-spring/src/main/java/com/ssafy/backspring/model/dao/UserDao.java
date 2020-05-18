package com.ssafy.backspring.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.backspring.model.dto.User;

@Mapper
public interface UserDao {
	//CRUD
	public void insert(User user);
	public User search(int user_no);
	public List<User> searchAll();
	public void update(User user);
	public void delete(int user_no);
	
	public User searchByEmail(String email);
}
