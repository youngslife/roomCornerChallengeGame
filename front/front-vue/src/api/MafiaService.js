import Api from "./FunctionsApi";

class MafiaService {
  createRoom(roomInfo) {
    return Api.post("/createRoom", roomInfo)
      .then(Response => {
        return Response.data;
      })
      .catch(err => {
        console.error(err);
      });
  }
  setNickname(userInfo) {
    console.log(userInfo);
    return Api.post("/setNickname", userInfo)
      .then(Response => {
        console.log(Response.data);
        return Response.data;
      })
      .catch(err => {
        console.error(err);
      });
  }
  joinRoom(info) {
    return Api.post("/joinRoom", info);
  }
}

export default new MafiaService();
