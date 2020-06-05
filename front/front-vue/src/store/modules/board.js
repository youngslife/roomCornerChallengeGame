import BoardService from "../../api/BoardService";

const state = { boardList: [], postList: [] };

const getters = {};

const actions = {
  getBoardListByType: (store, payLoad) => {
    BoardService.getBoardListByType(payLoad).then(Response => {
      console.log(Response.data.data.result);
      store.commit("changeBoard", { boardList: Response.data.data.result });
    });
  },
  getBoardListBySubType: (store, payLoad) => {
    BoardService.getBoardListBySubType(payLoad).then(Response => {
      console.log(Response);
      store.commit("changePost", { postList: Response.data.data.result });
    });
  }
};
const mutations = {
  changeBoard(state, payLoad) {
    state.boardList = payLoad.boardList;
  },
  changePost(state, payLoad) {
    state.postList = payLoad.postList;
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
