import Api from "./Api";

class PostService {
  async getPost(post_no) {
    return Api.get(`/Post/search/${post_no}`)
      .then(Response => {
        return Response;
      })
      .catch(exp => {
        console.log("Error getPost : " + exp);
      });
  }
  async getPostDetail(post_no) {
    return Api.get(`/Post/searchDetail/${post_no}`)
      .then(Response => {
        return Response;
      })
      .catch(exp => {
        console.log("Error getPostDetail : " + exp);
      });
  }
  async insertPost(post) {
    return Api.post("/Post/insert", post)
      .then(() => {
        // console.log(Response);
      })
      .catch(exp => {
        console.log("Error insertPost : " + exp);
      });
  }
  async updatePost(post) {
    return Api.put("/Post/update", post)
      .then(() => {
        // console.log(Response);
      })
      .catch(exp => {
        console.log("Error updatePost : " + exp);
      });
  }
  async deletePost(post_no) {
    return Api.delete(`/Post/delete/${post_no}`)
      .then(() => {
        // console.log(Response);
      })
      .catch(exp => {
        console.log("Error deletePost : " + exp);
      });
  }
}
export default new PostService();
