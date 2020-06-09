import PostService from "../../api/PostService";

const state = { post: {} };

const getters = {};

const actions = {
  getPost: (store, post_no) => {
    PostService.getPostDetail(post_no).then(Response => {
      store.commit("setPost", { post: Response.data.data });
    });
  },
  insertPost: (store, post) => {
    PostService.insertPost(post).then(() => {
      // console.log(Response);
    });
  },
  updatePost: (store, post) => {
    PostService.insertPost(post).then(() => {
      // console.log("dafadf", Response);
    });
  },
  deletePost: (store, post_no) => {
    PostService.deletePost(post_no).then(() => {
      // console.log(Response);
    });
  }
};
const mutations = {
  setPost(state, payLoad) {
    state.post = payLoad.post;
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
