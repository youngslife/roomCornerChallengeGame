import Api from "./Api";

class PostService {
  async getPost(post_no) {
    console.log(post_no);
    return Api.get(`/Post/search/${post_no}`)
      .then(Response => {
        console.log(Response);
      })
      .catch(exp => {
        console.log("Error insertPost : " + exp);
      });
  }
  async getPostDetail(post_no) {
    console.log(post_no);
    return Api.get(`/Post/searchDetail/${post_no}`)
      .then(Response => {
        console.log(Response);
      })
      .catch(exp => {
        console.log("Error insertPost : " + exp);
      });
  }
  async insertPost(post) {
    console.log(post);
    return Api.post("/Post/insert", { post: post })
      .then(Response => {
        console.log(Response);
      })
      .catch(exp => {
        console.log("Error insertPost : " + exp);
      });
  }
  async updatePost(post) {
    console.log(post);
    return Api.put("/Post/update", { post: post })
      .then(Response => {
        console.log(Response);
      })
      .catch(exp => {
        console.log("Error insertPost : " + exp);
      });
  }
  async deletePost(post_no) {
    console.log(post_no);
    return Api.post(`/Post/delete/${post_no}`)
      .then(Response => {
        console.log(Response);
      })
      .catch(exp => {
        console.log("Error insertPost : " + exp);
      });
  }
  async getPost(board) {
    console.log(board);
    return Api.get(
      `/Board/searchBoardTitle/${board.location}/${board.title}/${board.page_no}`
    )
      .then(Response => {
        console.log(Response);
        return Response;
      })
      .catch(exp => {
        console.log("Error getBoardListByType : " + exp);
      });
  }
}
export default new BoardService();
