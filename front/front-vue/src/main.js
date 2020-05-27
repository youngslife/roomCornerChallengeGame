import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./quasar";
import firebase from "firebase";

Vue.config.productionTip = false;

Vue.use(CKEditor);

new Vue({
  router,
  store,
  firebase,
  render: h => h(App)
}).$mount("#app");
