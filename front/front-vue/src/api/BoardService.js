import Api from "./Api";
class BoardService {
  async getBoardListByType(board) {
    // console.log(board);
    return Api.get(
      `/Board/searchBoardTitle/${board.location}/${board.title}/${board.page_no}`
    )
      .then(Response => {
        // console.log(Response);
        return Response;
      })
      .catch(exp => {
        console.log("Error getBoardListByType : " + exp);
      });
  }
  async getBoardListBySubType(board) {
    // console.log(board);
    return Api.get(
      `/Board/searchBoardSubTitle/${board.location}/${board.title}/${board.subtitle}/${board.page_no}`
    )
      .then(Response => {
        // console.log(Response);
        return Response;
      })
      .catch(exp => {
        console.log("Error getBoardListByType : " + exp);
      });
  }
}
export default new BoardService();
