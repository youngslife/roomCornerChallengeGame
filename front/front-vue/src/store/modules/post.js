import PostService from "../../api/PostService";

const state = { post: {} };

const getters = {};

const actions = {
  getPost: (store, post_no) => {
    PostService.getPostDetail(post_no).then(Response => {
      store.commit("setPost", { post: Response });
    });
  },
  insertPost: (store, post) => {
    console.log(post);
    PostService.insertPost(post).then(Response => {
      console.log(Response);
    });
  },
  updatePost: (store, post) => {
    console.log(post);
    PostService.insertPost(post).then(Response => {
      console.log(Response);
    });
  },
  deletePost: (store, post_no) => {
    console.log(post_no);
    PostService.deletePost(post_no).then(Response => {
      console.log(Response);
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
