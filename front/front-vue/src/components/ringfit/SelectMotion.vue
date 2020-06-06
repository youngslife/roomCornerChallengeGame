<template>
  <div>
    <h2>자세 선택</h2>
    <h3 v-for="(motion, i) in motions" :key="i" @click="goToNextPage(motion.name)">{{ motion.name }}</h3>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import router from "@/router";
export default {
  data() {
    return {
      motions: [
        {
          name: "스쿼트",
          image: "" // 나중에 이미지 찾아서 넣고 사용하면 될 듯
        },
        {
          name: "사이드 런지",
          image: ""
        },
        {
          name: "숄더 프레스",
          image: ""
        }
      ]
    };
  },
  methods: {
    ...mapMutations({ setMotionName: "ringfit/setMotionName" }),
    goToNextPage(motionName) {
      this.setMotionName(motionName);
      console.log("ok");

      // 여기도 후에 컴포넌트 바꾸는 것으로 한다면 router push 필요 x
      router.push("/game/RingFit");
    }
  }
};
</script>

<style>
</style>