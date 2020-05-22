import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  // 사이트 메인
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/fitness",
    name: "fitness",
    component: () => import("../views/Fitness/FitnessHome.vue")
  }
];



const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
import store from "../store/index.js";
router.beforeEach((to, from, next) => {

  if(store.state.header.isDrawer == true){
  store.dispatch('header/changeIsDrawer');
  }
  next();
});

export default router;
