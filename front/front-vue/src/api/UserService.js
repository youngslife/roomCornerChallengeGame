import Api from "./Api";

class UserService {
  async signUp(user) {
    return await Api.post("/Members/insert", user)
      .then(() => {
        alert("회원가입 성공");
        return true;
      })
      .catch(exp => {
        alert("회원가입 실패 " + exp);
        return false;
      });
  }

  LogIn(email) {
    return Api.post("/Members/login", {
      mem_email: email
    })
      .then(response => {
        return response.data.data;
      })
      .catch(error => {
        if (error.response.status === 404) {
          return { status: false, email: email };
        }
      });
  }

  updateUser(user) {
    return Api.put("/Members/update", user)
      .then(res => {
        return res.data;
      })
      .catch(e => {
        console.log(e);
      });
  }
  followerUser(userNo) {
    return Api.get(`/Members/searchFollowMePeople/${userNo}`).then(Response => {
      return Response.data.data;
    });
  }
}

export default new UserService();
