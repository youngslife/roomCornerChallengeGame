const state = {
  stageNum: 0,
  motionName: ""
};

const getters = {
  getStageNum: state => state.stageNum,
  getMotionName: state => state.motionName
};

const actions = {};

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