<template>
  <div>
    <!-- <div>{{ getIdx }}</div> -->
    <div v-for="prediction in predictions" :key="prediction.className">
      {{ prediction.className }}: {{ prediction.probability.toFixed(2) }}
    </div>
    <!-- {{ bestPrediction.className }}: {{ bestPrediction.probability.toFixed(2) }} -->
    <div id="test">{{ test() }}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    predictions: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      average: 0,
      startTime: {
        type: "",
        time: 0
      },
      endTime: {
        type: "",
        time: 0
      },
      befAction: 0,
      time: 0,
      count: 0,
      midCnt: 0,
      avg: 0,
      prob: 0,
      isAction: false,
      pose: "",
      accuracy: ""
    };
  },
  computed: {
    ...mapGetters({
      getIdx: "ringfit/getIdx"
    })
    // bestPrediction() {
    //   return this.predictions.reduce(
    //     (agg, prediction) => {
    //       return prediction.probability > agg.probability ? prediction : agg;
    //     },
    //     { probability: 0 }
    //   );
    // },
    // test() {
    // const test2 =
    //   this.bestPrediction.probability > 0.9
    //     ? this.bestPrediction.className === "Class 2"
    //       ? "jump"
    //       : this.bestPrediction.className === "Class 3"
    //       ? "walk"
    //       : "stand"
    //     : "None";

    // const test2 =
    //   this.bestPrediction.probability > 0.9
    //     ? this.bestPrediction.className === "up"
    //       ? "jump"
    //       : this.bestPrediction.className === "right"
    //       ? "walk"
    //       : this.bestPrediction.className === "left"
    //       ? "walk"
    //       : "stand"
    //     : "stand";
    // return test2;
    // }
  },
  mounted() {},
  methods: {
    action(time) {
      this.time = time;
      if (time == 250) {
        this.avg = this.befAction / 25;

        this.befAction = 0;
        if (this.avg > 0.95) {
          this.count++;
          this.accuracy = "perfect";
          // this.$emit("child", { type: "perfect", cnt: this.count });
        } else if (this.avg > 0.87) {
          this.count++;
          this.accuracy = "great";
          // this.$emit("child", { type: "great", cnt: this.count });
        } else if (this.avg > 0.8) {
          this.count++;
          this.accuracy = "good";
          // this.$emit("child", { type: "good", cnt: this.count });
        } else this.accuracy = "bad";
        this.isAction = false;
        return;
      } else {
        this.befAction += this.prob;
      }

      // if (this.startTime.type !== this.test) {
      //   this.startTime.time = Date.now();
      //   this.startTime.type = this.test;
      // }
      // if (Date.now() - this.startTime.time >= 1500) {
      //   if (this.startTime.type === "perfect") {
      //     this.$emit("child", this.count);
      //   } else {
      //     this.$emit("child", this.startTime.type);
      //   }
      // }
      setTimeout(() => {
        this.action(time + 10);
      }, 10);
    },
    // action(time) {
    //   if (this.startTime.type !== this.test) {
    //     this.startTime.time = Date.now();
    //     this.startTime.type = this.test;
    //   }
    //   if (Date.now() - this.startTime.time >= 1500) {
    //     this.$emit("child", this.startTime.type);
    //   }
    //   setTimeout(() => {
    //     this.action(time + 100);
    //   }, 100);
    // },
    //시간 지연 뺀 코드(걷는 반응이 느려서..)
    // action(time) {
    //   this.startTime.time = Date.now();
    //   this.startTime.type = this.test();

    //   this.$emit("child", this.startTime.type);

    //   setTimeout(() => {
    //     this.action(time + 100);
    //   }, 100);
    // },
    test() {
      if (this.predictions.length != 0) {
        // if (this.getIdx === 0) {
        // new_walk
        //   if (this.predictions[0].probability > 0.90) {
        //     /// stop
        //     return "stand";
        //   } else if (
        //     this.predictions[1].probability > 0.95 ||
        //     this.predictions[2].probability > 0.95
        //   ) {
        //     // right, left
        //     return "walk";
        //   } else if (this.predictions[3].probability > 0.95) {
        //     // up
        //     return "jump";
        //   }
        //   return "stand";
        // } else
        // 1번 동작 shoulder_press
        if (this.getIdx === 1) {
          // shoulder_press
          if (this.predictions[0].probability.toFixed(2) > 0.8) {
            // down, action 시작
            if (this.pose == "up") {
              if (this.isAction === false) {
                this.isAction = true;
                this.prob = this.predictions[0].probability;
                this.action(0);
              }
              // this.count++;
              this.pose = "down";
              return this.predictions[0].probability;
            } else if (this.pose == "middle") {
              if (this.isAction === true) {
                this.$emit("child", { type: "bad", cnt: this.count });
                this.isAction = false;
              }
              // this.$emit("child", {type: "bad", cnt: this.count})
            }
            this.pose = "down";
            // return {type: "pass", prob: this.predictions[0].probability.toFixed(2)}
          } else if (this.predictions[1].probability.toFixed(2) == 1.0) {
            // middle
            if (this.pose == "down") {
              this.pose = "middle";
            }
          } else if (this.predictions[2].probability.toFixed(2) == 1.0) {
            // up
            this.pose = "up";
            if (this.time < 250 && this.isAction) {
              this.$emit("child", { type: "bad", cnt: this.count });
              this.isAction = false;
              this.time = 0;
            } else if (this.time == 250) {
              this.$emit("child", { type: this.accuracy, cnt: this.count });
              this.time = 0;
            }
          }
          return this.predictions[0].probability;
          // 2번 동작 side_lunge
        } else if (this.getIdx === 2) {
          // side_lunge
          if (this.predictions[0].probability.toFixed(2) > 0.95) {
            // middle
            if (this.pose == "right" || this.pose == "left") {
              if (this.time < 250 && this.isAction) {
                this.$emit("child", { type: "bad", cnt: this.count });
                this.isAction = false;
                this.time = 0;
              } else if (this.time == 250) {
                this.$emit("child", { type: this.accuracy, cnt: this.count });
                this.time = 0;
              }
              // this.count++;
              // console.log(this.count);
            }
            // console.log("이전 자세가 정확치 않아요");
            // this.$emit("child", {type: "bad", cnt: this.count });

            this.pose = "stand";
            // return this.count;
          } else if (this.predictions[2].probability.toFixed(2) > 0.8) {
            // right, action 시작
            if (this.pose == "stand") {
              if (this.isAction === false) {
                this.isAction = true;
                this.prob = this.predictions[2].probability;
                this.action(0);
              }
              this.pose = "right";
              return this.predictions[2].probability;
            }
          } else if (this.predictions[4].probability.toFixed(2) > 0.8) {
            // left, action 시작
            if (this.pose == "stand") {
              if (this.isAction === false) {
                this.isAction = true;
                this.prob = this.predictions[4].probability;
                this.action(0);
              }
              this.pose = "left";
              return this.predictions[4].probability;
            }
          }
          if (this.pose === "right") {
            return this.predictions[2].probability;
          } else {
            return this.predictions[4].probability;
          }
          // return this.count;
          // 동작 3, Side_Crunch
        } else if (this.getIdx == 3) {
          // 3. side_crunch
          if (this.predictions[0].probability.toFixed(2) > 0.9) {
            // stand
            if (this.pose == "right" || this.pose == "left") {
              if (this.time < 250 && this.isAction) {
                this.$emit("child", { type: "bad", cnt: this.count });
                this.isAction = false;
                this.time = 0;
              } else if (this.time == 250) {
                this.$emit("child", { type: this.accuracy, cnt: this.count });
                this.time = 0;
              }
              // this.count++;
            }
            // else {
            //   this.$emit("child", {type: "bad", cnt: this.count });
            //   this.time = 0;
            // }
            this.pose = "stand";
            //   if (this.predictions[2].probability > this.predictions[4].probability){
            //   return this.predictions[2].probability
            // } else {
            //   return this.predictions[4].probability
            // }
            // return this.count;
          } else if (this.predictions[2].probability.toFixed(2) > 0.8) {
            // right_exact
            if (this.pose == "stand") {
              if (this.isAction === false) {
                this.isAction = true;
                this.prob = this.predictions[2].probability;
                this.action(0);
              }
              this.pose = "right";
              return this.predictions[2].probability;
            }
          } else if (this.predictions[4].probability.toFixed(2) > 0.8) {
            // left_exact
            if (this.pose == "stand") {
              if (this.isAction === false) {
                this.isAction = true;
                console.log("Start Action Left");
                this.prob = this.predictions[4].probability;
                this.action(0);
              }
              this.pose = "left";
              return this.predictions[4].probability;
            }
            // this.pose = "left";
          }
          // return this.count;
          if (this.pose === "right") {
            return this.predictions[2].probability;
          } else {
            return this.predictions[4].probability;
          }

          // 4번 동작 new_squat
        } else if (this.getIdx == 4) {
          // 4. new_squat
          if (
            this.predictions[0].probability.toFixed(2) > 0.97 ||
            this.predictions[1].probability.toFixed(2) > 0.97
          ) {
            // stand & step2
            if (this.pose == "squat") {
              if (this.time < 250 && this.isAction) {
                this.$emit("child", { type: "bad", cnt: this.count });
                this.isAction = false;
                this.time = 0;
              } else {
                this.$emit("child", { type: this.accuracy, cnt: this.count });
                this.time = 0;
              }
              // this.count++;
              // console.log(this.count);
            }
            this.pose = "stand";
            // return this.count;
          } else if (this.predictions[3].probability.toFixed(2) > 0.8) {
            // squat
            if (this.pose == "stand") {
              if (this.isAction === false) {
                this.isAction = true;
                this.prob = this.predictions[3].probability;
                this.action(0);
              }
              this.pose = "squat";
              return this.predictions[3].probability;
            } else {
              if (this.isAction === true) {
                this.$emit("child", { type: "bad", cnt: this.count });
                this.isAction = false;
              }
            }
            this.pose = "squat";
          }
          return this.predictions[3].probability;
          // return this.count;
          // 동작 5: Jumping Jacks
        } else if (this.getIdx == 5) {
          // jumping_jacks
          if (this.predictions[0].probability.toFixed(2) > 0.85) {
            // 0: down
            // console.log("down")
            if (this.midCnt == 1) {
              if (this.pose === "bad" || this.pose === "mid") {
                this.pose = "bad";
              } else {
                this.count++;
              }
              this.$emit("child", { type: this.pose, cnt: this.count });
              this.midCnt = 0;
              this.$emit("child", { type: this.pose, cnt: this.count });
            }
            this.pose = "down";
          } else if (this.predictions[2].probability.toFixed(2) == 1.0) {
            // 2: middle
            if (this.pose == "down") {
              this.midCnt++;
            }
            this.pose = "mid";
          } else if (this.predictions[4].probability.toFixed(2) > 0.96) {
            // 4: up
            // this.pose = "up";
            if (this.predictions[4].probability.toFixed(2) > 0.98) {
              this.pose = "perfect";
            } else if (this.predictions[4].probability.toFixed(2) > 0.95) {
              this.pose = "great";
            } else if (this.predictions[4].probability.toFixed(2) > 0.9) {
              this.pose = "good";
            } else {
              this.pose = "bad";
            }
          }
          // return this.count;
        }
        // return "우리가 원하는 범위의 인덱스가 아니야!";
        // return ;
      }
      // return;
    },
    destroyed() {
      this.accuracy = "";
    }
  }
};
</script>
