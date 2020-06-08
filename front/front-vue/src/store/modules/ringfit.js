import RingfitService from "../../api/RingfitService";

const state = {
  stageNum: 0,
  motionName: "",
  ruserInfo_no: 0,
  rgameInfo_no: 0,
  stages: [],
  coin: 0,
  isPause: false,
  count: 0,
  gameInfo: {
    perfect: 0,
    great: 0,
    good: 0,
    bad: 0
  },
  idx: 0
};

const getters = {
  getStageNum: state => state.stageNum,
  getMotionName: state => state.motionName,
  getIdx: state => state.idx,
  getGameInfo: state => state.getGameInfo
};

const actions = {
  getStageByUser: (store, payLoad) => {
    RingfitService.getStageByUser(payLoad.no).then(Response => {
      const stage = Response.data.data;
      console.log(stage.message);
      let stNum;
      if (stage.message === "클리어 전적이 없습니다.") stNum = 1;
      else stNum = stage.record.rstage_no + 1;
      console.log(stNum);
      store.commit("setStageNum", stNum);
      store.commit("setStages", stNum);
    });
  },
  gameStart: (store, payLoad) => {
    RingfitService.gameStart(payLoad).then(Response => {
      console.log(Response.data.data.stageInfo);
      store.commit(
        "setUserInfo_no",
        Response.data.data.stageInfo.rstage_usergameinfo[0].ruserinfo_no
      );
      store.commit(
        "setGameInfo_no",
        Response.data.data.stageInfo.rstage_usergameinfo[0].ruserinfo_gameinfo
          .rgameinfo_no
      );
      store.commit("setCount", 0);
      store.commit("setGameInfo", {
        perfect: 0,
        great: 0,
        good: 0,
        bad: 0
      });
    });
  },
  gameEnd: (store, payLoad) => {
    RingfitService.gameEnd(payLoad).then(() => {
      store.commit("setCoin", 0);
      store.commit("setCount", 0);
    });
  },
  gamePause: (store, payLoad) => {
    store.commit("setIsPause", payLoad);
  }
};
const mutations = {
  setStageNum: (state, payload) => {
    state.stageNum = payload;
  },
  setMotionName: (state, payload) => {
    state.motionName = payload;
  },
  setUserInfo_no: (state, payload) => {
    state.ruserInfo_no = payload;
  },
  setGameInfo_no: (state, payload) => {
    state.rgameInfo_no = payload;
  },
  setStages: (state, payload) => {
    for (let i = 1; i < payload; i++) state.stages.push(i);
  },
  setCoin: (state, payload) => {
    state.coin = payload;
  },
  setIsPause: (state, payload) => {
    state.isPause = payload;
  },
  setCount: (state, payload) => {
    state.count = payload;
  },
  setGameInfo: (state, payload) => {
    state.gameInfo = payload;
  },
  setIdx: (state, payload) => {
    state.idx = payload;
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
