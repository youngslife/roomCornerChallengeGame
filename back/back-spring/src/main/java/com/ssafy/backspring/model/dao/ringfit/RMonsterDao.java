package com.ssafy.backspring.model.dao.ringfit;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.backspring.model.dto.ringfit.RMonster;
@Mapper
public interface RMonsterDao {
	public void insert(RMonster rmonster);
	public RMonster search(int rmonster_no);
	public List<RMonster> searchAll();
	public void update(RMonster rmonster);
	public void delete(int rmonster_no);
}
