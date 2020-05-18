import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./quasar";
import firebase from "firebase";
import CKEditor from "@ckeditor/ckeditor5-vue";

Vue.config.productionTip = false;

var config = {
  apiKey: "AIzaSyBG0DX-1bxEDK4p0ARoq8-6OhqmTkZpzZA",
  authDomain: "bangguseok-aad42.firebaseapp.com",
  databaseURL: "https://bangguseok-aad42.firebaseio.com",
  projectId: "bangguseok-aad42",
  storageBucket: "bangguseok-aad42.appspot.com",
  messagingSenderId: "144777519168",
  appId: "1:144777519168:web:d199932b5be21e2550ffa5",
  measurementId: "G-R4GDHSE5GN",
};
firebase.initializeApp(config);

Vue.use(CKEditor);

new Vue({
  router,
  store,
  firebase,
  render: (h) => h(App),
}).$mount("#app");
