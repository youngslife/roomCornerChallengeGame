package com.ssafy.backspring.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.backspring.model.dao.UserGameInfoDao;
import com.ssafy.backspring.model.dto.UserGameInfo;

@Service
public class UserGameInfoServiceImpl implements UserGameInfoService {
	
	@Autowired
	private UserGameInfoDao dao;
	
	@Override
	public void insert(int user_no) {
		try {
			dao.insert(user_no);
		}catch(Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public UserGameInfo search(int uginfo_no) {
		try {
			return dao.search(uginfo_no);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<UserGameInfo> searchAll() {
		try {
			return dao.searchAll();
		}catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public void update(UserGameInfo uginfo) {
		try {
			dao.update(uginfo);
		}catch(Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void delete(int uginfo_no) {
		try {
			dao.delete(uginfo_no);
		}catch(Exception e) {
			e.printStackTrace();
		}
	}

}
