package com.ssafy.backspring.model.service.ringfit;

import java.util.List;

import com.ssafy.backspring.model.dto.ringfit.RMonster;

public interface RMonsterService {
	public void insert(RMonster rmonster);
	public RMonster search(int rmonster_no);
	public List<RMonster> searchAll();
	public void update(RMonster rmonster);
	public void delete(int rmonster_no);
	public List<RMonster> searchList(int inStage);
}
