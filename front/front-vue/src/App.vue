<template>
  <q-layout view="lHh Lpr lFf">
    <Header />
    <Drawer />
    <router-view />
    <Footer />
  </q-layout>
</template>

<script>
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
  mounted() {}
  // computed: {
  //   ...mapState({
  //     user: state => state.data.user
  //   })
  // }
};
</script>

<style></style>
