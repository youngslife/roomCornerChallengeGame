<template>
  <div v-show="loginStatus">
    {{ name }}님 환영합니다.
    <a @click="logout" href>Logout</a>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      name: "",
      loginStatus: false
    };
  },
  mounted() {
    let self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        self.loginStatus = true;
        self.name = user.displayName;
      }
    });
  },
  methods: {
    logout() {
      let user = firebase.auth().currentUser;
      // let provider = new firebase.auth.GoogleAuthProvider();
      // provider.setCustomParameters({ prompt: "select_account" });
      if (user) {
        firebase
          .auth()
          .signOut()
          .then(function() {
            console.log("logout success");
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
