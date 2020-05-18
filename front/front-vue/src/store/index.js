import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import board from "./modules/board";
import comment from "./modules/comment";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    board,
    comment,
  },
});
