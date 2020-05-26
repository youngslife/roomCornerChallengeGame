package com.ssafy.backspring.model.service;

import java.util.List;

import com.ssafy.backspring.model.dto.Image;

public interface ImageService {
	public void insert(Image img);
	public Image search(int img_no);
	public List<Image> searchAll();
	public void update(Image img);
	public void delete(int img_no);
}
