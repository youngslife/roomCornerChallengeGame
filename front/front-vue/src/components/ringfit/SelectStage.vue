<template>
  <div>
    <!-- 게임 처음해보는 유저면 가이드를 보여주고 튜토리얼부터 시작할 수 있게 하자-->
    <template v-if="this.$store.state.ringfit.stageNum === 1">
      <h2>링피트 가이드</h2>
      <h3>blah blah</h3>
      <h4>여기엔 카메라에 얼마나 떨어져야 되는지, 영상 자세랑 같이 하는법 알려주자</h4>
      <q-btn label="튜토리얼 시작" @click="goToNextPage(1)" />
    </template>
    <template v-else>
      <h2>스테이지 선택</h2>
      <h3 v-for="stage in stages" :key="stage" @click="goToNextPage(stage)">stage {{ stage }}</h3>
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
    ...mapMutations({ setStageNum: "ringfit/setStageNum" }),
    goToNextPage(stageNum) {
      this.setStageNum(stageNum + 1);
      this.$emit("update:isStageSelect", false);
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
</style>