import api from "../../api";

const state = {
  comment: null,
  commentList: [],
};

const getters = {
  comment: (state) => state.comment,
  commentList: (state) => state.commentList,
};

const mutations = {
  setCommentList: (state, commentList) => {
    state.commentList = commentList;
  },
  setComment: (state, comment) => {
    state.comment = comment;
  },
};

const actions = {
  async getCommentList({ commit }, params) {
    const res = await api.getCommentList(params);
    commit("setCommentList", res.data);
  },
  async getComment({ commit }, params) {
    const res = await api.getComment(params);
    commit("setComment", res.data);
  },
  async create(params) {
    return await api.createComment(params);
  },
  async update(params) {
    return await api.updateComment(params);
  },
  async delete(params) {
    const res = await api.deleteComment(params);
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
