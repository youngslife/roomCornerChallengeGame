import RingfitService from "../../api/RingfitService";

const state = {
  stageNum: 0,
  motionName: "",
  ruserInfo_no: 0,
  rgameInfo_no: 0,
  stages: []
};

const getters = {
  getStageNum: state => state.stageNum,
  getMotionName: state => state.motionName
};

const actions = {
  getStageByUser: (store, payLoad) => {
    RingfitService.getStageByUser(payLoad.no).then(Response => {
      const stage = Response.data.data;
      console.log(stage.message);
      let stNum;
      if (stage.message === "클리어 전적이 없습니다.") stNum = 1;
      else stNum = stage.record.rstage_no + 1;
      console.log(stNum);
      store.commit("setStageNum", stNum);
      store.commit("setStages", stNum);
    });
  },
  gameStart: (store, payLoad) => {
    RingfitService.gameStart(payLoad).then(Response => {
      console.log(Response.data.data.stageInfo);
      store.commit(
        "setUserInfo_no",
        Response.data.data.stageInfo.rstage_usergameinfo[0].ruserinfo_no
      );
      store.commit(
        "setGameInfo_no",
        Response.data.data.stageInfo.rstage_usergameinfo[0].ruserinfo_gameinfo
          .rgameinfo_no
      );
    });
  },
  gameEnd: (store, payLoad) => {
    RingfitService.gameEnd(payLoad);
  }
};
const mutations = {
  setStageNum: (state, payload) => {
    state.stageNum = payload;
  },
  setMotionName: (state, payload) => {
    state.motionName = payload;
  },
  setUserInfo_no: (state, payload) => {
    state.ruserInfo_no = payload;
  },
  setGameInfo_no: (state, payload) => {
    state.rgameInfo_no = payload;
  },
  setStages: (state, payload) => {
    for (let i = 1; i < payload; i++) state.stages.push(i);
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
