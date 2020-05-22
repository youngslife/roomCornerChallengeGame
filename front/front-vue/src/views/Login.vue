<template>
  <div class="col justify-center" style="margin-bottom:150px;">
    <div class="row justify-center">
      <h2 class="col-4" style="margin-top:150px;">로그인</h2>
    </div>
    <div class="row justify-center">
      <div class="q-gutter-y-md col-4" style="max-width: 600px">
        <q-card>
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="bg" label="방구석 ID 로그인" />
            <q-tab name="another" label="다른 간편 계정 로그인" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated style="height:500px">
            <q-tab-panel name="bg">
              <div class="row justify-center " style="margin-top:50px;">
                <q-input type="text" label="id" style="width:80%"  />
                <q-input type="text" label="pw" style="width:80%; margin-top:20px;"  />
                <q-btn color="primary" icon="check" label="방구석 ID로 로그인" style="width:80%; margin-top:50px;" />
              </div>
              <q-separator  style="margin-top:50px;" />
              <div class="row justify-around" style="margin-top:50px;">
              <q-btn color="primary" icon="check" label="방구석ID 찾기" />
              <q-btn color="primary" icon="check" label="비밀번호 찾기" />
              <q-btn color="primary" icon="check" label="방구석 회원가입" />
              
              </div>
            </q-tab-panel>

            <q-tab-panel name="another">
            <div class="row justify-center" style="margin-top:20px;">
              <q-btn color="primary" icon="check" label="방구석 ID로 로그인" style="width:80%; margin-top:50px;" />
              <q-btn color="primary" icon="check" label="방구석 ID로 로그인" style="width:80%; margin-top:50px;" />
              <q-btn color="primary" icon="check" label="방구석 ID로 로그인" style="width:80%; margin-top:50px;" />
              <q-btn color="primary" icon="check" label="방구석 ID로 로그인" style="width:80%; margin-top:50px;" />
              
            </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
// import firebase from "firebase";

export default {
  components: {},
  data() {
    return {
      tab: "bg"
    };
  },
  mounted() {
    // this.users = firebase.database().ref("users");
  },
  methods: {
    //   googleLogin() {
    //     console.log("Google Login");
    //     var self = this;
    //     firebase
    //       .auth()
    //       .signInWithPopup(new firebase.auth.GoogleAuthProvider())
    //       .then(function(result) {
    //         var token = result.credential.accessToken;
    //         console.log(token);
    //         localStorage.setItem("accessToken", token);
    //         self.$store.dispatch("user/setCurrentUser", result.user);
    //       })
    //       .catch(function(error) {
    //         var errorMessage = error.message;
    //         alert(errorMessage);
    //       });
    //   },
    //   isLoginButton: function(check, slide) {
    //     console.log(typeof slide);
    //     this.isLogin = check;
    //     this.menuSlide = String(slide);
    //   }
  }
};
</script>

<style scoped></style>
