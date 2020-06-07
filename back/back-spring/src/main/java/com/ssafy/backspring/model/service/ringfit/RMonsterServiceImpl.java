package com.ssafy.backspring.model.service.ringfit;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.backspring.model.dao.ringfit.RMonsterDao;
import com.ssafy.backspring.model.dto.ringfit.RMonster;
@Service
public class RMonsterServiceImpl implements RMonsterService {

	@Autowired
	private RMonsterDao dao;
	@Override
	public void insert(RMonster rmonster) {
		try {
			dao.insert(rmonster);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public RMonster search(int rmonster_no) {
		try {
			return dao.search(rmonster_no);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<RMonster> searchAll() {
		try {
			return dao.searchAll();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public void update(RMonster rmonster) {
		try {
			dao.update(rmonster);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void delete(int rmonster_no) {
		try {
			dao.delete(rmonster_no);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	@Override
	public List<RMonster> searchList(int inStage){
		try {
			return dao.searchList(inStage);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
