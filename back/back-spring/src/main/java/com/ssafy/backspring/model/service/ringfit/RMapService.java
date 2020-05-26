package com.ssafy.backspring.model.service.ringfit;

import java.util.List;

import com.ssafy.backspring.model.dto.ringfit.RMap;

public interface RMapService {
	public void insert(RMap rmap);
	public RMap search(int rmap_no);
	public List<RMap> searchAll();
	public void update(RMap rmap);
	public void delete(int rmap_no);
}
