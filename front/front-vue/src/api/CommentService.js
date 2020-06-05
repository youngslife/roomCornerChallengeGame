import Api from "./Api";

class CommentService {
  async getComment(cmt_no) {
    console.log(cmt_no);
    return Api.get(`/Comment/search/${cmt_no}`)
      .then(Response => {
        return Response;
      })
      .catch(exp => {
        console.log("Error getComment : " + exp);
      });
  }
  async insertCmt(Comment) {
    console.log(Comment);
    return Api.post("/Comment/insert", Comment)
      .then(Response => {
        return Response;
      })
      .catch(exp => {
        console.log("Error insertComment : " + exp);
      });
  }
  async updateCmt(Comment) {
    console.log(Comment);
    return Api.put("/Comment/update", Comment)
      .then(Response => {
        console.log(Response);
      })
      .catch(exp => {
        console.log("Error insertComment : " + exp);
      });
  }
  async deleteCmt(cmt_no) {
    console.log(cmt_no);
    return Api.delete(`/Comment/delete/${cmt_no}`)
      .then(Response => {
        console.log(Response);
      })
      .catch(exp => {
        console.log("Error insertComment : " + exp);
      });
  }
}
export default new CommentService();
