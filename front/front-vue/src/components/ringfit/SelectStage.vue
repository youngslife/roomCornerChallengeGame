<template>
  <div id="stage-select" style="width:90%">
    <!-- 게임 처음해보는 유저면 가이드를 보여주고 튜토리얼부터 시작할 수 있게 하자-->
    <template v-if="this.$store.state.ringfit.stageNum === 1">
      <q-carousel
        v-model="slide"
        transition-prev="scale"
        transition-next="scale"
        swipeable
        animated
        control-color="white"
        navigation
        padding
        arrows
        width="95%">

        <q-carousel-slide name="tu1">
          <img src="../../assets/tutorial1.png" style="margin: 0 3vw; height: 100%;" />
        </q-carousel-slide>
        <q-carousel-slide name="tu2">
          <img src="../../assets/tutorial2.png" style="margin: 0 3vw; height: 100%;" />
        </q-carousel-slide>
      </q-carousel>
      <q-btn label="튜토리얼 시작" @click="goToNextPage(0)" style="" />
    </template>
    <template v-else>
      <div style="text-align:center">
        <img :src="require('../../assets/stage_title.png')" />
      </div>
      <div class="row stages">
        <img
          id="stage-btn"
          src="../../assets/stage1_btn.png"
          :class="{'col-5': isOne}"
          @click="goToNextPage(1)"
        />
        <img
          id="stage-btn"
          v-if="!isOne"
          src="../../assets/stage2_btn.png"
          class="col-5"
          @click="goToNextPage(2)"
        />
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
  data() {
    return {
      isOne: this.$store.state.ringfit.stageNum === 2,
      slide: "tu1",
    };
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
  background-size: contain;
  height: 110%;
}
.stages {
  display: flex;
  justify-content: space-around;
}
#stage-btn {
  width: 20vw;
  height: 20vw;
  cursor: pointer;
}
#stage-btn:hover {
  filter: brightness(120%);
}
</style>
