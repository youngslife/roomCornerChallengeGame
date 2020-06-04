package com.ssafy.backspring.model.service.ringfit;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.backspring.model.dao.ringfit.RUserInfoDao;
import com.ssafy.backspring.model.dto.ringfit.RUserInfo;
import com.ssafy.backspring.util.RInfo;
@Service
public class RUserInfoServiceImpl implements RUserInfoService {
	@Autowired
	private RUserInfoDao dao;
	@Override
	public void insert(RUserInfo ruserinfo) {
		try {
			dao.insert(ruserinfo);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public RUserInfo search(int ruserinfo_no) {
		try {
			return dao.search(ruserinfo_no);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<RUserInfo> searchAll() {
		try {
			return dao.searchAll();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public void update(RUserInfo ruserinfo) {
		try {
			dao.update(ruserinfo);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void delete(int ruserinfo_no) {
		try {
			dao.delete(ruserinfo_no);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	@Override
	public RUserInfo getLast(RInfo rinfo) {
		try {
			return dao.getLast(rinfo);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
