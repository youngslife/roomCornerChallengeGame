package com.ssafy.backspring.model.service;

import java.util.List;

import com.ssafy.backspring.model.dto.User;

public interface UserService {
	public void insert(User user);
	public User search(int user_no);
	public List<User> searchAll();
	public void update(User user);
	public void delete(int user_no);
	
	public boolean isValidEmail(String email);
	public User searchByEmail(String email);
	public String sha256Encryption(String password);
	
	public User searchUserDetail(int user_no);
}
