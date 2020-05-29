package com.ssafy.backspring.controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequestMapping("/api")
public class RingFitController{

//	@Autowired
//	private RUserInfoService rui_service;
//	@Autowired
//	private RGameInfoService rui_service;
//	@Autowired
//	private RStageService rui_service;
//	@Autowired
//	private RMapService rui_service;
//	@Autowired
//	private RMonsterService rui_service;
//	@Autowired
//	private RUserInfoService rui_service;
	
//    private final Handler handler = Handler.getInstance();
//    @ApiOperation("유저별 스테이지 리스트 보여주는 기능")
    //스테이지 리스트 보여줄 때는 유저별로 스테이지 클리어했는지랑 플레이시간, 총점수 이런거 가져다주고
    //모든 스테이지를 가져다줘야하는데 유저의 게임정보들을 뒤져서 스테이지 클리어했는지 
//    @GetMapping("/Ringfit/stage/searchAll")
//    public ResponseEntity<Map<String, Object>> searchAll() {
//        final List<Post> list = service.searchAll();
//        return handler.handleSuccess(list);
//    }
    // @ApiOperation("게임을 시작하는 기능")
    //난이도, 스테이지, 유저정보 받고 유저관련 정보 추가(유저번호,난이도,스테이지,도전횟수,클리어여부,시작시간)하고
    //      몬스터, 맵, 이미지 등 보내주기 이게 쉽지않네. 맵이 뭐뭐가 필요할지는 모르겠는데 용도가 다르자나. 캐릭터, 배경, 움직이는 것
    // @ApiOperation("게임을 멈추고 결과를 반환하는 기능")
    //게임 클리어 관련정보 받고, 유저관련 정보 추가(도전 번호, 
    //                             게임 클리어 관련정보(플레이타임, perfect,great,good,miss개수,소모한 칼로리, 총점수), 종료시간)
    
    //애초에 이미지별로 용도도 넣어줘야겠다.

    //몬스터 클래스, 파일 클래스, 맵 클래스 만들고, 스테이지 클래스? 스테이지에서 몬스터 리스트(+몬스터이미지리스트), 맵(+맵 이미지리스트)를 가져오는거지
    //몬스터
    
    
    
}