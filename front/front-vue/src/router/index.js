import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component:() => import("../views/Login.vue")
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/gamehome",
    name: "GameHome",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/GameHome.vue"),
  },
  {
    path: "/how",
    name: "how",
    component: () => import("../views/How.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
