package com.ssafy.backspring.model.dao.ringfit;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.backspring.model.dto.ringfit.RUserInfo;
import com.ssafy.backspring.util.RInfo;

@Mapper
public interface RUserInfoDao {
	public void insert(RUserInfo ruserinfo);
	public RUserInfo search(int ruserinfo_no);
	public RUserInfo getLast(RInfo rinfo);
	public List<RUserInfo> searchAll();
	public void update(RUserInfo ruserinfo);
	public void delete(int ruserinfo_no);
	public int getClear(RInfo rinfo);
	public int getWon(RInfo rinfo);
	public RUserInfo searchInfo(int ruserinfo_no);
}
