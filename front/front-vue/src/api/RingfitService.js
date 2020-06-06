import Api from "./Api";
class RingfitService {
  async getStageByUser(user_no) {
    console.log(user_no);
    return Api.get(`/Ringfit/stage/searchAll/${user_no}`)
      .then(Response => {
        console.log(Response);
        return Response;
      })
      .catch(exp => {
        console.log("Error getStageByUser : " + exp);
      });
  }
  async gameStart(stageInfo) {
    console.log(stageInfo);
    return Api.post("/Ringfit/stage/gameStart", {
      user_no: stageInfo.user_no,
      rstage_no: stageInfo.stage
      // rgameinfo_level: stageInfo.level // 이걸 어디에쓰지
    })
      .then(Response => {
        console.log(Response);
      })
      .catch(exp => {
        console.log("Error gameStart : " + exp);
      });
  }
  async gameEnd(stageInfo) {
    console.log(stageInfo); // 여기엔 clear했는지, 퍼펙트 그레이트 등등
    // kcal, score, gold,
    return Api.post("/Ringfit/stage/gameEnd", stageInfo)
      .then(Response => {
        console.log(Response);
      })
      .catch(exp => {
        console.log("Error gameEnd" + exp);
      });
  }
}
export default new RingfitService();
