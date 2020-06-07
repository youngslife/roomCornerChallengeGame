<template>
  <div class="row">
    <div>
      <img :src="userImage" style="width: 30vw" />
      <br />
      <h3>{{ nickname }}</h3>
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
      <q-btn label="한판 더?" />
    </div>
  </div>
</template>

<script>
export default {
  name: "RingfitResult",
  data() {
    return {
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
    this.$store.dispatch("ringfit/gameEnd", {
      ruserinfo_no: this.$store.state.ringfit.ruserInfo_no,
      user_no: 22,
      ruserinfo_iswon: true,
      ruserinfo_golds: 1,
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
  }
};
</script>

<style>
</style>