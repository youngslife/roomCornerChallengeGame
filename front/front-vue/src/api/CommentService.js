import Api from "./Api";

class CommentService {
  async getComment(cmt_no) {
    console.log(cmt_no);
    return Api.get(`/Comment/search/${cmt_no}`)
      .then(Response => {
        console.log(Response);
      })
      .catch(exp => {
        console.log("Error getComment : " + exp);
      });
  }
  async insertComment(Comment) {
    console.log(Comment);
    return Api.Comment("/Comment/insert", { Comment: Comment })
      .then(Response => {
        console.log(Response);
      })
      .catch(exp => {
        console.log("Error insertComment : " + exp);
      });
  }
  async updateComment(Comment) {
    console.log(Comment);
    return Api.put("/Comment/update", { Comment: Comment })
      .then(Response => {
        console.log(Response);
      })
      .catch(exp => {
        console.log("Error insertComment : " + exp);
      });
  }
  async deleteComment(cmt_no) {
    console.log(cmt_no);
    return Api.Comment(`/Comment/delete/${cmt_no}`)
      .then(Response => {
        console.log(Response);
      })
      .catch(exp => {
        console.log("Error insertComment : " + exp);
      });
  }
}
export default new CommentService();
