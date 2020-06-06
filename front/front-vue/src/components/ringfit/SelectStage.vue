<template>
  <div>
    <h2>스테이지 선택</h2>
    <h3 v-for="(stage, i) in stages" :key="i" @click="goToNextPage(stage.num)">stage {{ stage.num }}</h3>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import router from "@/router";
export default {
  data() {
    return {
      stages: [
        {
          num: 1,
          url: "" // 맵세팅 하기 위한 api가 있는지?
        },
        {
          num: 2,
          url: ""
        }
      ]
    };
  },
  methods: {
    ...mapMutations({ setStageNum: "ringfit/setStageNum" }),
    goToNextPage(stageNum) {
      this.setStageNum(stageNum);

      // 후에 컴포넌트 바꾸는 것으로 한다면 router push 삭제해야 함
      router.push("/temp/SelectMotion");
    }
  }
};
</script>

<style>
</style>