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
    path: "/signin",
    name: "signin",
    component: () => import("../views/SignIn.vue")
  },
  {
    path: "/mypage",
    name: "mypage",
    component: () => import("../views/MyPage.vue")
  },
  //피트니스 게임
  {
    path: "/fitness",
    component: () => import("../views/Fitness/Fitness.vue"),
    children: [{
        path: "",
        name: "fitness",
        component: () => import("../views/Fitness/FitnessHome.vue")
      },
      {
        path: "community",
        name: "fitnesscommunity",
        component: () => import("../views/Fitness/FitnessCommunity.vue")
      },
      {
        path: "guide",
        name: "fitnessguide",
        component: () => import("../views/Fitness/FitnessGuide.vue")
      },
      {
        path: "rank",
        name: "fitnessrank",
        component: () => import("../views/Fitness/FitnessRank.vue")
      },
      {
        path: "info",
        name: "fitnessinfo",
        component: () => import("../views/Fitness/FitnessInfo.vue")
      }
    ]
  },
  {
    path: "/game/RingFit",
    name: "RingFit",
    component: () => import("../views/Game/RingFit.vue")
  },
  {
    path: "/temp/SelectMotion",
    name: "SelectMotion",
    component: () => import("../components/ringfit/SelectMotion.vue")
  },
  {
    path: "/temp/SelectStage",
    name: "SelectStage",
    component: () => import("../components/ringfit/SelectStage.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
import store from "../store/index.js";
router.beforeEach((to, from, next) => {
  if (store.state.header.isDrawer == true) {
    store.dispatch("header/changeIsDrawer");
  }
  next();
});

export default router;