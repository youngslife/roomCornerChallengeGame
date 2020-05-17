package com.ssafy.backspring.model.service;

import java.util.List;
import java.util.Map;

import com.ssafy.backspring.model.dto.Board;
import com.ssafy.backspring.util.PageMaker;

public interface BoardService {
	public void insert(Board board);
	public Board search(int board_no);
	public List<Board> searchAll();
	public void update(Board board);
	public void delete(int board_no);
	public List<Map<String, Object>> searchAllBoard(PageMaker page);
	public List<Map<String, Object>> searchTargetBoard(PageMaker pageMaker);
}
