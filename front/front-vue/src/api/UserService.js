import Api from "./Api";

class UserService {
  //전체 유저 리스트
  async getAllUser() {
    return await Api.get("/User/searchAll")
      .then(Response => {
        return Response;
      })
      .catch(exp => {
        console.log("Error getAllUser : " + exp);
        return {};
      });
  }
  // 유저 넘버(키)를 이용한 유저 검색
  async getUserFromNo(userNo) {
    return await Api.get(`/User/search/${userNo}`)
      .then(Response => {
        return Response;
      })
      .catch(exp => {
        console.log("Error getUserFromNo : " + exp);
        return {};
      });
  }
  async getUserDetailFromNo(userNo) {
    return await Api.get(`/User/searchUserDetail/${userNo}`)
      .then(Response => {
        return Response;
      })
      .catch(exp => {
        console.log("Error getUserDetailFromNo : " + exp);
        return {};
      });
  }
  // 유저 회원 가입
  async insertUser(user) {
    return await Api.post("/User/insert", user)
      .then(() => {
        return true;
      })
      .catch(exp => {
        console.log("Error insertUser : " + exp);
        return false;
      });
  }
  //유저 로그인
  async login(email) {
    return await Api.post("/User/login", { email: email })
      .then(Response => {
        return Response;
      })
      .catch(exp => {
        console.log("Error login : " + exp);
        return false;
      });
  }
  //유저 정보 수정
  async updateUser(user) {
    return await Api.put("/User/update", { user: user })
      .then(() => {
        // console.log(Response);
        return true;
      })
      .catch(exp => {
        console.log("Error updateUser : " + exp);
        return false;
      });
  }
}

export default new UserService();
