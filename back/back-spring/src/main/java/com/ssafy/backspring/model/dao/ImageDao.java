package com.ssafy.backspring.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.backspring.model.dto.Image;

@Mapper
public interface ImageDao {
	//CRUD
	public void insert(Image img);
	public Image search(int img_no);
	public List<Image> searchAll();
	public void update(Image img);
	public void delete(int img_no);
	
}
