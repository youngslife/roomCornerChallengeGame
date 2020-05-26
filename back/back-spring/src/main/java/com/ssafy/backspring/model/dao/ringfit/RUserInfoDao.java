package com.ssafy.backspring.model.dao.ringfit;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.backspring.model.dto.ringfit.RUserInfo;

@Mapper
public interface RUserInfoDao {
	public void insert(RUserInfo ruserinfo);
	public RUserInfo search(int ruserinfo_no);
	public List<RUserInfo> searchAll();
	public void update(RUserInfo ruserinfo);
	public void delete(int ruserinfo_no);
}
