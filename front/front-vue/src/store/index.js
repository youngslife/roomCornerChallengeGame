import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import header from "./modules/header";
import board from "./modules/board";
import phaser from "./modules/phaser";
import post from "./modules/post";
import comment from "./modules/comment";

import ringfit from "./modules/ringfit";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    header,
    board,
    phaser,
    post,
    comment,
    ringfit,
  }
});