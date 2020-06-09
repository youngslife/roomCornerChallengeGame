import Api from "./Api";

class CommentService {
  async getComment(cmt_no) {
    return Api.get(`/Comment/search/${cmt_no}`)
      .then(Response => {
        return Response;
      })
      .catch(exp => {
        console.log("Error getComment : " + exp);
      });
  }
  async insertCmt(Comment) {
    return Api.post("/Comment/insert", Comment)
      .then(Response => {
        return Response;
      })
      .catch(exp => {
        console.log("Error insertComment : " + exp);
      });
  }
  async updateCmt(Comment) {
    return Api.put("/Comment/update", Comment)
      .then(() => {
        // console.log(Response);
      })
      .catch(exp => {
        console.log("Error insertComment : " + exp);
      });
  }
  async deleteCmt(cmt_no) {
    return Api.delete(`/Comment/delete/${cmt_no}`)
      .then(() => {
        // console.log(Response);
      })
      .catch(exp => {
        console.log("Error insertComment : " + exp);
      });
  }
}
export default new CommentService();
