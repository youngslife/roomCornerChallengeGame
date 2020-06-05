import CmtService from "../../api/CommentService";

const state = { comment: {} };

const getters = {};

const actions = {
  insertCmt: (store, cmt) => {
    CmtService.insertCmt(cmt).then(Response => {
      console.log(Response);
    });
  },
  updateCmt: (store, cmt) => {
    CmtService.insertCmt(cmt).then(Response => {
      console.log(Response);
    });
  },
  deleteCmt: (store, cmt_no) => {
    console.log(cmt_no);
    CmtService.deleteCmt(cmt_no).then(Response => {
      console.log(Response);
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
