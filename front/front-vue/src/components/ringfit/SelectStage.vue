<template>
  <div id="stage-select">
    <!-- 게임 처음해보는 유저면 가이드를 보여주고 튜토리얼부터 시작할 수 있게 하자-->
    <template v-if="this.$store.state.ringfit.stageNum === 1">
      <h2>피트런 가이드</h2>
      <h3>blah blah</h3>
      <h4>
        여기엔 카메라에 얼마나 떨어져야 되는지, 영상 자세랑 같이 하는법 알려주자
      </h4>
      <q-btn label="튜토리얼 시작" @click="goToNextPage(0)" />
    </template>
    <template v-else>
      
      <img src="../../assets/stage_title.png" style="margin-left: auto; margin-right: auto;">
      <div class="row stages">
      <img id="stage-btn" src="../../assets/stage1_btn.png" class="col-5" @click="goToNextPage(1)">
      <img id="stage-btn" src="../../assets/stage2_btn.png" class="col-5" @click="goToNextPage(2)">
      </div>
    </template>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    isStageSelect: Boolean
  },
  computed: {
    stages() {
      return this.$store.state.ringfit.stages;
    }
  },
  methods: {
    ...mapMutations({
      setStageNum: "ringfit/setStageNum",
      setIdx: "ringfit/setIdx"
    }),
    goToNextPage(stageNum) {
      this.setStageNum(stageNum + 1);
      this.$emit("update:isStageSelect", false);

      if (stageNum === 0) {
        // tutorial
        this.setIdx(0);
      } else if (stageNum === 1) {
        // stage 1
        this.setIdx(0);
      } else if (stageNum === 2) {
        // stage 2
        this.setIdx(2);
      }
    }
  },
  destroyed() {
    this.$store.dispatch("ringfit/gameStart", {
      user_no: this.$store.state.user.user_no,
      stage: this.$store.state.ringfit.stageNum,
      level: 1
    });
  }
};
</script>

<style>
#stage-select {
  background-image: url("../../assets/stage_select_bg.png");
  height: 110%;
}
.stages {
  display: flex;
  justify-content: space-around;
}
#stage-btn {
  width: 20vw; height: 20vw;
  cursor: pointer;
}
#stage-btn:hover {
  filter: brightness(120%);
}
</style>
