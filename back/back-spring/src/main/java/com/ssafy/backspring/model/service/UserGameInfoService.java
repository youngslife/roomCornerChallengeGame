package com.ssafy.backspring.model.service;

import java.util.List;

import com.ssafy.backspring.model.dto.UserGameInfo;

public interface UserGameInfoService {
	public void insert(int user_no);
	public UserGameInfo search(int uginfo_no);
	public List<UserGameInfo> searchAll();
	public void update(UserGameInfo uginfo);
	public void delete(int uginfo_no);
}
