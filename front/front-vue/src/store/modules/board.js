import api from "../../api";

const state = {
  board: null,
  boardList: [],
};

const getters = {
  board: (state) => state.board,
  boardList: (state) => state.boardList,
};

const mutations = {
  setBoardList: (state, boardList) => {
    state.boardList = boardList;
  },
  setBoard: (state, board) => {
    state.board = board;
  },
};

const actions = {
  async getBoardList({ commit }, params) {
    const res = await api.getBoardList(params);
    commit("setBoardList", res.data);
  },
  async getBoard({ commit }, params) {
    const res = await api.getBoard(params);
    commit("setBoard", res.data);
  },
  async create(params) {
    return await api.createBoard(params);
  },
  async update(params) {
    return await api.updateBoard(params);
  },
  async delete(params) {
    const res = await api.deleteBoard(params);
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
