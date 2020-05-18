import api from "../../api";

const state = {
  user: null,
};

const getters = {
  user: (state) => state.user,
  userList: (state) => state.userList,
  isLogged: (state) => state.user !== null,
};

const mutations = {
  setUser: (state, user) => {
    state.user = user;
  },
  setUserList: (state, userList) => {
    state.userList = userList;
  },
};

const actions = {
  async getUserList({ commit }, params) {
    const res = await api.getUserList(params);
    commit("setUserList", res.data);
  },
  async getCurrentUser({ commit }, params) {
    const res = await api.getUser(params);
    commit("setUser", res.data);
  },
  async create(params) {
    return await api.createUser(params);
  },
  async update(params) {
    return await api.updateUser(params);
  },
  async delete(params) {
    const res = await api.deleteUser(params);
    console.log(res);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
