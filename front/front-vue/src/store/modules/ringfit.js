import RingfitService from "../../api/RingfitService";

const state = { stage: [] };

const getters = {};

const actions = {
  getStageByUser: (store, payLoad) => {
    RingfitService.getStageByUser(payLoad.no).then(Response => {
      store.commit("setStage", { stage: Response });
    });
  },
  updateStageInfo: (store, payLoad) => {
    RingfitService.updateStageInfo(payLoad);
  }
};
const mutations = {
  setStage(state, payLoad) {
    state.stage = payLoad.stage;
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
