package com.ssafy.backspring.model.service.ringfit;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.backspring.model.dao.ringfit.RGameInfoDao;
import com.ssafy.backspring.model.dto.ringfit.RItem;
@Service
public class RItemServiceImpl implements RItemService {

	@Autowired
	private RItemService dao;
	@Override
	public void insert(RItem ritem) {
		try {
			dao.insert(ritem);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public RItem search(int ritem_no) {
		try {
			return dao.search(ritem_no);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<RItem> searchAll() {
		try {
			return dao.searchAll();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public void update(RItem ritem) {
		try {
			dao.update(ritem);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void delete(int ritem_no) {
		try {
			dao.delete(ritem_no);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
