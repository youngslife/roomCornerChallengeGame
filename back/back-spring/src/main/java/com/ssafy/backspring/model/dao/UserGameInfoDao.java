package com.ssafy.backspring.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.backspring.model.dto.UserGameInfo;

@Mapper
public interface UserGameInfoDao {
	public void insert(int user_no);
	public UserGameInfo search(int uginfo_no);
	public List<UserGameInfo> searchAll();
	public void update(UserGameInfo uginfo);
	public void delete(int uginfo_no);
}
