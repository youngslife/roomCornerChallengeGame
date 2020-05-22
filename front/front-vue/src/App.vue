<template>
  <q-layout view="lHh Lpr lFf">
    <Header />
    <Drawer />
    <router-view />
    <Footer />
  </q-layout>
</template>

<script>
import firebase from "firebase";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Drawer from "./components/Drawer";
// import { mapState } from "vuex";
export default {
  name: "LayoutDefault",

  components: {
    Header,
    Footer,
    Drawer
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
