import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import header from "./modules/header";
import board from "./modules/board";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    header,
    board
  }
});
