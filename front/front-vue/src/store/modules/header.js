const state = {
  isDrawer: false
};

const getters = {
  isDrawer: state => state.isDrawer
};

const actions = {
   changeIsDrawer({ commit }) {
    commit("setIsDrawer");
  }
};

const mutations = {
  setIsDrawer: state => {
    state.isDrawer = !state.isDrawer;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

