package com.ssafy.backspring.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.backspring.model.dao.ImageDao;
import com.ssafy.backspring.model.dto.Image;

@Service
public class ImageServiceImpl implements ImageService {

	@Autowired
	private ImageDao dao;
	@Override
	public void insert(Image img) {
		try {
			dao.insert(img);
		}catch(Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public Image search(int img_no) {
		try {
			return dao.search(img_no);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<Image> searchAll() {
		try {
			return dao.searchAll();
		}catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public void update(Image img) {
		try {
			dao.update(img);
		}catch(Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void delete(int img_no) {
		try {
			dao.delete(img_no);
		}catch(Exception e) {
			e.printStackTrace();
		}
	}

}
