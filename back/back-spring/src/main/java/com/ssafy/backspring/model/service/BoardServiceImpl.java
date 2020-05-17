package com.ssafy.backspring.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.backspring.model.dao.BoardDao;
import com.ssafy.backspring.model.dto.Board;
import com.ssafy.backspring.util.PageMaker;

@Service
public class BoardServiceImpl implements BoardService {

	@Autowired
	private BoardDao dao;

	@Override
	public void insert(Board board) {
		try {
			dao.insert(board);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public Board search(int board_no) {
		try {
			return dao.search(board_no);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<Board> searchAll() {
		try {
			return dao.searchAll();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public void update(Board board) {
		try {
			dao.update(board);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void delete(int board_no) {
		try {
			dao.delete(board_no);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	@Override
	public List<Map<String, Object>> searchAllBoard(PageMaker page){
		try {
			return dao.searchAllBoard(page);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	@Override
	public List<Map<String, Object>> searchTargetBoard(PageMaker page){
		try {
			return dao.searchTargetBoard(page);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
}
