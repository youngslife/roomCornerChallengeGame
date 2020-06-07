<template>
  <div class="q-pa-md">
    <q-overlay v-model="isPause" z-index="5000">
      <template v-slot:body>
        <div class="fullscreen row justify-center items-center">
          <q-card class="my-card bg-secondary text-white">
            <q-card-section>
              <div class="text-h5">일시정지 화면</div>
              <div class="text-subtitle2">시간만 멈추지 말고 다른것도 멈춰야돼ㅠㅠㅠ</div>
            </q-card-section>
            <q-card-actions>
              <q-btn color="primary" label="exit" @click="pause"></q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </template>
    </q-overlay>
    <div class="row">
      <div class="col-9">
        <h3 v-if="!isStageSelect" class="stage">Stage {{ getStageNum-1 }}</h3>
        <!-- <h4>이번 판 운동 : {{ getMotionName }}</h4> -->
        <!-- <q-btn label="몬스터가 나타났다!" @click="changeToAttack"></q-btn> -->
        <Game v-if="!isStageSelect" v-show="!isMonster && !isClear" />
        <select-stage v-if="isStageSelect" :isStageSelect.sync="isStageSelect" />
        <ringfit-attack v-if="isMonster" :AttackCnt="AttackCnt" :player="player" />
        <ringfit-result v-if="isClear" />
      </div>
      <div id="time" class="playtime"></div>
      <div class="pause" v-if="!isStageSelect">
        <q-btn flat @click="pause">pause</q-btn>
      </div>
      <div id="right" class="col-2 column">
        <div id="additionalInfo" class="col-5"></div>
        <div class="col-6 self-end">
          <web-cam
            v-if="!isMonster"
            :url="changeUrl"
            :width="window.width"
            :height="window.height"
            @child="jump"
          ></web-cam>
          <squat-cam
            v-if="isMonster"
            :url="changeUrl"
            :width="window.width"
            :height="window.height"
            @child="goAttack"
          ></squat-cam>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WebCam from "../../components/WebCam";
import SquatCam from "../../components/SquatCam";
import RingfitAttack from "../../components/ringfit/RingfitAttack.vue";
import RingfitResult from "../../components/ringfit/RingfitResult";
import Game from "@/components/Game";
import selectStage from "@/components/ringfit/SelectStage";
import { mapState, mapGetters } from "vuex";
import { QOverlay } from "@quasar/quasar-ui-qoverlay";

export default {
  components: {
    SquatCam,
    WebCam,
    QOverlay,
    Game,
    selectStage,
    RingfitAttack,
    RingfitResult
  },
  data() {
    return {
      url:
        // "https://raw.githubusercontent.com/LeeGeunSeong/tmPoseTest/master/my_model/",
        "https://raw.githubusercontent.com/youngslife/fitnessPoseModel/master/new_walk/",
      stage: "",
      window: {
        width: 0,
        height: 0
      },
      time: null,
      hour: 0,
      minute: 0,
      second: 0,
      isPause: false,
      isStageSelect: true,
      isPoseSelect: false,
      AttackCnt: 0,
      player: {
        username: "방구석여포",
        hp: 200
      }
    };
  },
  computed: {
    ...mapState({
      // back이랑 통신하고 나면 받아오자
      // stage: state => state.stageNum
      // hour: (state) => state.hour,
      // minute: (state) => state.minute,
      // second: (state) => state.second,
    }),
    ...mapGetters({
      getMotionName: "ringfit/getMotionName",
      getStageNum: "ringfit/getStageNum"
    }),
    changeUrl() {
      // console.log(this.url);
      // console.log(this.isMonster);
      return this.url;
    },
    isMonster() {
      return this.$store.state.phaser.isMeet;
    },
    isClear() {
      return this.$store.state.phaser.isClear;
    }
  },
  async mounted() {
    const right = document.getElementById("right");
    this.window.width = right.offsetWidth;
    this.window.height = right.offsetWidth;
    // this.url = "https://raw.githubusercontent.com/LeeGeunSeong/tmPoseTest/master/my_model/"
    await this.getStageByUser(); // 유저 정보로 스테이지 정보 받아오고
    this.printPlayTime();
    // console.log("아마 vuex", this.motionName);
  },
  methods: {
    async getStageByUser() {
      const params = {
        no: this.$store.state.user.user_no
      };
      await this.$store.dispatch("ringfit/getStageByUser", params);
    },
    printPlayTime() {
      var clock = document.getElementById("time");
      if (this.second++ >= 59) {
        this.minute++;
        this.second -= 60;
      }
      if (this.minute >= 59) {
        this.hour++;
        this.minute -= 60;
      }
      var currentHours = addZeros(this.hour, 2);
      var currentMinute = addZeros(this.minute, 2);
      var currentSeconds = addZeros(this.second, 2);

      clock.innerHTML =
        currentHours === "00"
          ? currentMinute + ":" + currentSeconds
          : currentHours + ":" + currentMinute + ":" + currentSeconds;

      this.time = setTimeout(() => {
        this.printPlayTime();
      }, 1000);
    },
    pause() {
      clearTimeout(this.time);
      var map = document.getElementsByClassName("slider-col")[0];
      console.log(map);
      if (this.isPause) {
        this.printPlayTime();
      }
      this.isPause = !this.isPause;
    },
    jump(status) {
      // const map = document.getElementById("map");
      if (status === "walk") {
        // 걷는 모션
        let arrowRight = new KeyboardEvent("keydown");
        Object.defineProperty(arrowRight, "keyCode", {
          get: () => 39
        });
        document.dispatchEvent(arrowRight);
        // map.style.webkitAnimationPlayState = "running";
      } else if (status === "jump") {
        let arrowUp = new KeyboardEvent("keydown");
        Object.defineProperty(arrowUp, "keyCode", {
          get: () => 38
        });
        document.dispatchEvent(arrowUp);
        // map.style.webkitAnimationPlayState = "running";
        // 뛰는 모션
      } else if (status === "stand") {
        // 멈춰
        // map.style.webkitAnimationPlayState = "paused";
      }
    },
    goAttack(count) {
      this.AttackCnt = count;
    }
    // 이 부분은 isMonster computed에 넣으면 될듯
    // changeToAttack() {
    //   if (this.isMonster == false) {
    //     console.log(1, this.isMonster);
    //     this.url =
    //       "https://raw.githubusercontent.com/youngslife/fitnessPoseModel/master/new_squat/";
    //     this.isMonster = true;
    //     console.log(2, this.isMonster);
    //   } else if (this.isMonster == true) {
    //     console.log(3, this.isMonster);
    //     this.isMonster = false;
    //     this.url =
    //       "https://raw.githubusercontent.com/LeeGeunSeong/tmPoseTest/master/my_model/";
    //     console.log(4, this.isMonster);
    //   }
    // }
  },
  beforeDestroy() {
    clearTimeout(this.time);
  }
};
function addZeros(num, digit) {
  // 자릿수 맞춰주기
  var zero = "";
  num = num.toString();
  if (num.length < digit) {
    for (let i = 0; i < digit - num.length; i++) {
      zero += "0";
    }
  }
  return zero + num;
}
</script>

<style lang="scss" scoped>
$img-w: 2000px;
$img-h: 6000px;
$shrink: 6.8;
$ratio: 1 / $shrink;
$speed: 7s;

:root {
  --slider-speed: ;
}
#additionalInfo {
  background-image: url("../../assets/additionalInfo.png");
  background-size: 100%;
  background-repeat: no-repeat;
}

.playtime {
  position: absolute;
  top: 12.7%;
  left: 62%;
  z-index: 1;
}
.stage {
  position: absolute;
  top: 8%;
  left: 3%;
  z-index: 1;
}
.pause {
  position: absolute;
  top: 12%;
  left: 65%;
  z-index: 1;
}
.my-card {
  width: 100%;
  max-width: 350px;
}
</style>
