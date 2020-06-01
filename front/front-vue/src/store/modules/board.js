import BoardService from "../../api/BoardService";

const state = { boardList: [] };

const getters = {};

const actions = {
  getBoardListByType: (store, payLoad) => {
    BoardService.getBoardListByType(payLoad).then(Response => {
      store.commit("changeBoard", { boardList: Response });
    });
  }
};
const mutations = {
  changeBoard(state, payLoad) {
    state.boardList = payLoad.boardList;
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
