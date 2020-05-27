package com.ssafy.backspring.model.service.ringfit;

import java.util.List;

import com.ssafy.backspring.model.dto.ringfit.RStage;

public interface RStageService {
	public void insert(RStage rstage);
	public RStage search(int rstage_no);
	public List<RStage> searchAll();
	public void update(RStage rstage);
	public void delete(int rstage_no);
}
