import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import header from "./modules/header";
import board from "./modules/board";
import phaser from "./modules/phaser";
import ringfit from "./modules/ringfit";
import post from "./modules/post";
import comment from "./modules/comment";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  getters: {},
  actions: {},
  modules: {
    user,
    header,
    board,
    phaser,
    ringfit,
    post,
    comment
  }
});

export default store;
