package com.ssafy.backspring.model.service.ringfit;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.backspring.model.dto.ringfit.RShop;
@Service
public class RShopServiceImpl implements RShopService {
	@Autowired
	private RShopService dao;
	@Override
	public void insert(RShop rshop) {
		try {
			dao.insert(rshop);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public RShop search(int rshop_no) {
		try {
			return dao.search(rshop_no);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<RShop> searchAll() {
		try {
			return dao.searchAll();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public void update(RShop rshop) {
		try {
			dao.update(rshop);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void delete(int rshop_no) {
		try {
			dao.delete(rshop_no);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
