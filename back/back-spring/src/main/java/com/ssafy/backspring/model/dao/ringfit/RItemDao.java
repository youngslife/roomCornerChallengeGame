package com.ssafy.backspring.model.dao.ringfit;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.backspring.model.dto.ringfit.RItem;

@Mapper
public interface RItemDao {
	public void insert(RItem ritem);
	public RItem search(int ritem_no);
	public List<RItem> searchAll();
	public void update(RItem ritem);
	public void delete(int ritem_no);
}
