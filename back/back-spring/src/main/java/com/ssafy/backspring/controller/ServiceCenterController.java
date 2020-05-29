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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.backspring.model.dto.Faq;
import com.ssafy.backspring.model.dto.Qna;
import com.ssafy.backspring.model.service.FaqService;
import com.ssafy.backspring.model.service.QnaService;
import com.ssafy.backspring.util.Handler;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequestMapping("/api")
public class ServiceCenterController {

    @Autowired
    private FaqService f_service;
    @Autowired
    private QnaService q_service;

    private final Handler handler = Handler.getInstance();

    /********************************************************/
    // FAQ
    @ApiOperation("전체 Faq 목록을 조회하는 기능")
    @GetMapping("/serviceCenter/faq/searchAll")
    public ResponseEntity<Map<String, Object>> fsearchAll() {
        final List<Faq> list = f_service.searchAll();
        return handler.handleSuccess(list);
    }

    @ApiOperation("특정 Faq를 조회하는 기능")
    @GetMapping("/serviceCenter/faq/search/{faq_no}")
    public ResponseEntity<Map<String, Object>> fsearch(@PathVariable int faq_no) {
        final Faq faq = f_service.search(faq_no);
        return handler.handleSuccess(faq);
    }

    @ApiOperation("Faq 정보 등록 하는 기능")
    @PostMapping("/serviceCenter/faq/insert")
    public ResponseEntity<Map<String, Object>> finsert(@RequestBody Faq faq) {
        f_service.insert(faq);
        return handler.handleSuccess("Faq 등록 성공");
    }

    @ApiOperation("Faq 정보 수정하는 기능")
    @PutMapping("/serviceCenter/faq/update")
    public ResponseEntity<Map<String, Object>> fupdate(@RequestBody Faq faq) {
        f_service.update(faq);
        return handler.handleSuccess("Faq 정보 수정 완료");
    }

    @ApiOperation("특정 Faq를 삭제하는 기능")
    @DeleteMapping("/serviceCenter/faq/delete/{faq_no}")
    public ResponseEntity<Map<String, Object>> fdelete(@PathVariable int faq_no) {
        f_service.delete(faq_no);
        return handler.handleSuccess("Faq 정보 수정 완료");
    }

    @ApiOperation("특정 Faq를 조회하는 기능")
    @GetMapping("/serviceCenter/faq/fsearchFaqCategory/{faq_category}")
    public ResponseEntity<Map<String, Object>> fsearchFaqCategory(String faq_category) {
        final List<Faq> list = f_service.searchFaqCategory(faq_category);
        return handler.handleSuccess(list);
    }

    /********************************************************/
    // Qna
    @ApiOperation("전체 Qna 목록을 조회하는 기능")
    @GetMapping("/serviceCenter/qna/searchAll")
    public ResponseEntity<Map<String, Object>> qsearchAll() {
        final List<Qna> list = q_service.searchAll();
        return handler.handleSuccess(list);
    }

    @ApiOperation("특정 Qna를 조회하는 기능")
    @GetMapping("/serviceCenter/qna/search/{qna_no}")
    public ResponseEntity<Map<String, Object>> qsearch(@PathVariable int qna_no) {
        final Qna qna = q_service.search(qna_no);
        return handler.handleSuccess(qna);
    }

    @ApiOperation("Qna 정보 등록 하는 기능")
    @PostMapping("/serviceCenter/qna/insert")
    public ResponseEntity<Map<String, Object>> qinsert(@RequestBody Qna qna) {
        q_service.insert(qna);
        return handler.handleSuccess("Qna 등록 성공");
    }

    @ApiOperation("Qna 정보 수정하는 기능")
    @PutMapping("/serviceCenter/qna/update")
    public ResponseEntity<Map<String, Object>> qupdate(@RequestBody Qna qna) {
        q_service.update(qna);
        return handler.handleSuccess("Qna 정보 수정 완료");
    }

    @ApiOperation("특정 Qna를 삭제하는 기능")
    @DeleteMapping("/serviceCenter/qna/delete/{qna_no}")
    public ResponseEntity<Map<String, Object>> qdelete(@PathVariable int qna_no) {
        q_service.delete(qna_no);
        return handler.handleSuccess("Qna 정보 수정 완료");
    }

    @ApiOperation("유저별 Qna 목록을 조회하는 기능")
    @GetMapping("/serviceCenter/qna/searchUserQna/{user_no}")
    public ResponseEntity<Map<String, Object>> qsearchUserQna(@PathVariable int user_no) {
        final List<Qna> qna = q_service.searchUserQna(user_no);
        return handler.handleSuccess(qna);
    }

    @ApiOperation("Qna 답변 달아주는 기능")
    @PutMapping("/serviceCenter/qna/insertAnswer")
    public ResponseEntity<Map<String, Object>> qinsertAnswer(@RequestBody Qna qna) {
        q_service.insertAnswer(qna);
        return handler.handleSuccess("Qna 정보 수정 완료");
    }
}
