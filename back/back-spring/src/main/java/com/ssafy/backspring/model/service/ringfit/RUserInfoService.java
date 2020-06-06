package com.ssafy.backspring.model.service.ringfit;

import java.util.List;

import com.ssafy.backspring.model.dto.ringfit.RUserInfo;
import com.ssafy.backspring.util.RInfo;

public interface RUserInfoService {
	public void insert(RUserInfo ruserinfo);
	public RUserInfo search(int ruserinfo_no);
	public List<RUserInfo> searchAll();
	public void update(RUserInfo ruserinfo);
	public void delete(int ruserinfo_no);
	public RUserInfo getLast(RInfo rinfo);
	public int getClear(RInfo rinfo);
	public int getWon(RInfo rinfo);
	public RUserInfo searchInfo(int ruserinfo_no);
}
