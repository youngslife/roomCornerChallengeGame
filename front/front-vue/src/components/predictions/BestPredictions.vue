<template>
  <div>
    <div>{{ getIdx }}</div>
    <div v-for="prediction in predictions" :key="prediction.className">
      {{ prediction.className }}: {{ prediction.probability.toFixed(2) }}
    </div>
    <!-- {{ bestPrediction.className }}: {{ bestPrediction.probability.toFixed(2) }} -->
    <div id="test">{{ test }}</div>
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
      befAction: "",
      count: 0,
      midCnt: 0
    };
  },
  computed: {
    ...mapGetters({
      getIdx: "ringfit/getIdx"
    }),

    // bestPrediction() {
    //   return this.predictions.reduce(
    //     (agg, prediction) => {
    //       return prediction.probability > agg.probability ? prediction : agg;
    //     },
    //     { probability: 0 }
    //   );
    // },
    test() {
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

      // new_walk
      if (this.predictions.length != 0) {
        if (this.predictions[0].probability > 0.9) {
          /// stop
          return "stnad";
        } else if (
          this.predictions[1].probability > 0.95 ||
          this.predictions[2].probability > 0.95
        ) {
          // right, left
          return "walk";
        } else if (this.predictions[3].probability > 0.95) {
          // up
          return "jump";
        }
        return "stand";
        // return test2;
      }
      return "stand";
    }
  },
  mounted() {
    this.action(0);
  },
  methods: {
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
    action(time) {
      this.startTime.time = Date.now();
      this.startTime.type = this.test;

      this.$emit("child", this.startTime.type);

      setTimeout(() => {
        this.action(time + 100);
      }, 100);
    }
    // test() {
    //   if (this.getIdx === 0) {
    //     // new_squat
    //     if (this.predictions[0].probability > 0.9) {
    //       /// stop
    //       return "stnad";
    //     } else if (
    //       this.predictions[1].probability > 0.95 ||
    //       this.predictions[2].probability > 0.95
    //     ) {
    //       // right, left
    //       return "walk";
    //     } else if (this.predictions[3].probability > 0.95) {
    //       // up
    //       return "jump";
    //     }
    //     return "stand";
    //   } else if (this.getIdx === 1) {
    //     // shoulder_press
    //     console.log("$$$$$$$$$$$$$$$$$$$", this.predictions)
    //     if (this.predictions[0].probability.toFixed(2) == 1.0) {
    //       // down
    //       if (this.status == "up") {
    //         this.count++;
    //         console.log(this.count);
    //       } else if (this.status == "middle") {
    //         console.log("더 위로 올려");
    //       }
    //       this.status = "down";
    //       return this.count;
    //     } else if (this.predictions[1].probability.toFixed(2) == 1.0) {
    //       // middle
    //       if (this.status == "down") {
    //         this.status = "middle";
    //       }
    //     } else if (this.predictions[2].probability.toFixed(2) == 1.0) {
    //       // up
    //       this.status = "up";
    //     }
    //     return this.count;
    //   } else if (this.getIdx === 2) {
    //     // side_lunge
    //     if (this.predictions[0].probability.toFixed(2) == 1.0) {
    //       // middle
    //       if (this.status == "right" || this.status == "left") {
    //         this.count++;
    //         console.log(this.count);
    //       }
    //       this.status = "stand";
    //       return this.count;
    //     } else if (this.predictions[2].probability.toFixed(2) > 0.99) {
    //       // right
    //       if (this.status == "stand") {
    //         this.status = "right";
    //       }
    //     } else if (this.predictions[4].probability.toFixed(2) > 0.99) {
    //       // left
    //       if (this.status == "stand") {
    //         this.status = "left";
    //       }
    //     }
    //     return this.count;
    //   } else if (this.getIdx == 3) {
    //     // new_squat
    //     if (
    //       this.predictions[0].probability.toFixed(2) > 0.97 ||
    //       this.predictions[1].probability.toFixed(2) > 0.97
    //     ) {
    //       // stand , step2
    //       if (this.status == "squat") {
    //         this.count++;
    //         console.log(this.count);
    //       }
    //       this.status = "stand";
    //       return this.count;
    //     } else if (this.predictions[3].probability.toFixed(2) > 0.97) {
    //       if (this.status == "stand") {
    //         this.status = "squat";
    //       }
    //     }
    //     return this.count;
    //   } else if (this.getIdx == 4) {
    //     // side_crunch
    //     if(this.predictions[0].probability.toFixed(2) == 1.00) { // stand
    //         if(this.status == "right" || this.status == "left") {
    //             this.count++;
    //             console.log(this.count);
    //         }
    //         this.status = "stand";
    //         return this.count;
    //     } else if (this.predictions[2].probability.toFixed(2) > 0.99){ // right_exact
    //         if(this.status == "stand"){
    //         this.status = "right";
    //         }
    //     }else if(this.predictions[4].probability.toFixed(2) > 0.98){ // left_exact
    //         if(this.status == "stand"){
    //             this.status = "left";
    //         }
    //     }
    //     return this.count;
    //   } else if (this.getIdx == 5) {
    //     // jumping_jacks
    //     if(this.predictions[0].probability.toFixed(2) == 1.00){ // 0: down
    //         // console.log("down")
    //         if(this.midCnt == 1){
    //             this.count++;
    //             console.log(this.count);
    //             this.midCnt = 0;
    //         }
    //         this.status = "down";
    //     }else if(this.predictions[2].probability.toFixed(2) == 1.00){ // 2: middle
    //         if(this.status == "down"){
    //             this.midCnt++;
    //         }
    //         console.log("midCnt: ", this.midCnt);
    //         this.status = "mid";
    //     }else if(this.predictions[4].probability.toFixed(2) == 1.00){ // 4: up
    //         this.status = "up";
    //     }
    //     return this.count;
    //   }
    //   return "우리가 원하는 범위의 인덱스가 아니야!";
    // }
  }
};
</script>
