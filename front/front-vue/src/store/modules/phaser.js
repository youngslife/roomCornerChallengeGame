const state = {
  isMeet: false,
  scene: "",
  isClear: false,
  isWipe: false
};

const getters = {
  isMeet: state => state.isMeet
};

const actions = {
  changeIsMeet({ store, payload }) {
    store.commit("setIsMeet", payload);
  }
};

const mutations = {
  setIsMeet: (state, payload) => {
    state.isMeet = payload;
  },
  setScene: (state, payload) => {
    state.scene = payload;
  },
  wipe: (state, payload) => {
    state.isWipe = payload;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
