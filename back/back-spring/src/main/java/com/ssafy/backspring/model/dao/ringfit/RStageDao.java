package com.ssafy.backspring.model.dao.ringfit;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.backspring.model.dto.ringfit.RStage;

@Mapper
public interface RStageDao {
	//CRUD
	public void insert(RStage rstage);
	public RStage search(int rstage_no);
	public List<RStage> searchAll();
	public void update(RStage rstage);
	public void delete(int rstage_no);
}
