package com.ssafy.backspring.model.dao.ringfit;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.backspring.model.dto.ringfit.RGameInfo;

@Mapper
public interface RGameInfoDao {
	public void insert(RGameInfo rgameinfo);
	public RGameInfo search(int rgameinfo_no);
	public List<RGameInfo> searchAll();
	public void update(RGameInfo rgameinfo);
	public void delete(int rgameinfo_no);
}
