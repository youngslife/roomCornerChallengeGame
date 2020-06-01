package com.ssafy.backspring.model.service.ringfit;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.backspring.model.dao.ringfit.RStageDao;
import com.ssafy.backspring.model.dto.ringfit.RStage;
@Service
public class RStageServiceImpl implements RStageService {
	@Autowired
	private RStageDao dao;
	@Override
	public void insert(RStage rstage) {
		try {
			dao.insert(rstage);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public RStage search(int rstage_no) {
		try {
			return dao.search(rstage_no);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<RStage> searchAll() {
		try {
			return dao.searchAll();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public void update(RStage rstage) {
		try {
			dao.update(rstage);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void delete(int rstage_no) {
		try {
			dao.delete(rstage_no);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	@Override
	public List<RStage> checkUserinfo(int ruser_no){
		try {
			return dao.checkUserinfo(ruser_no);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
