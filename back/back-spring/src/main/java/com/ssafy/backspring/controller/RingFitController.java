package com.ssafy.backspring.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.backspring.model.dto.ringfit.RGameInfo;
import com.ssafy.backspring.model.dto.ringfit.RMonster;
import com.ssafy.backspring.model.dto.ringfit.RStage;
import com.ssafy.backspring.model.dto.ringfit.RUserInfo;
import com.ssafy.backspring.model.service.ringfit.RGameInfoService;
import com.ssafy.backspring.model.service.ringfit.RMonsterService;
import com.ssafy.backspring.model.service.ringfit.RStageService;
import com.ssafy.backspring.model.service.ringfit.RUserInfoService;
import com.ssafy.backspring.util.Handler;
import com.ssafy.backspring.util.RInfo;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequestMapping("/api")
public class RingFitController {

     @Autowired
     private RUserInfoService rui_service;
     @Autowired
     private RGameInfoService rgi_service;
     @Autowired
     private RStageService rs_service;
     @Autowired
     private RMonsterService rm_service;
    // @Autowired
    // private RMapService rui_service;
    // @Autowired
    // private RUserInfoService rui_service;

     private final Handler handler = Handler.getInstance();
//     스테이지 리스트 보여줄 때는 유저별로 스테이지 클리어했는지랑 플레이시간, 총점수 이런거 가져다주고
//     모든 스테이지를 가져다줘야하는데 유저의 게임정보들을 뒤져서 스테이지 클리어했는지
     //유저별로 스테이지 클리어한 내용이 있다면 같이 주고 아니면 따로준다.
     //유저가 참가한 기록이 있는가를 판단해야하잖아.
     //가져오고 클리어했는지를 판단해서 같이 맹글어서 줘.
     //근데 또 클리어 안한애도 줘야돼.
     //그러면 이거를 찾아보고 있으면 이걸주는게 아니고 원래거에다가 붙여서 주자.
     @ApiOperation("유저별 스테이지 리스트 보여주는 기능")
     @GetMapping("/Ringfit/stage/searchAll/{user_no}")
     public ResponseEntity<Map<String, Object>> searchAll(@PathVariable int user_no) {
	     Map<String,Object> data = new HashMap<String,Object>();
	     List<RStage> list = rs_service.checkUserinfo(user_no);
	     data.put("record", list);
	     data.put("message", "클리어 전적이 없습니다.");
	     for(int i = 0; i < list.size(); ++i) {
	    	 List<RUserInfo> tempUserInfo = list.get(i).getRstage_usergameinfo();
	    	 for(int j = 0; j < tempUserInfo.size(); ++j) {
	    		 if(tempUserInfo.get(j).isRuserinfo_iscleared()) {
	    			 data.put("message", "클리어 전적이 있습니다."); 
	    			 break;
	    		 }
	    	 }
	     }
	     return handler.handleSuccess(data);
     }
     @ApiOperation("게임을 시작하는 기능")
	 @PostMapping("/Ringfit/stage/gameStart")
     public ResponseEntity<Map<String, Object>> gameStart(
    		 @ApiParam(value = "The User ID", required = true)
    		 @RequestParam(name = "user_no", required = true) int user_no,
    		 @ApiParam(value = "The Stage ID", required = true)
    		 @RequestParam(name = "rstage_no", required = true) int rstage_no,
    		 @ApiParam(value = "The Stage Difficulty", required = true)
    		 @RequestParam(name = "rgameinfo_level", required = true) int rgameinfo_level){
    	 
    	 //1. 유저의 게임 정보를 생성 할 것
    	 //새롭게 유저의 링피트정보를 생성한뒤, 유저가 생성한 마지막 링피트정보를 가져오고, 게임정보를 새로 추가(난이도, 시작시간은 자동)해준다 
    	 // 1) RUserInfo -> 스테이지, 유저체력
    	 RUserInfo newinfo = new RUserInfo();
    	 newinfo.setRstage_no(rstage_no);
    	 newinfo.setUser_no(user_no);
    	 newinfo.setRuserinfo_hp(100*rgameinfo_level);
    	 rui_service.insert(newinfo);

    	 RInfo rinfo = new RInfo();
    	 rinfo.setUser_no(user_no);
    	 rinfo.setRstage_no(rstage_no);
    	 RUserInfo userinfo = rui_service.getLast(rinfo);
    	 rinfo.setRuserinfo_no(userinfo.getRuserinfo_no());
    	 
    	 // 2) RGameInfo -> 시작시간, 난이도 입력
    	 RGameInfo gameinfo = new RGameInfo();
    	 gameinfo.setRuserinfo_no(userinfo.getRuserinfo_no());
    	 gameinfo.setRgameinfo_level(rgameinfo_level);
    	 rgi_service.insert(gameinfo);
    	 
    	 //2. 스테이지 정보 추출할 것
    	 // 1) 해당 스테이지 1개의 정보 + 맵 1개의 정보
    	 // 2) 필요 몬스터 데이터 담아서 줄 것(집합의 형태로 중복 x)
    	 /*
    	  * 몬스터를 튜토리얼은 1개, 스테이지별로 3개를 줄 수 있는 상황이 되었으니
    	  * 배열로 순서대로 주려던 것은 제거하고, 몬스터 info를 담아서 줄것
    	  * 스테이지는 맵정보, 몬스터리스트를 가지고 있고 프론트에서 1개씩 꺼내도록 하자.
    	  * 배경음악 등은 front asset에 담아놓자.
    	  * 게임이 종료되고 업데이트를 하려면 ruserinfo_no가 있어야해. 이거를 포함해서 주고 게임이 진행되고 난뒤, 받아와서 업데이트를 하는거야.
    	  */
    	 
    	 RStage stageInfo = rs_service.searchInfo(rinfo); //- resultMap 
    	 stageInfo.setRstage_monster(rm_service.searchList(rstage_no)); //1 tutorial 2-4 stage1 5-7 stage2  해당 몬스터 정보 담아서 줄것
    	 
    	 Map<String, Object> data = new HashMap<String,Object>();
    	 data.put("stageInfo", stageInfo);
    	 data.put("message", "유저게임 정보 생성 및 스테이지 "+rstage_no+" 관련 정보 반환. 게임 시작");
    	 return handler.handleSuccess(data);
     }
     @ApiOperation("테스트기능")
	 @PostMapping("/Ringfit/stage/play")
     public ResponseEntity<Map<String, Object>> play(
    		 @ApiParam(value = "The User ID", required = true)
    		 @RequestParam(name = "user_no", required = true) int user_no,
    		 @ApiParam(value = "The Stage ID", required = true)
    		 @RequestParam(name = "rstage_no", required = true) int rstage_no,
    		 @ApiParam(value = "The Stage Difficulty", required = true)
    		 @RequestParam(name = "rgameinfo_level", required = true) int rgameinfo_level){
    	 
//    	 List<RMonster> list = rm_service.searchList(rstage_no); //1 tutorial 2-4 stage1 5-7 stage2  해당 몬스터 정보 담아서 줄것
    	 RInfo rinfo = new RInfo();
    	 rinfo.setUser_no(user_no);
    	 rinfo.setRstage_no(rstage_no);
    	 RUserInfo userinfo = rui_service.getLast(rinfo);
    	 rinfo.setRuserinfo_no(userinfo.getRuserinfo_no());
    	 
    	 RStage stageInfo = rs_service.searchInfo(rinfo);
    	 Map<String, Object> data = new HashMap<String,Object>();
    	 data.put("rInfo", rinfo);
    	 data.put("stageInfo", stageInfo);
    	 data.put("message", "유저게임 정보 생성 및 스테이지 "+rstage_no+" 관련 정보 반환");
    	 return handler.handleSuccess(data);
     }
     
    // 난이도, 스테이지, 유저정보 받고 유저관련 정보 추가(유저번호,난이도,스테이지,클리어여부,시작시간)하고
    // 몬스터, 맵, 이미지 등 보내주기 이게 쉽지않네. 맵이 뭐뭐가 필요할지는 모르겠는데 용도가 다르자나. 캐릭터, 배경, 움직이는 것 //잡몹 2 중간1 잡몹 1 최종 1 끝 // 난이도에 따라서 애들 체력 레벨 증가
     //맵도 다 프론트에 저장해두고 알아서 맞춰 꺼내도록 하자. 여기서 뭐 해주려니까 서로 불편하네
    // @ApiOperation("게임을 멈추고 결과를 반환하는 기능")
    // 게임 클리어 관련정보 받고, 유저관련 정보 추가(도전 번호,
    // 게임 클리어 관련정보(플레이타임, perfect,great,good,miss개수,소모한 칼로리, 총점수), 종료시간)

    // 애초에 이미지별로 용도도 넣어줘야겠다.

    // 몬스터 클래스, 파일 클래스, 맵 클래스 만들고, 스테이지 클래스? 스테이지에서 몬스터 리스트(+몬스터이미지리스트), 맵(+맵
    // 이미지리스트)를 가져오는거지
    // 몬스터

}

/*
//
 //유저가 클리어한 내용이 있으면 stage별로 userinfo를 체크할 수 있음
 //게임한 적이 없으면  이런식으로 오니까 확인하면 되겠군
// "rstage_usergameinfo": [
// {
//     "ruserinfo_no": 0,
//     "rstage_no": 3,
//     "user_no": 0,
//     "ruserinfo_hp": 0,
//     "ruserinfo_iscleared": false,
//     "ruserinfo_iswon": false,
//     "ruserinfo_golds": 0,
//     "rsuerinfo_del_check": false,
//     "ruserinfo_gameinfo": null
//   }
// ]
 //플레이한적 있으면 이렇게오고
// "rstage_usergameinfo": [
//     {
//       "ruserinfo_no": 1,
//       "rstage_no": 1,
//       "user_no": 24,
//       "ruserinfo_hp": 0,
//       "ruserinfo_iscleared": true,
//       "ruserinfo_iswon": false,
//       "ruserinfo_golds": 0,
//       "rsuerinfo_del_check": false,
//       "ruserinfo_gameinfo": {
//         "rgameinfo_no": 0,
//         "ruserinfo_no": 1,
//         "rgameinfo_startdate": "2020-06-01 11:27:23",
//         "rgameinfo_playtime": "00:07:56",
//         "rgameinfo_enddate": "2020-06-01 11:35:19",
//         "rgameinfo_level": 1,
//         "rgameinfo_perfect_num": 8,
//         "rgameinfo_great_num": 6,
//         "rgameinfo_good_num": 4,
//         "rgameinfo_miss_num": 2,
//         "rgameinfo_rank": "A",
//         "rgameinfo_kcal": 203,
//         "rgameinfo_score": 89,
//         "rgameinfo_del_check": false
//       }
//     }
*/