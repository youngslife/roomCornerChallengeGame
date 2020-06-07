<template>
  <div class="row">
    <div>
      <img :src="user.user_image" style="width: 30vw" />
      <br />
      <h3>{{ user.user_name }}</h3>
    </div>
    <div>
      <h1>링피트 결과</h1>
      <div>
        <h2>시간: {{ resultTime }}</h2>
        <h2>칼로리: {{ calories }}</h2>
        <hr />
        <h4>PERFECT: {{ perfect }}</h4>
        <h4>GREAT: {{ great }}</h4>
        <h4>GOOD: {{ good }}</h4>
        <h4>BAD: {{ bad }}</h4>
      </div>
      <q-btn label="스테이지 선택 화면" @click="selectStage" />
      <q-btn
        v-if="this.$store.state.ringfit.stageNum < 3"
        label="다음 스테이지로"
        @click="nextStage"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "RingfitResult",
  data() {
    return {
      user: {},
      nickname: "nickname",
      userImage: require("../../assets/default_image.jpg"),
      resultTime: "30:00",
      calories: 1000,
      perfect: 20,
      great: 15,
      good: 10,
      bad: 5
    };
  },
  mounted() {
    this.user = this.$store.state.user.user;
    this.$store.dispatch("ringfit/gameEnd", {
      ruserinfo_no: this.$store.state.ringfit.ruserInfo_no,
      user_no: 22,
      ruserinfo_iswon: true,
      ruserinfo_golds: this.$store.state.ringfit.coin,
      ruserinfo_gameinfo: {
        rgameinfo_no: this.$store.state.ringfit.rgameInfo_no,
        rgameinfo_level: 1,
        rgameinfo_perfect_num: 1,
        rgameinfo_great_num: 1,
        rgameinfo_good_num: 1,
        rgameinfo_miss_num: 1,
        rgameinfo_kcal: 100,
        rgameinfo_score: 90
      }
    });
  },
  methods: {
    selectStage() {
      this.$store.commit("setStage", this.$store.state.ringfit.stageNum + 1);
      this.$emit("update:isStageSelect", true);
    },
    nextStage() {
      this.$store.dispatch("ringfit/gameStart", {
        user_no: this.$store.state.user.user_no,
        stage: this.$store.state.ringfit.stageNum + 1,
        level: 1
      });
    }
  }
};
</script>

<style></style>
