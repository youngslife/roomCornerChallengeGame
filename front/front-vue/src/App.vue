<template>
  <q-layout view="lHh Lpr lFf">
    <Toolbar />
    <router-view />
  </q-layout>
</template>

<script>
import Toolbar from "./components/Toolbar";
export default {
  name: "LayoutDefault",

  components: {
    Toolbar
  },

  data() {
    return {
      leftDrawerOpen: false
    };
  }
};
</script>

<style></style>
