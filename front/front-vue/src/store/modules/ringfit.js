import RingfitService from "../../api/RingfitService";

const state = {
  stageNum: 0,
  motionName: "",
  rgameInfo: {},
  idx: 0,
};

const getters = {
  getStageNum: state => state.stageNum,
  getMotionName: state => state.motionName,
  getIdx: state => state.idx
};

const actions = {
  getStageByUser: (store, payLoad) => {
    RingfitService.getStageByUser(payLoad.no).then(Response => {
      const stage = Response.data.data;
      console.log(stage.message);
      let stNum;
      if (stage.message === "클리어 전적이 없습니다.") stNum = 0;
      else stNum = stage.record.rstage_no;
      store.commit("setStageNum", stNum);
    });
  },
  gameStart: (store, payLoad) => {
    RingfitService.gameStart(payLoad);
  },
  gameEnd: (store, payLoad) => {
    RingfitService.gameEnd(payLoad);
  }
};
const mutations = {
  setStageNum: (state, payload) => {
    state.stageNum = payload;
  },
  setMotionName: (state, payload) => {
    state.motionName = payload;
  },
  setIdx: (state, payload) => {
    state.idx = payload
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
