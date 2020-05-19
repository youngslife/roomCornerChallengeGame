<template>
  <div>
    <BeforeLoginToolBar v-on:isLoginButton="isLoginButton" />
    <q-layout view="hHr LpR lFf" class="bg-blue-grey-10 flex flex-center">
      <template v-if="isLogin">
        <q-card class="my-card">
          <q-card-section class="text-center">
            <div class="text-h4">방구석 챌린지</div>
            <div class="text-subtitle2">내가 방구석 여포다</div>
          </q-card-section>
          <q-card-section>
            <div class="row">
              <h4 class="col-3">ID</h4>
              <q-input
                class="col-9"
                v-model="email"
                type="text"
                label="아이디"
              />
            </div>
            <div class="row">
              <h4 class="col-3">PW</h4>
              <q-input
                class="col-9"
                v-model="password"
                type="password"
                label="패스워드"
              />
            </div>
          </q-card-section>
          <q-card-section class="row">
            <q-btn
              color="primary"
              icon="check"
              label="로그인"
              class="col-12"
              to="/home"
            />
            <q-btn
              color="primary"
              icon="check"
              label="카톡 로그인"
              class="col-12"
            />
            <q-btn
              color="primary"
              icon="check"
              label="구글 로그인"
              class="col-12"
              @click="googleLogin"
            />
          </q-card-section>
        </q-card>
      </template>
      <template v-else>
        <q-carousel
          v-model="menuSlide"
          transition-prev="slide-right"
          transition-next="slide-left"
          animated
          control-color="primary"
          class="rounded-borders bg-blue-grey-10"
          arrows
          height="900px"
          style="width:100%"
        >
          <q-carousel-slide
            name="2"
            img-src="https://mafia42.com/images/background-mafia.png"
          >
            <div class="absolute-center custom-caption text-white ">
              <div class="text-h1 text-weight-bolder">마피아</div>
              <br />
              <div class="text-h3 text-weight-bolder">범인은 누구인가.</div>
              <div class="text-subtitle1 text-weight-bolder">
                추리 게임의 근본.
              </div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide
            name="3"
            img-src="https://i.ytimg.com/vi/shw0BHTEBZU/maxresdefault.jpg"
          >
            <div class="absolute-center custom-caption text-amber-5">
              <div class="text-h1 text-weight-bolder">링피트</div>
              <br />
              <div class="text-h3 text-weight-bolder">
                몬스터도 잡고 내 지방도 잡고!
              </div>
              <div class="text-subtitle1 text-weight-bolder">
                피트니스 게임의 근본.
              </div>
            </div>
          </q-carousel-slide>
          <q-carousel-slide
            name="4"
            img-src="https://techrecipe.co.kr/wp-content/uploads/2019/11/191127_Beat-Saber_001.jpg"
          >
            <div class="absolute-center custom-caption text-red-12">
              <div class="text-h1 text-weight-bolder">비트 세이버</div>
              <br />
              <div class="text-h3 text-weight-bolder">
                음악에 내몸을 한껏 던진다!
              </div>
              <div class="text-subtitle1 text-weight-bolder">
                바디 리듬 게임의 근본.
              </div>
            </div>
          </q-carousel-slide>
        </q-carousel>
      </template>
    </q-layout>
  </div>
</template>

<script>
import firebase from "firebase";
import BeforeLoginToolBar from "./../components/BeforeLoginToolBar";

export default {
  components: {
    BeforeLoginToolBar
  },
  data() {
    return {
      email: "",
      password: "",
      users: {},
      menuSlide: "2",
      isLogin: false
    };
  },
  mounted() {
    this.users = firebase.database().ref("users");
  },
  methods: {
    googleLogin() {
      console.log("Google Login");
      var self = this;
      firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(function(result) {
          var token = result.credential.accessToken;
          console.log(token);
          localStorage.setItem("accessToken", token);
          self.$store.dispatch("user/setCurrentUser", result.user);
        })
        .catch(function(error) {
          var errorMessage = error.message;
          alert(errorMessage);
        });
    },
    isLoginButton: function(check, slide) {
      console.log(typeof slide);
      this.isLogin = check;
      this.menuSlide = String(slide);
    }
  }
};
</script>

<style scoped></style>
