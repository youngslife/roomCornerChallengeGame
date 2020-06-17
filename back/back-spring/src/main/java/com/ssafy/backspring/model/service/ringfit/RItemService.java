package com.ssafy.backspring.model.service.ringfit;

import java.util.List;

import com.ssafy.backspring.model.dto.ringfit.RItem;

public interface RItemService {
	public void insert(RItem ritem);
	public RItem search(int ritem_no);
	public List<RItem> searchAll();
	public void update(RItem ritem);
	public void delete(int ritem_no);
}
