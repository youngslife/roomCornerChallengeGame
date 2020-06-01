package com.ssafy.backspring.model.service;

import java.security.MessageDigest;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.backspring.model.dao.UserDao;
import com.ssafy.backspring.model.dto.User;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserDao dao;

	@Override
	public void insert(User user) {
		try {
			dao.insert(user);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public User search(int user_no) {
		try {
			return dao.search(user_no);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public List<User> searchAll() {
		try {
			return dao.searchAll();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@Override
	public void update(User user) {
		try {
			dao.update(user);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void delete(int user_no) {
		try {
			dao.delete(user_no);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public boolean isValidEmail(String email) {
		//통과
//		System.out.println("아이디 부분 테스트");
//		String[] em = new String[] { "testmail001@google.com", "_testmail002@google.com", "3testmail003@google.com",
//				"z_001@google.com", "$$$@google.com", "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa@google.com" };
//		System.out.println("HOST 부분 테스트");
//		String[] host = new String[] { "tgoogle.com", "t@google3.com", "t@google&.com", "t@google.comzrd",
//				"t@google.co.kr", "t@google.comzzzzzz" };
		boolean check_result = false;
		String regex = "^[a-zA-Z_]{1}[a-zA-Z0-9_]{0,15}@[a-zA-Z_]+\\.[a-z.]{2,6}$";
		Pattern p = Pattern.compile(regex); 
		Matcher m = p.matcher(email); 
		check_result = m.matches() ? true: false;
		
		return check_result;
	}

	@Override
	public User searchByEmail(String email) {
		User user = null;
		try {
			user = dao.searchByEmail(email);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return user;
	}


	@Override
	public String sha256Encryption(String password) {
		String converted = "";
		try{
			MessageDigest digest = MessageDigest.getInstance("SHA-256");
			byte[] hash = digest.digest(password.getBytes("UTF-8"));
			StringBuffer hexString = new StringBuffer();

			for (int i = 0; i < hash.length; i++) {
				String hex = Integer.toHexString(0xff & hash[i]);
				if(hex.length() == 1) hexString.append('0');
				hexString.append(hex);
			}
			converted = hexString.toString();
		} catch(Exception ex){
			throw new RuntimeException(ex);
		}
		return converted;
	}
	@Override
	public User searchUserDetail(int user_no) {
		try {
			return dao.searchUserDetail(user_no);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return null;
	}

}
