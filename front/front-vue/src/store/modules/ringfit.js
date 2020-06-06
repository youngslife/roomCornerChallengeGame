import RingfitService from "../../api/RingfitService";

const state = {
  stageNum: 0,
  motionName: ""
};

const getters = {
  getStageNum: state => state.stageNum,
  getMotionName: state => state.motionName
};

const actions = {
  getStageByUser: (store, payLoad) => {
    RingfitService.getStageByUser(payLoad.no).then(Response => {
      store.commit("setStageNum", { stage: Response });
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
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
