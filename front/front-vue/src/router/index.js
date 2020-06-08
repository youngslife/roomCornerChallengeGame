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
    children: [
      {
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
  //마피아 게임
  {
    path: "/mafia",
    component: () => import("../views/Mafia/Mafia.vue"),
    children: [{
        path: "",
        name: "mafia",
        component: () => import("../views/Mafia/MafiaHome.vue")
      },
      {
        path: "community",
        name: "mafiacommunity",
        component: () => import("../views/Mafia/MafiaCommunity.vue")
      },
      {
        path: "guide",
        name: "mafiaguide",
        component: () => import("../views/Mafia/MafiaGuide.vue")
      },
      {
        path: "rank",
        name: "mafiarank",
        component: () => import("../views/Mafia/MafiaRank.vue")
      },
      {
        path: "info",
        name: "mafiainfo",
        component: () => import("../views/Mafia/MafiaInfo.vue")
      }
    ]
  },
  {
    path: "/mafia",
    component: () => import("../views/Mafia/Mafia.vue"),
    children: [
      {
        path: "",
        name: "mafia",
        component: () => import("../views/Mafia/MafiaHome.vue")
      },
      {
        path: "community",
        name: "maifacommunity",
        component: () => import("../views/Mafia/MafiaCommunity.vue")
      },
      {
        path: "guide",
        name: "maifaguide",
        component: () => import("../views/Mafia/MafiaGuide.vue")
      },
      {
        path: "rank",
        name: "maifarank",
        component: () => import("../views/Mafia/MafiaRank.vue")
      },
      {
        path: "info",
        name: "maifainfo",
        component: () => import("../views/Mafia/MafiaInfo.vue")
      }
    ]
  },
  {
    path: "/game/mafia/start/:roomNo",
    name: "mafiastart",
    component: () => import("../views/Mafia/MafiaGameStart.vue"),
    props: true 
  },
  {
    path: "/game/mafia/lobby",
    name: "mafialobby",
    component: () => import("../views/Mafia/MafiaGameLobby.vue")
  },
  {
    path: "/game/mafia/room/:roomNo",
    name: "mafiaroom",
    component: () => import("../views/Mafia/MafiaGameWait.vue"),
    props: true 
  },
  {
    path: "/game/RingFit",
    name: "RingFit",
    component: () => import("../views/Game/RingFit.vue")
  },
  {
    path: "/jump",
    name: "jump",
    component: () => import("../views/jump.vue")
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
