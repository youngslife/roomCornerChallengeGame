## 기본 웹 서버 기능 구현 Spring 

### 5월 3주차 

- 기본적으로 필요한 사용자, 게시판 관련된 내용을 구현한다.

#### 1. 기본형태

> 백엔드 REST CONTROLLER - SERVICE - DAO - DB  
> DB : MySQL  
> SQL Mapper : MyBatis Framework  
> Business Logic : Spring boot Framework

#### 2. CLASS별 기능

- USER
    > 회원가입  
    > 로그인(기본)  
    > 회원수정  
    > 이메일로 회원 찾기  

- BOARD
    > 게시판 생성  
    > 전체게시판 게시물 페이징해서 가져오기  
    > 특정 게시판 게시물 페이징해서 가져오기

- POST
    > 게시물 생성  
    > 게시물 상세 내용 가져오기(게시물 및 유저정보 + 댓글 및 댓글유저정보)

- COMMENT
    > 댓글 생성

#### 3. API DOCUMENTATION(SWAGGER)
- http://localhost:8081/swagger-ui.html

#### 4. mysql pjt3db 생성 및 sql 수행
- resource/ddl.sql
- resource/insert.sql
- 유저는 비밀번호 암호화때문에 swagger에서 따로 하는게 편함

#### 5. 추가할 내용
- 이름으로 회원리스트 검색하기(@어노테이션으로 검색할 수 있는 기능 구현)
- 게시판,게시물,댓글 수정
- 삭제(가명정보or익명정보 형태로 제거할 예정, 실제 db에서 지우지 않고 업데이트 하는 형태로 처리)
- 소셜로그인(firebase api를 쓰던지)
 