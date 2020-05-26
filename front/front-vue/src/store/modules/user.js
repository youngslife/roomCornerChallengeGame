import fireService from "../../api/FirebaseService";
import UserService from "../../api/UserService";

import router from "../../router";
const state = { user: {} };

const getters = {};

const actions = {
  postSignUp: (store, payload) => {
    //네이버는 아니야
    var signUpCheck = UserService.signUp(payload.user);

    if (payload.status) {
      if (signUpCheck) {
        fireService
          .signUpWithDefault(payload.user.mem_email, payload.user.mem_password)
          .then(check => {
            if (check) router.push("/login");
          });
      } else {
        if (signUpCheck) router.push("/login");
      }
    }
  },
  postLogIn: (store, payLoad) => {
    fireService
      .loginWithDefault(payLoad.user_email, payLoad.user_pw)
      .then(check => {
        if (check) {
          UserService.LogIn(payLoad.user_email).then(result => {
            store.commit("postLogIn", { user: result });
          });
          router.push("/");
        } else {
          alert("등록되지 않거나 비밀번호를 잘못입력하셧습니다.");
        }
      });
  },
  postGoogleLogIn: (store, payLoad) => {
    fireService
      .loginWithGoogle(payLoad.user_email, payLoad.user_pw)
      .then(async response => {
        await UserService.LogIn(response.user.email).then(Response => {
          if (Response.status != undefined && !Response.status) {
            store.commit("signUpSubEmail", { email: Response.email });
            router.push("/signup");
          } else {
            store.commit("postLogIn", { user: Response });
            router.push("/");
          }
        });
      })
      .catch(exp => alert("로그인 실패" + exp));
    //뒤에 우리디비에서 로그인 요청
  },
  postGitHubLogIn: (store, payLoad) => {
    fireService
      .loginWithGitHub(payLoad.user_email, payLoad.user_pw)
      .then(async response => {
        await UserService.LogIn(response.user.email)
          .then(Response => {
            if (Response.status != undefined && !Response.status) {
              store.commit("signUpSubEmail", { email: Response.email });
              router.push("/signup");
            } else {
              store.commit("postLogIn", { user: Response });
              router.push("/");
            }
          })
          .catch(() => {
            alert("이미 가입된 아이디 이거나 로그인에 실패하셧습니다.");
          });
      })
      .catch(exp => alert("로그인 실패 " + exp));
  },
  changeDeafultPw: (store, payLoad) => {
    fireService.resetPw(payLoad.email);
    router.push("/login");
  }
};
const mutations = {
  signUpSubEmail(state, payLoad) {
    state.tempEmail = payLoad.email;
  },
  postLogIn(state, payLoad) {
    state.user = payLoad.user;
  },
  postGoogleLogIn: (state, payLoad) => {
    state.user = payLoad.user;
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
