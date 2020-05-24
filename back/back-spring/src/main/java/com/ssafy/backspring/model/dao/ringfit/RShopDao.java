package com.ssafy.backspring.model.dao.ringfit;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.backspring.model.dto.ringfit.RShop;

@Mapper
public interface RShopDao {
	public void insert(RShop rshop);
	public RShop search(int rshop_no);
	public List<RShop> searchAll();
	public void update(RShop rshop);
	public void delete(int rshop_no);
}
