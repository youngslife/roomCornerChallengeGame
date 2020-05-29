package com.ssafy.backspring.controller;

import java.util.HashMap;
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

import com.ssafy.backspring.model.dto.Board;
import com.ssafy.backspring.model.service.BoardService;
import com.ssafy.backspring.util.Handler;
import com.ssafy.backspring.util.Page;
import com.ssafy.backspring.util.PageMaker;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@Api(tags={"BoardController : board_location = (Main(1)  RingFit(2) Mafia(3) Other(4))"})
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
    public ResponseEntity<Map<String, Object>> insert(@RequestBody Board board) {
		//이미 있는 이름은 안돼
		service.insert(board);
        return handler.handleSuccess("Board 등록 성공");
    }
	@ApiOperation("Board 정보 수정하는 기능")
    @PutMapping("/Board/update")
    public ResponseEntity<Map<String, Object>> update(@RequestBody Board board) {
		service.update(board);
        return handler.handleSuccess("Board 정보 수정 완료");
    }
	@ApiOperation("특정 Board를 삭제하는 기능")
    @DeleteMapping("/Board/delete/{board_no}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable int board_no) {
		service.delete(board_no);
        return handler.handleSuccess("Board 정보 수정 완료");
    }
	@ApiOperation("게시판 제목으로 조회하는 기능 ex) 게임1-게임소식-1page = 2/게임소식/1")
    @GetMapping("/Board/searchBoardTitle/{location}/{title}/{page_no}")
    public ResponseEntity<Map<String, Object>> searchBoardTitle(Page pageBean, 
    		@PathVariable int location, @PathVariable String title, @PathVariable int page_no) {
//    		@RequestBody Map<String,Object> map){
//		int page_no = Integer.parseInt((String)map.get("page_no"));
//		int location = Integer.parseInt((String)map.get("location"));
//		String title = (String) map.get("title");
		PageMaker pageMaker = new PageMaker();
		pageBean.setPage(page_no);
		pageBean.setPerPageNum(perPageNum);
		pageMaker.setPageBean(pageBean);
		pageMaker.setLocation(location);
		pageMaker.setTitle(title);
		pageMaker.setStartPage(pageBean.getPage());
		pageMaker.setEndPage(pageMaker.getStartPage());
		List<Map<String, Object>> list = service.searchBoardTitle(pageMaker);
		int count = service.countBoardTitle(pageMaker);
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("count",""+count);
		data.put("result", list);
		int lastPage= 0;
		if(count<=perPageNum) lastPage =1;
		else {
			if(count%perPageNum == 0)lastPage=count/perPageNum;
			else lastPage=count/perPageNum+1;
		}
		data.put("lastPage",""+lastPage);
		return list.size() == 0 ? handler.handleSuccess("이 페이지에는 게시글이 존재하지 않습니다") : handler.handleSuccess(data);
    }
	@ApiOperation("게시판 소제목으로 조회하는 기능 ex) 게임1-게임소식-공지사항-1page = 2/게임소식/공지사항/1")
    @GetMapping("/Board/searchBoardSubTitle/{location}/{title}/{subtitle}/{page_no}")
    public ResponseEntity<Map<String, Object>> searchBoardSubTitle(Page pageBean, 
    		@PathVariable int location, @PathVariable String title, @PathVariable String subtitle, @PathVariable int page_no) {
		PageMaker pageMaker = new PageMaker();
		pageBean.setPage(page_no);
		pageBean.setPerPageNum(perPageNum);
		pageMaker.setPageBean(pageBean);
		pageMaker.setLocation(location);
		pageMaker.setTitle(title);
		pageMaker.setSubtitle(subtitle);
		pageMaker.setStartPage(pageBean.getPage());
		pageMaker.setEndPage(pageMaker.getStartPage());
		List<Map<String, Object>> list = service.searchBoardSubTitle(pageMaker);
		int count = service.countBoardSubTitle(pageMaker);
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("count",""+count);
		data.put("result", list);
		int lastPage= 0;
		if(count<=perPageNum) lastPage =1;
		else {
			if(count%perPageNum == 0)lastPage=count/perPageNum;
			else lastPage=count/perPageNum+1;
		}
		data.put("lastPage",""+lastPage);
		return list.size() == 0 ? handler.handleSuccess("이 페이지에는 게시글이 존재하지 않습니다") : handler.handleSuccess(data);
    }
	@ApiOperation("전체 게시판 제목, 작성자, 내용으로 검색하는 기능")
    @GetMapping("/Board/searchBoardTitleByOption/{location}/{title}/{page_no}/{searchOption}/{word}")
    public ResponseEntity<Map<String, Object>> searchBoardTitleByOption(Page pageBean, 
    		@PathVariable int location, @PathVariable String title,
    		@PathVariable int page_no, @PathVariable String searchOption, @PathVariable String word) {
		PageMaker pageMaker = new PageMaker();
		pageBean.setPage(page_no);
		pageBean.setPerPageNum(perPageNum);
		pageMaker.setPageBean(pageBean);
		pageMaker.setLocation(location);
		pageMaker.setTitle(title);
		pageMaker.setStartPage(pageBean.getPage());
		pageMaker.setEndPage(pageMaker.getStartPage());
		pageMaker.setSearchOption(searchOption);
		pageMaker.setWord(word);
		List<Map<String, Object>> list = service.searchBoardTitleByOption(pageMaker);
		int count = service.countBoardTitleByOption(pageMaker);
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("count",""+count);
		data.put("result", list);
		int lastPage= 0;
		if(count<=perPageNum) lastPage =1;
		else {
			if(count%perPageNum == 0)lastPage=count/perPageNum;
			else lastPage=count/perPageNum+1;
		}
		data.put("lastPage",""+lastPage);
		return list.size() == 0 ? handler.handleSuccess("이 페이지에는 게시글이 존재하지 않습니다") : handler.handleSuccess(data);
    }
	@ApiOperation("특정 게시판 제목, 작성자, 내용으로 검색하는 기능")
    @GetMapping("/Board/searchBoardSubTitleByOption/{location}/{title}/{subtitle}/{page_no}/{searchOption}/{word}")
    public ResponseEntity<Map<String, Object>> searchBoardSubTitleByOption(Page pageBean, 
    		@PathVariable int location, @PathVariable String title, 
    		@PathVariable String subtitle, @PathVariable int page_no, 
    		@PathVariable String searchOption, @PathVariable String word) {
		PageMaker pageMaker = new PageMaker();
		pageBean.setPage(page_no);
		pageBean.setPerPageNum(perPageNum);
		pageMaker.setPageBean(pageBean);
		pageMaker.setLocation(location);
		pageMaker.setTitle(title);
		pageMaker.setSubtitle(subtitle);
		pageMaker.setStartPage(pageBean.getPage());
		pageMaker.setEndPage(pageMaker.getStartPage());
		pageMaker.setSearchOption(searchOption);
		pageMaker.setWord(word);
		List<Map<String, Object>> list = service.searchBoardSubTitleByOption(pageMaker);
		int count = service.countBoardSubTitleByOption(pageMaker);
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("count",""+count);
		data.put("result", list);
		int lastPage= 0;
		if(count<=perPageNum) lastPage =1;
		else {
			if(count%perPageNum == 0)lastPage=count/perPageNum;
			else lastPage=count/perPageNum+1;
		}
		data.put("lastPage",""+lastPage);
		return list.size() == 0 ? handler.handleSuccess("이 페이지에는 게시글이 존재하지 않습니다") : handler.handleSuccess(data);
    }
}

