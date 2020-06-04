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
    <div class="row slider">
      <!-- <div
        id="map"
        class="col-9 slider-col"
        v-bind:class="{ pauseMap: isPause }"
      ></div>-->
      <div class="col-9">
        <q-btn label="몬스터가 나타났다!" @click="changeToAttack"></q-btn>
        <Game v-show="!isMonster" />
        <ringfit-attack v-if="isMonster" :AttackCnt="AttackCnt" :player="player" />
      </div>
      <div id="time" class="playtime"></div>
      <!-- <div id="character">
        <img :src="require('../../assets/walking.gif')" />
      </div>-->
      <div class="pause">
        <q-btn flat @click="pause">pause</q-btn>
      </div>
      <div id="right" class="col-2 column">
        <div id="additionalInfo" class="col-5"></div>
        <div class="col-6 self-end">
          <web-cam
            v-if="!isMonster"
            :url="changeUrl"
            :stage="stage"
            :width="window.width"
            :height="window.height"
            @child="jump"
          ></web-cam>
          <squat-cam
            v-if="isMonster"
            :url="changeUrl"
            :stage="stage"
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
import RingfitAttack from "../Ringfit/RingfitAttack.vue";
import Game from "@/components/Game";
import { mapActions, mapState } from "vuex";
import { QOverlay } from "@quasar/quasar-ui-qoverlay";

export default {
  components: {
    SquatCam,
    WebCam,
    QOverlay,
    Game,
    RingfitAttack
  },
  data() {
    return {
      url:
        "https://raw.githubusercontent.com/LeeGeunSeong/tmPoseTest/master/my_model/",
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
      isMonster: false,
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
      // stage: (state) => state.stage,
      // hour: (state) => state.hour,
      // minute: (state) => state.minute,
      // second: (state) => state.second,
    }),
    changeUrl() {
      console.log(this.url);
      console.log(this.isMonster);
      return this.url;
    }
  },
  async mounted() {
    const right = document.getElementById("right");
    this.window.width = right.offsetWidth;
    this.window.height = right.offsetWidth;
    // this.url = "https://raw.githubusercontent.com/LeeGeunSeong/tmPoseTest/master/my_model/"
    await this.getStageByUser(); // 유저 정보로 스테이지 정보 받아오고
    await this.drawBaseMap(); // 기본 맵 불러오고
    this.printPlayTime();
  },
  methods: {
    ...mapActions("game", ["getStage"]),
    async getStageByUser() {
      const params = {
        id: this.$store.state.id
      };
      await this.getStage(params); // axios
    },
    async drawBaseMap() {},
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
    },
    changeToAttack() {
      if (this.isMonster == false) {
        this.url =
          "https://raw.githubusercontent.com/youngslife/fitnessPoseModel/master/new_squat/";
        this.isMonster = true;
      } else if (this.isMonster == true) {
        this.isMonster = false;
        this.url =
          "https://raw.githubusercontent.com/LeeGeunSeong/tmPoseTest/master/my_model/";
      }
    }
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
$shlink: 6.8;
$ratio: 1 / $shlink;
$speed: 7s;

:root {
  --slider-speed: ;
}
// #character {
//   position: absolute;
//   top: 650px;
//   left: 400px;
// }
.slider {
  //   overflow: hidden;

  //   .slider-col {
  //     margin-right: 20px;
  //     width: $img-w * $ratio * 4;
  //     height: $img-h * $ratio;
  //     background-image: url("../../assets/road.png");
  //     background-size: $img-w * 4 * $ratio $img-h * $ratio;
  //     animation: slide $speed linear infinite;
  //   }
  //   .pauseMap {
  //     $speed: 0s;
  //   }
}

// @keyframes slidePause {
//   from {
//     background-position-y: 0;
//   }
//   to {
//     background-position-y: 0;
//   }
// }
// @keyframes slide {
//   from {
//     background-position-y: 0;
//   }
//   to {
//     background-position-y: $img-h * $ratio;
//   }
// }
#additionalInfo {
  background-image: url("../../assets/additionalInfo.png");
  background-size: 100%;
  background-repeat: no-repeat;
  // margin-bottom: 3em;
}

.playtime {
  position: absolute;
  top: 70px;
  left: 60px;
  z-index: 1;
}

.pause {
  position: absolute;
  top: 70px;
  left: 1070px;
  z-index: 1;
}
.my-card {
  width: 100%;
  max-width: 350px;
}
</style>
