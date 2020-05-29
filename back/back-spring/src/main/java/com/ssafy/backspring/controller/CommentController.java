package com.ssafy.backspring.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.backspring.model.dto.Comment;
import com.ssafy.backspring.model.service.CommentService;
import com.ssafy.backspring.util.Handler;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequestMapping("/api")
public class CommentController {

	@Autowired
	private CommentService service;
	
	private final Handler handler = Handler.getInstance();
	
	@ApiOperation("전체 Comment 목록을 조회하는 기능")
    @GetMapping("/Comment/searchAll")
    public ResponseEntity<Map<String, Object>> searchAll() {
        final List<Comment> list = service.searchAll();
        return handler.handleSuccess(list);
    }
	@ApiOperation("특정 Comment를 조회하는 기능")
    @GetMapping("/Comment/search/{cmt_no}")
    public ResponseEntity<Map<String, Object>> search(@PathVariable int cmt_no) {
        final Comment cmt = service.search(cmt_no);
        return handler.handleSuccess(cmt);
    }
	@ApiOperation("Comment 정보 등록 하는 기능")
    @PostMapping("/Comment/insert")
    public ResponseEntity<Map<String, Object>> insert(@RequestBody Comment cmt) {
		//이미 있는 이름은 안돼
		service.insert(cmt);
        return handler.handleSuccess("Comment 등록 성공");
    }
	@ApiOperation("Comment 정보 수정하는 기능")
    @PutMapping("/Comment/update")
    public ResponseEntity<Map<String, Object>> update(@RequestBody Comment cmt) {
		service.update(cmt);
        return handler.handleSuccess("Comment 정보 수정 완료");
    }
	@ApiOperation("특정 Comment를 삭제하는 기능")
    @DeleteMapping("/Comment/delete/{cmt_no}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable int cmt_no) {
		service.delete(cmt_no);
        return handler.handleSuccess("Comment 정보 수정 완료");
    }

}
