const state = {
  isMeet: false,
  modelUrl: "https://raw.githubusercontent.com/youngslife/fitnessPoseModel/master/base/",
};

const getters = {
  isMeet: state => state.isMeet,
  // model url  가져오기
  getModelUrl: state => state.modelUrl
};

const actions = {
  changeIsMeet({ store, payload }) {
    store.commit("setIsMeet", payload);
  },
  changeModelUrl({ commit }, modelUrl ) {
    commit("setModelUrl", modelUrl);
  }
};

const mutations = {
  setIsMeet: (state, payload) => {
    state.isMeet = payload;
  },
  setModelUrl: (state, modelUrl) => {
    state.modelUrl = modelUrl;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
