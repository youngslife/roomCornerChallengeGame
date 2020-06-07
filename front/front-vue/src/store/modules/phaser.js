const state = {
  isMeet: false,
  scene: ""
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
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
