<template>
  <q-layout view="lHh Lpr lFf">
    <template v-if="user != undefined">
      <Toolbar />
    </template>
    <router-view />
  </q-layout>
</template>

<script>
import firebase from "firebase";
import Toolbar from "./components/Toolbar";
// import { mapState } from "vuex";
export default {
  name: "LayoutDefault",

  components: {
    Toolbar
  },

  data() {
    return {
      leftDrawerOpen: false,
      user: []
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
    console.log(self);
    this.user = self;
  }
  // computed: {
  //   ...mapState({
  //     user: state => state.data.user
  //   })
  // }
};
</script>

<style></style>
