<template>
  <div>
    <q-layout class="flex flex-center">
      <q-card class="my-card">
        <q-card-section class="text-center">
          <div class="text-h4">방구석 챌린지</div>
          <div class="text-subtitle2">내가 방구석 여포다</div>
        </q-card-section>
        <q-card-section>
          <div class="row">
            <h4 class="col-3">ID</h4>
            <q-input class="col-9" v-model="email" type="text" label="아이디" />
          </div>
          <div class="row">
            <h4 class="col-3">PW</h4>
            <q-input class="col-9" v-model="password" type="password" label="패스워드" />
          </div>
        </q-card-section>
        <q-card-section class="row">
          <q-btn color="primary" icon="check" label="로그인" class="col-12" to="/home" />
          <q-btn color="primary" icon="check" label="카톡 로그인" class="col-12" />
          <q-btn color="primary" icon="check" label="구글 로그인" class="col-12" @click="googleLogin" />
        </q-card-section>
      </q-card>
    </q-layout>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      email: "",
      password: "",
      users: {}
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
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          console.log(token);
          localStorage.setItem("accessToken", token);
          self.$store.dispatch("user/setCurrentUser", result.user);
        })
        .catch(function(error) {
          // Handle Errors here.
          //   var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
          //   // The email of the user's account used.
          //   var email = error.email;
          //   // The firebase.auth.AuthCredential type that was used.
          //   var credential = error.credential;
          // ...
        });
    }
  }
};
</script>

<style scoped></style>
