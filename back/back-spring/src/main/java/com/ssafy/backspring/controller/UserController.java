package com.ssafy.backspring.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.backspring.model.dto.User;
import com.ssafy.backspring.model.service.UserGameInfoService;
import com.ssafy.backspring.model.service.UserService;
import com.ssafy.backspring.util.Handler;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
public class UserController {

	@Autowired
	private UserService service;
	@Autowired
	private UserGameInfoService ugi_service;
	
	private final Handler handler = Handler.getInstance();
	
	@ApiOperation("전체 User 목록을 조회하는 기능")
    @GetMapping("/User/searchAll")
    public ResponseEntity<Map<String, Object>> searchAll() {
        final List<User> list = service.searchAll();
        return handler.handleSuccess(list);
    }
	@ApiOperation("특정 User를 조회하는 기능")
    @GetMapping("/User/search/{user_no}")
    public ResponseEntity<Map<String, Object>> search(@PathVariable int user_no) {
        final User user = service.search(user_no);
        return handler.handleSuccess(user);
    }
	@ApiOperation("User 정보 등록 하는 기능")
    @PostMapping("/User/insert")
    public ResponseEntity<Map<String, Object>> insert(User user) {
        //일단 검증이나 실패는 빼두고
        //email 검증
		String uemail = user.getUser_email();
        if(!service.isValidEmail(uemail)){
        	return handler.handleFail("올바르지 않은 형식의 아이디 입니다", HttpStatus.BAD_REQUEST);
        }
        
        if(service.searchByEmail(uemail) != null) {
        	return handler.handleFail("이미 존재하는 아이디 입니다", HttpStatus.BAD_REQUEST);
        }
        //pw 암호화
        user.setUesr_password(service.sha256Encryption(user.getUesr_password()));
        if(user.getUesr_password()=="") {
        	return handler.handleFail("패스워드 에러", HttpStatus.FORBIDDEN);
        }
		service.insert(user);
		ugi_service.insert(user.getUser_no());
        return handler.handleSuccess("User 등록 성공");
    }
	@ApiOperation("User 정보 수정하는 기능")
    @PutMapping("/User/update")
    public ResponseEntity<Map<String, Object>> update(User user) {
		service.update(user);
        return handler.handleSuccess("User 정보 수정 완료");
    }
	@ApiOperation("특정 User를 삭제하는 기능")
    @DeleteMapping("/User/delete")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable int user_no) {
		service.delete(user_no);
        return handler.handleSuccess("User 정보 수정 완료");
    }
	@ApiOperation("로그인하기")
    @PostMapping("/User/login") 
    public ResponseEntity<Map<String, Object>> loginMembers(@RequestBody User user) {
        String email = user.getUser_email();
        String pw = user.getUesr_password();
        User checkUser = service.searchByEmail(email);
        if (checkUser != null) {
             String check_password_inDB = checkUser.getUesr_password();
             String check_password_inUsers = service.sha256Encryption(pw);
             if (check_password_inDB.equals(check_password_inUsers)) {
            	 return handler.handleSuccess("로그인 성공");
             }else {
            	 return handler.handleFail("비밀번호가 틀렸습니다.", HttpStatus.BAD_REQUEST);
             }
        } else {
            return handler.handleFail("존재하지 않는 회원입니다.", HttpStatus.NOT_FOUND);
        }
    }


}
