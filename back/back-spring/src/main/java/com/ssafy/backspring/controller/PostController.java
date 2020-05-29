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

import com.ssafy.backspring.model.dto.Post;
import com.ssafy.backspring.model.service.PostService;
import com.ssafy.backspring.util.Handler;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequestMapping("/api")
public class PostController {

	@Autowired
	private PostService service;
	
	private final Handler handler = Handler.getInstance();
	
	@ApiOperation("전체 Post 목록을 조회하는 기능")
    @GetMapping("/Post/searchAll")
    public ResponseEntity<Map<String, Object>> searchAll() {
        final List<Post> list = service.searchAll();
        return handler.handleSuccess(list);
    }
	@ApiOperation("특정 Post를 조회하는 기능")
    @GetMapping("/Post/search/{post_no}")
    public ResponseEntity<Map<String, Object>> search(@PathVariable int post_no) {
        final Post post = service.search(post_no);
        return handler.handleSuccess(post);
    }
	@ApiOperation("Post 정보 등록 하는 기능")
    @PostMapping("/Post/insert")
    public ResponseEntity<Map<String, Object>> insert(@RequestBody Post post) {
		//이미 있는 이름은 안돼
		service.insert(post);
        return handler.handleSuccess("Post 등록 성공");
    }
	@ApiOperation("Post 정보 수정하는 기능")
    @PutMapping("/Post/update")
    public ResponseEntity<Map<String, Object>> update(@RequestBody Post post) {
		service.update(post);
        return handler.handleSuccess("Post 정보 수정 완료");
    }
	@ApiOperation("특정 Post를 삭제하는 기능")
    @DeleteMapping("/Post/delete//{post_no}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable int post_no) {
		service.delete(post_no);
        return handler.handleSuccess("Post 정보 수정 완료");
    }
    @ApiOperation("특정 Post를 조회하는 기능")
    @GetMapping("/Post/searchDetail/{post_no}")
    public ResponseEntity<Map<String, Object>> searchPostDetail(@PathVariable int post_no) {
        final Post post = service.searchPostDetail(post_no);
        //조회수 증가
        service.addPostViews(post.getPost_no());
        return handler.handleSuccess(post);
    }
    
//    @ApiOperation("특정 Post를 추천하는 기능")
//    @PutMapping("/Post/add/{post_no}")
//    public ResponseEntity<Map<String, Object>> addPostRecommendation(@PathVariable int post_no) {
//        service.addPostRecommendation(post_no);
//        return handler.handleSuccess("Post 추천 완료");
//    }

}
