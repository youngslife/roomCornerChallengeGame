# location 1 : 홈
# location 2 : 링피트
# location 3 : 마피아
# 게시판별로 2개씩 넣자.
INSERT INTO BOARD (board_location, board_title,board_subtitle)
VALUES
(2,'게임소식','공지사항'), 	#1 -3
(2,'게임소식','업데이트'), 	#2 -3
(2,'게임소식','이벤트'), 	#3 -3
(2,'가이드','게임가이드'), 	#4 -3
(2,'가이드','운동가이드'), 	#5 -3
(2,'커뮤니티','자유'),		#6 -5
(2,'커뮤니티','정보'),		#7 -
(2,'커뮤니티','토론');		#8
SELECT * FROM Board;
SELECT * FROM User;
SELECt * FROM POST;
# 공지사항
INSERT INTO POST(board_no,user_no,post_type,post_title,post_content)
VALUES
(1,4,'공지','5/15(금) 버그악용/불법프로그램 신고 보상 지급 안내',
'안녕하세요.<br>
GM학구 입니다.<br><br>
버그악용/불법프로그램 신고 결과 및 보상 대상을 안내드립니다.<br>
신고된 내용 중 유효한 버그와 불법프로그램은 모두 수정되었으며, 악용 대상은 운영정책에 따라 조치되었습니다.<br>
적극적으로 쾌적한 메이플스토리를 만들어주신 용사님들께 진심 어린 감사 인사드립니다.<br><br>
■ 보상 대상 및 신고 결과 안내<br>
<메이플 포인트><br>
<게임 아이템> <br>
- 게임 아이템은 버그 또는 불법프로그램의 영향성에 따라 3종류 중 1개가 차등 지급됩니다. <br>
- 지난 2주동안 아이템을 지급할만한 영향성의 신고가 제보되지 않았기에 메이플포인트만 발표되었습니다. <br>
<보상 안내><br>
※  보상은 심각성에 따라 차등 지급되며, 같은 문제가 신고된 경우 최초 신고 건에 보상이 지급됩니다.<br>
※  메이플포인트는 신고 당시 메이플ID로 5/15(금)에 즉시 지급되었습니다.<br>
※  게임 아이템은 제보 당시 설정된 대표 캐릭터의 택배 보관함으로 지급되었습니다.<br>
※  게임 아이템의 택배 보관 기간 및 유효기간은 2020년 6월 14일(일) 오후 11시 59분까지로 꼭 기간 내에 수령해서 사용해주세요.<br><br>
■ 유의사항<br>
- 심각한 버그나 불법프로그램을 발견하시면 꼭 버그악용/불법프로그램 신고로 제보해주세요. [바로가기] <br>
- 제보되었더라도 악용 및 이득을 취하는 경우 보상에서 제외되거나 운영정책에 따라 게임 이용이 제한될 수 있습니다.<br>
버그악용/불법프로그램을 제보해 주신 많은 용사님들께 다시 한 번 감사드립니다.<br>
앞으로도 쾌적한 메이플 월드를 위해 더욱 노력하겠습니다.<br>
고맙습니다.<br>
From. GM학구');
INSERT INTO POST(board_no,user_no,post_type,post_title,post_content)
VALUES
(1,4,'공지','Windows Defender 백신 업데이트 안내',
'안녕하세요, 넥슨 고객 여러분<br>
5월 14일 오후 5시경부터 백신 프로그램 Windows Defender와 Microsoft Security Essentials 에 의해 게임 실행이 차단되는 현상이 확인되었습니다. <br>
이는 백신 업데이트를 진행하지 않은 경우 발생하며, Trojan:Win32/Rozena.V!MTB 항목으로 차단 팝업이 발생하거나 백신에 의해 게임 실행이 차단 됩니다. <br>
원활한 서비스 이용을 위하여 사용중인 백신을 최신 버전으로 업데이트 해주시기 바랍니다. <br><br>
■ 문제 현상<br>
  - 백신 프로그램 Windows Defender와 Microsoft Security Essentials에 의해 게임 실행이 원활하지 않거나, Trojan:Win32/Rozena.V!MTB 항목으로 차단 팝업이 발생합니다. <br><br>
■ 문제 해결 방법<br>
  - 이용하고 계시는 백신 프로그램 Windows Defender와 Microsoft Security Essentials을 최신 버전으로 업데이트 해주시기 바랍니다. <br><br>
•  Windows 7, Vista: 시작>프로그램> Microsoft Security Essentials >업데이트<br>
•  Windows 8, 8.1, 10: 시작>설정>Windows 업데이트 또는 Windows 보안<br>
•  Windows Defender의 경우 윈도우 업데이트를 통해서도 업데이트가 가능합니다.<br>
안내드리는 내용 참고하셔서 이용에 불편 없으시길 바랍니다.<br>
감사합니다.');
INSERT INTO POST(board_no,user_no,post_type,post_title,post_content)
VALUES
(1,5,'패치','[패치완료] 5/21(목) ver1.2.334 클라이언트 패치(3:00~10:00)',
'안녕하세요. 용사님!<br>
단풍마을의 평온함을 위해 힘쓰고 있는 GM 소리입니다.<br>
메이플스토리의 클라이언트 패치가 예정되어 안내드립니다.<br><br>
[작업 일시]<br>
2020년 5월 21일(목) 오전 3시 ~ 10시 (7시간)<br><br>
[전체 월드 작업 내역]<br>
1) ver 1.2.334 패치<br>
예정된 시간에 점검을 완료할 수 있도록 최선을 다하겠습니다.<br>
다만, 상황에 따라 완료 시각이 변동될 수 있는 점 미리 양해 부탁드립니다.<br>
원활하고 즐거운 메이플스토리를 만들기 위해 더욱 노력하겠습니다.<br>
고맙습니다.<br> GM소리 올림');

# 업데이트
INSERT INTO POST(board_no,user_no,post_title,post_content)
VALUES
(2,5,'클라이언트 1.2.333 업데이트 안내','안녕하세요. 용사님!<br>
단풍마을의 평온함을 위해 힘쓰고 있는 GM소리입니다.<br>
4월 23일(목) 메이플스토리 클라이언트 Ver.1.2.333에 업데이트 되는 내용은 아래와 같습니다.<br>
업데이트 안내 내용을 꼭 확인하시고, 메이플스토리와 함께 즐거운 시간 보내 주세요.'),
(2,5,'클라이언트 1.2.334 업데이트 안내','안녕하세요. 용사님!<br>
단풍마을의 평온함을위해 힘쓰고 있는 GM소리입니다.<br>
5월 21일(목) 메이플스토리클라이언트 Ver.1.2.334에 업데이트 되는 내용은 아래와 같습니다.<br>
업데이트 안내 내용을꼭 확인하시고, 메이플스토리와 함께 즐거운 시간 보내 주세요.'),
(2,5,'클라이언트 1.2.334(2) 업데이트 안내','안녕하세요. 용사님! <br>
단풍마을의 평온함을 위해 힘쓰고 있는 GM소리입니다. <br>
5월 22일(금) 메이플스토리 클라이언트 Ver.1.2.334(2)에 업데이트 되는 내용은아래와 같습니다. <br>
업데이트 안내 내용을 꼭 확인하시고, 메이플스토리와 함께 즐거운 시간 보내주세요');

# 이벤트
INSERT INTO POST(board_no,user_no,post_title,post_content)
VALUES
(3,3,'호텔 메이플: VIP 멤버십',' VIP PREMIUM 등급 달성으로 획득한 "선택 아케인심볼 100개 교환권"에서 교환권을 사용해 획득한 아이템은 유효기간 7일, 교환불가입니다. (2020-5-13(수) 오후 3시 46분 내용 추가)<br> 5/21(목) 업데이트로 반영된 내용이 추가되었습니다.<br>* 호텔 메이플 VIP 멤버 훈장'),
(3,3,'몬스터 피라미드','2020년 05월 21일 10시 00분 ~ 2020년 06월 10일 23시 59분'),
(3,3,'VIP 헌터클럽: 스페셜 테라피','이벤트는 보통 이미지로 다하네 그리고 기간정보도 필요할듯 우린 이벤트가 사실 없긴하지만')
;
 

# 게임가이드 	#4 - 게임가이드는 세부분류가 될수있어서 이를 post_type에 넣으면 편할듯
INSERT INTO POST(board_no,user_no,post_type,post_title,post_content)
VALUES
(4,2,'신규 용사님을 위한 정보','이것만은 알고하자!','무슨 가이드를 봐야 할지 모르겠다면 질문에 답변해보세요!<br>
용사님에게 필요한 가이드를 알려 드립니다.<br>메이플스토리가 처음이신가요?<br>
캐릭터 생성부터 필드사냥까지 초보 용사님을 위한 맞춤 정보를 알려 드립니다!<br>
맞춤형 가이드외에 GM이 추천하는 꿀팁들도 읽어보세요!<br>
분명 용사님에게 도움이 될 거예요!<br>
오랜만에 메이플스토리를 접속했는데, 무엇을 해야할지 모르겠다면?<br>
용사님을 위한 다양한 컨텐츠를 소개해드려요!<br>
궁금하신 정보를 클릭해보세요.'),
(4,2,'신규 용사님을 위한 정보','게임 시작하기',
'회원가입<br>
1. 회원가입<br>
아직 메이플스토리 회원이 아니신가요?<br>
[회원 가입]을 통해 메이플스토리 계정을 생성하고 게임을 즐겨보세요!<br>
Tip<br>
메이플스토리를 이용할 수 있는 ID는 모두 5종류입니다. 로그인 전 용사님의 ID 종류를 확인해주세요'),
(4,2,'스킬 정보','아케인포스','아케인 심볼<br>
아케인 심볼은 아케인리버의 각 지역에서 획득할 수 있는 장비아이템이며 캐릭터 직업에 맞는 주요 스탯과 아케인 포스를 지니고 있습니다.');

# 운동가이드 	#5
INSERT INTO POST(board_no,user_no,post_title,post_content)
VALUES
(5,6,'약초밭의 그림자 귀신','레벨 135이상<br>백초마을에는 최근 약초밭에 그림자 귀신이 나타난다는 이상한 소문이 돌고 있어, 아무도 약초를 캐러 가지 않는다고 한다.<br> 구영감은 그림자 귀신의 정체를 알고자, 찢어진 두루마리 조각을 가져와 달라고 한다.<br> 약초밭에서 삼단지나 단지로부터 찢어진 두루마리 조각 50개를 모아 구영감에게 가져다 주자.'),
(5,6,'로빈슨의 ID카드','레벨 75이상<br>바다 한가운에 있는 무인도에서 만난 로빈슨은 자신은 원래 지구방위본부에 소속된 조종사였는데 외계인과의 전투중에 바다로 도망치다가 풍랑을 만나 무인도로 떠내려왔다고 밝혔다.<br> 지구방위본부로 돌아가야 하는데 현재 지금 이섬이 어디쯤에 있는건지도 모르겠고 상처투성이라서 돌아갈 수 없다면서 구조를 요청했다.<br>(아쿠아리움에 있는 켄타에게 로빈슨의 ID카드를 전하고 구조를 요청하자)'),
(5,6,'허스키를 위한 영양간식','레벨 75이상<br>눈 덮인 고래섬에서 허스키들과 같이 살고 있는 나누크을 만났다.<br>나누크로부터 허스키들들을 위해 씨클로 부터 구할 수 있는 영양만점인 해마의 꼬리 50개를 구해달라는 부탁을 받았다.<br>해마의 꼬리 0 / 50');

# 자유		#6
INSERT INTO POST(board_no,user_no,post_title,post_content)
VALUES
(6,6,'히든스트리트 어디임?','히든스트리트 스피넬의 숲이 어디임? 10년만에들어왔는데 여기어딘지아시는분'),
(6,6,'와 무슨 이런 인간 ㅆㄺ 들이 다 있네요 스카니아 사람들 조심','1004 길드*<br>
스틸하면서 패드립하고 성드립하면서 제 주변사람들 다 초메해서 피해자 코스프레하고 있네;<br>
뭔 이런 정신병환자들이 다 있지 ㅋㅋ<br>
1004길드 자유길드라는데 그 자유가 스틸을 자유롭게 하는 길드임<br>'),
(6,6,'메이플스토리 데일리기프트"의문의메소주머니" 최대얼마??','이거다들 보셨을겁니다.<br>
항상궁금한게 최대는얼마인지 모르겠더라고요??<br>
인터넷검색을 해봤더니 2015~2017년도 정보밖에없고 최근2019~2020년도는 없더라고요?<br>
10만메소부터 300 500 1300 1500이런말도있고,<br>
얼마까지 나와보셨음??'),
(6,6,'스틸범 초등학생아델','스틸범인데 보면 지나가면서 인기도 한번 씩 내려주세용'),
(6,6,'ㅈ망겜','우르스 입장하고 팅기네;;<br>ㅈ망겜수준'),
(6,6,'친구 30일 정지 먹였다. 어떡하냐','친구랑 나랑 솔랭 듀오하는데 친구가 서폿 정복자볼베로 던져서 문의했는데 문의홈페이지에서는 나한테 처벌불가라고했거든?<br>근데 걔 30일정지 먹었다. 어떡하냐?<br>걍 모른척해야돼나?');
# 정보		#7
INSERT INTO POST(board_no,user_no,post_title,post_content)
VALUES
(7,6,'빠르게 팔아봅니다','"발랄리본" 47기 로얄 스라벨 머리장식 팝니다<br>
지금 매물이없어서 다 85억 위로 올라왓던데 시세보니까 70억대여서<br>
싸게 68억에 올려놓음 빨리 사가주세요<br>
메이플 인벤에는 구라핑 개많아서 여기다 올립니다'),
(7,6,'스티그마 코인 관련 질문요','그 주간퀘해서 얻는거 말고 스티그마 코인 교환할때 비슷한거 한개가 더 필요하다고 하는데 그건 어떻게 얻어요?'),
(7,6,'토드 옵션 질문','6% 3% 3% <br>이거랑<br>6% 3% 공10<br>둘 중에 어느게 더 가성비가 좋나요?<br>'),
(7,6,'제로 무기좀 봐주세요','더 돌리는게 낳을까요? 그냥 써도 될까요?<br>잘안나오더라구요 중요합니다!!!!ㅠㅠ'),
(7,6,'사기범입니다','이사람이<br>재 앱솔장갑 77급 30퍼 7작 먹튀 했습니다');
# 토론
INSERT INTO POST(board_no,user_no,post_title,post_content)
VALUES
(8,6,'소외계층 네이버계정을 도와주세요','요지는,<br>네이버 아이디를 넥슨 계정으로 전환 혹은 통합할 수 있게 해주시길 간곡히 요청드리는 바입니다.<br>금일 패치로 인해 네이버 아이디의 소외된 면모를 다시 한번 톡톡히 느끼게 되었습니다.<br>메이플스토리m 유니온 적용 및 마일리지 쌓기 불가, 넥슨otp 및 u-otp 적용 불가(네이버 자체 otp만 가능), 불편한 캐시 충전 등의<br> 여러 단점들을 감수하고 묵묵히 이용하였으나, 금일 패치로 현재 레드pc 적용이 되어 정상적인 게임이용이 불가능한 상태입니다.<br> 넥슨otp 이외에 본인인증으로 레드pc를 해제할 수 있다고 안내받았으나, 현재<br> '),
(8,6,'헤어쿠폰, 성형쿠폰 확정 저격 시스템','헤어쿠폰과 성형쿠폰을 사용하다 보면 운이 좋게 한번에 원하는 헤어나 성형이 나오는 경우도 있지만,<br>원하는 헤어를 노리기 위해 몇 십 번씩 도전을 해도 결국 원하는 헤어를 얻지 못하는 경우도 있습니다.<br>헤어쿠폰이나 성형쿠폰을 사용하면 헤어쿠폰 조각, 성형쿠폰 조각을 추가로 지급하고,<br>그 조각을 일정 수량(10~20개) 모으면 리부트에 있는 헤어, 성형쿠폰처럼 <br>선택형 헤어 쿠폰을 하나 지급하면 좋겠습니다.'),
(8,6,'길드개편 부탁드립니다.','12월에 길드 만렙이 30으로 확장되면서 만렙 길드 달성 시, 더 이상 기여도를 얻지 못하는 게 바뀌었습니다.<br>이 문제로 인해,<br>-  길드스킬 사용 무임승차를 막기 위해 확인할 수 있는 방법인 " 기여도 관리" 가 되지 않습니다.<br>-  " 수로 "로 확인하기에는 성인분들이셔서 다들 접속시간이 틀려서 맞추기 힘듭니다.<br>-  "플래그"는 올해 초부터 채널이 늘면서 인원체크가 힘들어졌습니다.'),
(8,6,'오랜만에 메플 할려고 했는데 게임 시작조차 안되네요','OTP 번호를 준다면서 창이 안보여요. 창이 떠서 서버가 클릭이 안되는 건 맞는 것 같은데 안보여서 번호를 입력할 수 없네요 ㅋ<br>오류인 것 같으니 확인 부탁드려요. '),
(8,6,'토론게시판은 찬반투표가 있는게 좋은가?','토론은 본디 의견을 표출하는 공간인데 다수결느낌나는 찬성 반대가 있어야하는 걸까, 아니면 역시 시각적인 효과를 위해 필요한걸까?');
SELECt * FROM POST;

#댓글 마지막 포스트에만
INSERT INTO COMMENT(post_no,user_no,cmt_content)
VALUES
(31,1,'니가했다고 당당하게말하셈'),	
(31,2,'영정이 아니니깐 그냥 pc방 갈때 라면사주면서 차분히 말하셈
걔 모스트 스킨이나 한장 사줘'),	
(31,3,'모른척 해야지ㅋㅋㅋㅋㅋ'),	
(31,4,'라이엇 요즘 일 잘하는구나'),	
(31,5,'던지는건 먹여야지 ㄹㅇㅋㅋ');	

INSERT INTO 
Faq(faq_category,faq_question,faq_answer)
VALUES('회원가입','회원가입이 안되요...!','테스트 중'),
('회원가입','비밀번호를 찾을 수 없어..','체크중');


INSERT INTO 
Qna(user_no,qna_category,qna_title,qna_content)
VALUES
(1,'게임질문','질문1','내용1'),(2,'게임질문','질문2','내용2');
		SELECT 
			p.post_no, 
			p.board_no,
			p.user_no, 
			u.user_name,
			u.user_email,
			p.board_no, 
			p.post_type,
			p.post_title, 
			p.post_content,
			p.post_recommendation_num,
			p.post_views_num,
			p.post_blamed,
			p.post_regtime, 
			p.post_updatetime,
			cc.cmt_no,
			cc.post_no,
			cc.cmt_user_no,
			cc.cmt_user_name,
			cc.cmt_user_email,
			cc.cmt_parent_no,
			cc.cmt_content,
			cc.cmt_recommendation_num,
			cc.cmt_blamed,
			cc.cmt_regtime,
			cc.cmt_updatetime
		FROM POST p 
		LEFT JOIN USER u ON p.user_no = u.user_no AND u.user_del_check = FALSE
		LEFT JOIN
			(SELECT  
				c.*,
				u.user_no as cmt_user_no,
				u.user_name as cmt_user_name,
				u.user_email as cmt_user_email
			FROM COMMENT c
			JOIN USER u
			ON c.user_no = u.user_no) as cc ON p.post_no = cc.post_no
		WHERE p.post_no = 31 AND p.post_del_check = FALSE ORDER BY cc.cmt_no;
SELECT * FROM QNA;


INSERT INTO RStage(
	rstage_name,
	rstage_theme)
VALUES(
	'stage00',
	'tutorial'
),(
	'stage01',
	'첫만남'
),(
	'stage02',
	'마지막'
)
;

SELECT * FROM RUserinfo; #유저가 play시작하면 바로 입력
select * From RGameinfo;
Select * From RMap;
insert into RMap(rstage_no, rmap_length) Values(1, 300),(2,1000),(3,1000);
select * from RMonster;
insert into RMonster(rmon_name, rmon_level, rmon_hp, rmon_grade, rmon_description)
values 
('다리우스',1,50,'ordinary','도끼를 들고 있는 악마로 도끼를 휘두르며 공격한다.'),
('드라고',2,100,'middleboss','불을 뿜어내는 몬스터로, 용의 형상을 하고 있다.'),
('거신',3,300,'finalboss','벼룩처럼 생겼지만, 레이저를 충전하여 쏘아대고, 벌레치곤 매우 크다.'),
('짜오',1,50,'ordinary','창을 들고 있는 악마로, 상대를 찌른채로 창을 올려버리는 무서운 괴물이다.'),
('아페오시카',2,100,'middleboss','뱀요괴로, 고대 그리스신화에 나오는 메두사의 형상을 하고 있고 눈빛으로 돌을 소환해서 상대를 찍어누른다.'),
('밀리패드',3,300,'finalboss','거대한 지네로써 땅속에 숨어있다가 튀어나와서 공격하고 다시 숨는 습관이 있다. 지네의 서식지를 통과하고 싶다면 몸통을 쪼개는 수 밖에 없다.');

select * from RMonster;

select * from RUserinfo;
select * 
from RStage rs
left join RUserinfo ru
on rs.rstage_no = ru.rstage_no
where ru.user_no = 1;

select * from RGameinfo;
select * from Image;
select * from User;
select * from Usergameinfo;

select * from RMonster;

SELECT
rs.rstage_no,
rs.rstage_name,
rs.rstage_theme,
rm.rmap_no,
rm.rmap_length
FROM RStage rs
LEFT JOIN RMap rm
ON rs.rstage_no = rm.rstage_no
WHERE rs.rstage_del_check = FALSE AND rm.rmap_del_check = FALSE
;

SELECT 
rui.ruserinfo_no,
rui.rstage_no,
rui.user_no,
rui.ruserinfo_iscleared,
rgi.rgameinfo_startdate,
rgi.rgameinfo_playtime,
rgi.rgameinfo_enddate,
rgi.rgameinfo_level,
rgi.rgameinfo_perfect_num,
rgi.rgameinfo_great_num,
rgi.rgameinfo_good_num,
rgi.rgameinfo_miss_num,
rgi.rgameinfo_rank,
rgi.rgameinfo_kcal,
rgi.rgameinfo_score
FROM RUserinfo rui
LEFT JOIN RGameinfo rgi
ON rui.ruserinfo_no = rgi.ruserinfo_no;

INSERT INTO RUserinfo(
	rstage_no,
	user_no,
	ruserinfo_hp,
	ruserinfo_golds)
VALUES(
	1,
	24,
	100,
	0);
INSERT INTO RGameinfo(
	ruserinfo_no,
	rgameinfo_level
	)
VALUES(
	1,
	1
);