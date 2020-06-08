<template>
  <div>
    <!-- 게임 처음해보는 유저면 가이드를 보여주고 튜토리얼부터 시작할 수 있게 하자-->
    <template v-if="this.$store.state.ringfit.stageNum === 0">
      <h2>링피트 가이드</h2>
      <h3>blah blah</h3>
      <h4>
        여기엔 카메라에 얼마나 떨어져야 되는지, 영상 자세랑 같이 하는법 알려주자
      </h4>
      <q-btn label="튜토리얼 시작" @click="goToNextPage(1)" />
    </template>
    <template v-else>
      <h2>스테이지 선택</h2>
      <h3
        v-for="(stage, i) in stages"
        :key="i"
        @click="goToNextPage(stage.num)"
      >
        stage {{ stage.num }}
      </h3>
    </template>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: {
    isStageSelect: Boolean
  },
  data() {
    return {
      stages: [
        // {
        //   num: 1,
        //   url: "" // 맵세팅 하기 위한 api가 있는지?
        // },
        // {
        //   num: 2,
        //   url: ""
        // }
      ]
    };
  },
  mounted() {
    this.stages = [];
    for (let i = 0; i < this.$store.state.ringfit.stageNum; i++) {
      this.stages[i].num = i + 1;
    }
  },
  methods: {
    ...mapMutations({
      setStageNum: "ringfit/setStageNum",
      setIdx: "ringfit/setIdx"
    }),
    goToNextPage(stageNum) {
      this.setStageNum(stageNum);
      this.$emit("update:isStageSelect", false);

      if (stageNum === 1) {
        // tutorial
        this.setIdx(0);
      } else if (stageNum === 2) {
        // stage 1
        this.setIdx(1);
      } else if (stageNum === 3) {
        // stage 2
        this.setIdx(3);
      }
    }
  },
  destroyed() {
    console.log(this.$store.state);
    this.$store.dispatch("ringfit/gameStart", {
      user_no: this.$store.state.user_no,
      stage: this.$store.state.ringfit.stageNum,
      level: 0
    });
  }
};
</script>

<style></style>
