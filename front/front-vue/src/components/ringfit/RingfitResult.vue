<template>
  <div class="row">
    <div>
      <img :src="image" style="width: 30vw" />
      <br />
      <h3>{{ user.user_name }}</h3>
    </div>
    <div>
      <h1>피트런 결과</h1>
      <div>
        <!-- <h2>시간: {{ resultTime }}</h2> -->
        <hr />
        <h4>PERFECT: {{ this.gameInfo.perfect }}</h4>
        <h4>GREAT: {{ this.gameInfo.great }}</h4>
        <h4>GOOD: {{ this.gameInfo.good }}</h4>
        <h4>BAD: {{ this.gameInfo.bad }}</h4>
        <h4>랭크 {{ this.rank }}</h4>
      </div>
      <q-btn label="스테이지 선택 화면" @click="selectStage" />
      <q-btn v-if="this.$store.state.ringfit.stageNum < 3" label="다음 스테이지로" @click="nextStage" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "RingfitResult",
  props: {
    gameInfo: Object
  },
  data() {
    return {
      score: 0,
      rank: ""
    };
  },
  computed: {
    user() {
      return this.$store.state.user.user;
    },
    image() {
      return (
        "https://k02a3041.p.ssafy.io/uploads/" + this.user.user_profile.img_name
      );
    }
  },
  mounted() {
    this.getInfo();
    this.calcScore();
    this.$store.dispatch("ringfit/gameEnd", {
      ruserinfo_no: this.$store.state.ringfit.ruserInfo_no,
      user_no: 22,
      ruserinfo_iswon: true,
      ruserinfo_golds: this.$store.state.ringfit.coin,
      ruserinfo_gameinfo: {
        rgameinfo_no: this.$store.state.ringfit.rgameInfo_no,
        rgameinfo_level: 1,
        rgameinfo_perfect_num: this.gameInfo.perfect,
        rgameinfo_great_num: this.gameInfo.great,
        rgameinfo_good_num: this.gameInfo.good,
        rgameinfo_miss_num: this.gameInfo.bad,
        rgameinfo_kcal: 100,
        rgameinfo_score: this.score
      }
    });
  },
  methods: {
    ...mapActions({ getUserInfo: "user/getUserInfo" }),
    getInfo() {
      console.log("test");
      this.getUserInfo(this.$store.state.user.user_no);
    },
    selectStage() {
      this.$store.commit(
        "ringfit/setStages",
        this.$store.state.ringfit.stageNum + 1
      );
      this.$emit("update:isStageSelect", true);
    },
    nextStage() {
      this.$store.dispatch("ringfit/gameStart", {
        user_no: this.$store.state.user.user_no,
        stage: this.$store.state.ringfit.stageNum + 1,
        level: 1
      });
    },
    calcScore() {
      this.score =
        (this.gameInfo.perfect * 100 +
          this.gameInfo.great * 80 +
          this.gameInfo.good * 70 +
          this.gameInfo.good * 50) /
        (this.gameInfo.perfect +
          this.gameInfo.great +
          this.gameInfo.good +
          this.gameInfo.bad);
      if (this.score >= 95) {
        this.rank = "S+";
      } else if (this.score >= 90 && this.score < 95) {
        this.rank = "S";
      } else if (this.score >= 85 && this.score < 90) {
        this.rank = "A+";
      } else if (this.score >= 80 && this.score < 85) {
        this.rank = "A";
      } else if (this.score >= 75 && this.score < 80) {
        this.rank = "B+";
      } else if (this.score >= 70 && this.score < 75) {
        this.rank = "B";
      } else if (this.score >= 65 && this.score < 70) {
        this.rank = "C+";
      } else if (this.score >= 60 && this.score < 65) {
        this.rank = "C";
      } else if (this.score >= 55 && this.score < 60) {
        this.rank = "D+";
      } else if (this.score >= 50 && this.score < 55) {
        this.rank = "D";
      } else {
        this.rank = "F";
      }
    }
  }
};
</script>

<style></style>
