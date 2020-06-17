package com.ssafy.backspring.model.service.ringfit;

import java.util.List;

import com.ssafy.backspring.model.dto.ringfit.RGameInfo;

public interface RGameInfoService {
	public void insert(RGameInfo rgameinfo);
	public RGameInfo search(int rgameinfo_no);
	public List<RGameInfo> searchAll();
	public void update(RGameInfo rgameinfo);
	public void delete(int rgameinfo_no);
}
