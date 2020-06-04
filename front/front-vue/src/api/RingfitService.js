import Api from "./Api";
class RingfitService {
  async getStageByUser(user_no) {
    return Api.get(`/Ringfit/stage/searchAll/${user_no}`)
      .then(Response => {
        console.log(Response);
        return Response;
      })
      .catch(exp => {
        console.log("Error getStageByUser : " + exp);
      });
    },
    async updateStageInfo(stageInfo) {
        console.log(stageInfo)
        return Api.put(
            `/Ringfit/stage/${stageInfo.user_no}`,
            {stageInfo: stageInfo}
        ).then(Response => {
            console.log(Response)
        }).catch(exp => {
            console.log("Error updateStageInfo : " + exp);
        })
    }
}
export default new RingfitService();
