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
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.backspring.model.dto.Board;
import com.ssafy.backspring.model.service.BoardService;
import com.ssafy.backspring.util.Handler;
import com.ssafy.backspring.util.Page;
import com.ssafy.backspring.util.PageMaker;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
public class BoardController {
	private static final int perPageNum = 10;
	@Autowired
	private BoardService service;
	
	private final Handler handler = Handler.getInstance();
	
	@ApiOperation("전체 Board 목록을 조회하는 기능")
    @GetMapping("/Board/searchAll")
    public ResponseEntity<Map<String, Object>> searchAll() {
        final List<Board> list = service.searchAll();
        return handler.handleSuccess(list);
    }
	@ApiOperation("특정 Board를 조회하는 기능")
    @GetMapping("/Board/search/{board_no}")
    public ResponseEntity<Map<String, Object>> search(@PathVariable int board_no) {
        final Board board = service.search(board_no);
        return handler.handleSuccess(board);
    }
	@ApiOperation("Board 정보 등록 하는 기능")
    @PostMapping("/Board/insert")
    public ResponseEntity<Map<String, Object>> insert(Board board) {
		//이미 있는 이름은 안돼
		service.insert(board);
        return handler.handleSuccess("Board 등록 성공");
    }
	@ApiOperation("Board 정보 수정하는 기능")
    @PutMapping("/Board/update")
    public ResponseEntity<Map<String, Object>> update(Board board) {
		service.update(board);
        return handler.handleSuccess("Board 정보 수정 완료");
    }
	@ApiOperation("특정 Board를 삭제하는 기능")
    @DeleteMapping("/Board/delete/{board_no}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable int board_no) {
		service.delete(board_no);
        return handler.handleSuccess("Board 정보 수정 완료");
    }
	@ApiOperation("전체 목록을 조회하는 기능")
    @GetMapping("/Board/searchAllBoard/{page_no}")
    public ResponseEntity<Map<String, Object>> searchAllBoard(Page pageBean, @PathVariable int page_no) {
		PageMaker pageMaker = new PageMaker();
		pageBean.setPage(page_no);
		pageBean.setPerPageNum(perPageNum);
		pageMaker.setPageBean(pageBean);
		pageMaker.setStartPage(pageBean.getPage());
		pageMaker.setEndPage(pageMaker.getStartPage());
		List<Map<String, Object>> list = service.searchAllBoard(pageMaker);
		return list.size() == 0 ? handler.handleSuccess("이 페이지에는 게시글이 존재하지 않습니다") : handler.handleSuccess(list);
    }
	@ApiOperation("특정 게시판 전체 목록을 조회하는 기능")
    @GetMapping("/Board/searchTargetBoard/{target_no}/{page_no}")
    public ResponseEntity<Map<String, Object>> searchTargetBoard(Page pageBean, @PathVariable int target_no, @PathVariable int page_no) {
		PageMaker pageMaker = new PageMaker();
		pageBean.setPage(page_no);
		pageBean.setPerPageNum(perPageNum);
		pageMaker.setPageBean(pageBean);
		pageMaker.setStartPage(pageBean.getPage());
		pageMaker.setEndPage(pageMaker.getStartPage());
		pageMaker.setTarget_no(target_no);
		List<Map<String, Object>> list = service.searchTargetBoard(pageMaker);
		return list.size() == 0 ? handler.handleSuccess("이 페이지에는 게시글이 존재하지 않습니다") : handler.handleSuccess(list);
    }
	@ApiOperation("전체 게시판 제목, 작성자, 내용으로 검색하는 기능")
    @GetMapping("/Board/searchAllBoardByOption/{page_no}/{searchOption}/{word}")
    public ResponseEntity<Map<String, Object>> searchAllBoardByOption(Page pageBean, 
    		@PathVariable int page_no, @PathVariable String searchOption, @PathVariable String word) {
		PageMaker pageMaker = new PageMaker();
		pageBean.setPage(page_no);
		pageBean.setPerPageNum(perPageNum);
		pageMaker.setPageBean(pageBean);
		pageMaker.setStartPage(pageBean.getPage());
		pageMaker.setEndPage(pageMaker.getStartPage());
		pageMaker.setSearchOption(searchOption);
		pageMaker.setWord(word);
		List<Map<String, Object>> list = service.searchAllBoardByOption(pageMaker);
		return list.size() == 0 ? handler.handleSuccess("이 페이지에는 게시글이 존재하지 않습니다") : handler.handleSuccess(list);
    }
	@ApiOperation("특정 게시판 제목, 작성자, 내용으로 검색하는 기능")
    @GetMapping("/Board/searchTargetBoardByOption/{target_no}/{page_no}/{searchOption}/{word}")
    public ResponseEntity<Map<String, Object>> searchTargetBoardByOption(Page pageBean, 
    		@PathVariable int target_no, @PathVariable int page_no, 
    		@PathVariable String searchOption, @PathVariable String word) {
		PageMaker pageMaker = new PageMaker();
		pageBean.setPage(page_no);
		pageBean.setPerPageNum(perPageNum);
		pageMaker.setPageBean(pageBean);
		pageMaker.setStartPage(pageBean.getPage());
		pageMaker.setEndPage(pageMaker.getStartPage());
		pageMaker.setTarget_no(target_no);
		pageMaker.setSearchOption(searchOption);
		pageMaker.setWord(word);
		List<Map<String, Object>> list = service.searchTargetBoardByOption(pageMaker);
		return list.size() == 0 ? handler.handleSuccess("이 페이지에는 게시글이 존재하지 않습니다") : handler.handleSuccess(list);
    }
}

