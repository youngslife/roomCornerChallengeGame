<template>
  <div>
    <q-bar dark class="bg-primary text-white">
      <div class="col text-left">
        <q-btn    dense
          flat
          round
          label="back"
          size="20px"
          color="red"
          class="q-pa-lg" @click="back" />
      </div>
      <div class="col text-center text-weight-bold">
        In-Room-Chalinge
      </div>
      <div class="col text-right text-weight-bold">
        {{ name }}님 환영합니다.
        <q-btn
          dense
          flat
          round
          label="Logout"
          size="20px"
          color="green"
          class="q-pa-lg"
          @click="logout"
        />
      </div>
    </q-bar>
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
    },
    back(){
      this.$router.go(-1)
    }
  }
};
</script>

<style lang="scss" scoped></style>
