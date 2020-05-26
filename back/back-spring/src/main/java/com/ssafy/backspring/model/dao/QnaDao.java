package com.ssafy.backspring.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.backspring.model.dto.Qna;

@Mapper
public interface QnaDao {
	public Qna search(int qna_no);
	public List<Qna> searchAll();
	public void insert(Qna Qna);
	public void update(Qna Qna);
	public void delete(int qna_no);
	public List<Qna> searchUserQna(int user_no); //유저가 자기가 쓴 qna 목록 확인
	public void insertAnswer(Qna Qna); //관리자가 유저한테 달아줌
}
