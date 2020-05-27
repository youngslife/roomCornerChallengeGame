package com.ssafy.backspring.model.service.ringfit;

import java.util.List;

import com.ssafy.backspring.model.dto.ringfit.RUserInfo;

public interface RUserInfoService {
	public void insert(RUserInfo ruserinfo);
	public RUserInfo search(int ruserinfo_no);
	public List<RUserInfo> searchAll();
	public void update(RUserInfo ruserinfo);
	public void delete(int ruserinfo_no);
}
