import BoardService from "../../api/BoardService";

const state = { boardList: [] };

const getters = {};

const actions = {
  getBoardListByType: (store, payLoad) => {
    BoardService.getBoardListByType(payLoad).then(Response => {
      console.log(Response.data.data.result);
      store.commit("changeBoard", { boardList: Response.data.data.result });
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
