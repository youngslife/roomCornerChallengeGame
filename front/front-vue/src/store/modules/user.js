import fireService from "../../api/FirebaseService";
import UserService from "../../api/UserService";

import router from "../../router";
const state = { user: {}, tempEmail: "", tempEmailType: 0, user_no: "" };

const getters = {};

const actions = {
  postSignUp: (store, payload) => {
    UserService.insertUser(payload.user).then(signUpCheck => {
      if (state.tempEmailType == 0) {
        if (signUpCheck) {
          fireService
            .signUpWithDefault(payload.user.user_email, payload.user_password)
            .then(check => {
              if (check) router.push("/login");
            });
          store.commit("signUpSubEmail", { email: "", type: 0 });
        } else {
          alert("중복된 아이디가 존재합니다. 아이디 바꿔주세요");
        }
      } else {
        if (signUpCheck) {
          alert("회원가입 완료");
          router.push("/login");
        } else {
          alert("에러");
        }
      }
    });
  },
  postLogIn: (store, payLoad) => {
    fireService
      .loginWithDefault(payLoad.user_email, payLoad.user_pw)
      .then(check => {
        if (check) {
          UserService.login(payLoad.user_email).then(result => {
            store.commit("postLogIn", { user: result.data.data });
          });
          router.push("/");
        } else {
          alert("등록되지 않거나 비밀번호를 잘못입력하셨습니다.");
        }
      });
  },
  postGoogleLogIn: store => {
    fireService
      .loginWithGoogle()
      .then(async response => {
        let email = response.user.email;
        await UserService.login(email).then(Response => {
          if (Response == false) {
            store.commit("signUpSubEmail", { email: email, type: 1 });
            router.push("/signin");
          } else {
            store.commit("postLogIn", { user: Response.data.data });
            router.push("/");
          }
        });
      })
      .catch(exp => alert("로그인 실패" + exp));
  },
  changeDeafultPw: (store, payLoad) => {
    fireService.resetPw(payLoad.email);
    router.push("/login");
  },
  getUserInfo: (store, payLoad) => {
    console.log(payLoad);
    UserService.getUserDetailFromNo(payLoad).then(res => {
      console.log(res);
      store.commit("setUser", res.data.data);
    });
  }
};
const mutations = {
  signUpSubEmail(state, payLoad) {
    state.tempEmail = payLoad.email;
    state.tempEmailType = payLoad.type;
  },
  postLogIn(state, payLoad) {
    state.user = payLoad.user;
    state.user_no = payLoad.user.user_no;
    window.sessionStorage.setItem("user_no", payLoad.user.user_no);
  },
  postGoogleLogIn: (state, payLoad) => {
    state.user = payLoad.user;
    state.user_no = payLoad.user.user_no;
    window.sessionStorage.setItem("user_no", payLoad.user.user_no);
  },
  setUserNo: (state, payLoad) => {
    state.user_no = payLoad.user_no;
    window.sessionStorage.setItem("user_no", payLoad.user_no);
  },
  setUser: (state, payLoad) => {
    state.user = payLoad;
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
