package com.ssafy.backspring.model.dao.ringfit;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.backspring.model.dto.ringfit.RMap;

@Mapper
public interface RMapDao {
	public void insert(RMap rmap);
	public RMap search(int rmap_no);
	public List<RMap> searchAll();
	public void update(RMap rmap);
	public void delete(int rmap_no);
}
