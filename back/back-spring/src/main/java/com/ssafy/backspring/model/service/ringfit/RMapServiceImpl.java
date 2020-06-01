package com.ssafy.backspring.model.service.ringfit;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.backspring.model.dao.ringfit.RMapDao;
import com.ssafy.backspring.model.dto.ringfit.RMap;
@Service
public class RMapServiceImpl implements RMapService {

	@Autowired
	private RMapDao dao;
	@Override
	public void insert(RMap rmap) {
		try {
			dao.insert(rmap);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public RMap search(int rmap_no) {
		try {
			return dao.search(rmap_no);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<RMap> searchAll() {
		try {
			return dao.searchAll();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public void update(RMap rmap) {
		try {
			dao.update(rmap);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void delete(int rmap_no) {
		try {
			dao.delete(rmap_no);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
