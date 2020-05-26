package com.ssafy.backspring.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.backspring.model.dto.Board;
import com.ssafy.backspring.util.PageMaker;

@Mapper
public interface BoardDao {
	//CRUD
	public void insert(Board board);
	public Board search(int board_no);
	public List<Board> searchAll();
	public void update(Board board);
	public void delete(int board_no);
	public List<Map<String, Object>> searchBoardTitle(PageMaker page);
	public List<Map<String, Object>> searchBoardSubTitle(PageMaker page);
	public List<Map<String, Object>> searchBoardTitleByOption(PageMaker page);
	public List<Map<String, Object>> searchBoardSubTitleByOption(PageMaker page);
}
