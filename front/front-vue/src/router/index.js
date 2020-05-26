import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import firebase from "firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("../views/Login.vue"),
    beforeEnter: (to, from, next) => {
      firebase.auth().onAuthStateChanged(function(user) {
        console.log(user);
        if (user) {
          next("/home");
        } else next();
      });
    },
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
  {
    path: "/boardList",
    name: "boardList",
    component: () => import("../views/Board/BoardList.vue"),
  },
  {
    path: "/boardDetail/:id",
    name: "boardDetail",
    component: () => import("../views/Board/BoardDetail.vue"),
  },
  {
    path: "/boardCreate",
    name: "boardCreate",
    component: () => import("../views/Board/BoardCreate.vue"),
  },
  {
    path: "/game/RingFit",
    name: "RingFit",
    component: () => import("../views/Game/RingFit.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   // let requireAuth = to.matched.some((record) => record.meta.requireAuth);
//   firebase.auth().onAuthStateChanged(function(user) {
//     if (user || to.path === "/") {
//       next();
//     } else {
//       // console.log(user);
//       next("/");
//     }
//   });
// });
export default router;
