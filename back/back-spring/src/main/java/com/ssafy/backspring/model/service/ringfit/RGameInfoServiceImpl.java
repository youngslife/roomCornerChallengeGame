package com.ssafy.backspring.model.service.ringfit;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.backspring.model.dao.ringfit.RGameInfoDao;
import com.ssafy.backspring.model.dto.ringfit.RGameInfo;

@Service
public class RGameInfoServiceImpl implements RGameInfoService {

	@Autowired
	private RGameInfoDao dao;
	
	@Override
	public void insert(RGameInfo rgameinfo) {
		try {
			dao.insert(rgameinfo);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public RGameInfo search(int rgameinfo_no) {
		try {
			return dao.search(rgameinfo_no);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<RGameInfo> searchAll() {
		try {
			return dao.searchAll();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public void update(RGameInfo rgameinfo) {
		try {
			dao.update(rgameinfo);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void delete(int rgameinfo_no) {
		try {
			dao.delete(rgameinfo_no);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
