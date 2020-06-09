import CmtService from "../../api/CommentService";

const state = { comment: {} };

const getters = {};

const actions = {
  insertCmt: (store, cmt) => {
    CmtService.insertCmt(cmt).then(() => {
      // console.log(Response);
    });
  },
  updateCmt: (store, cmt) => {
    CmtService.insertCmt(cmt).then(() => {
      // console.log(Response);
    });
  },
  deleteCmt: (store, cmt_no) => {
    CmtService.deleteCmt(cmt_no).then(() => {
      // console.log(Response);
    });
  }
};
const mutations = {};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
