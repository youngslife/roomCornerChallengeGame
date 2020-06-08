<template>
  <div>
    <div>{{ getIdx }}</div>
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
      count: 0,
      midCnt: 0,
      avg: 0,
      prob: 0,
      isAction: false
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
  mounted() {
    
  },
  methods: {
    action(time) {
      // console.log("testtttttttttttt", this.test())

      if (time == 2000){
        console.log("summmmmmmmmmm", this.befAction)
        this.avg = this.befAction / 20
        this.befAction = 0
        console.log("avgggggggggggg", this.avg)
        
        console.log("카운트증가", this.count)
        if (this.avg > 0.99){
          this.count++;
          this.$emit("child", {type: "perfect", cnt: this.count})
        }else if(this.avg > 0.95){
          this.count++;
          this.$emit("child", {type: "great", cnt: this.count})
        }else if(this.avg > 0.90){
          this.count++;
          this.$emit("child", {type: "good", cnt: this.count})
        }else {
          this.$emit("child", {type: "bad", cnt: this.count})
        }
        this.isAction = false;
        return
      } else {
        console.log(this.test(), "!!!!!!!!!!!!!")
        if (this.test()){
          this.prop = this.test();
        this.befAction += this.prop;
        }
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
        this.action(time + 100);
      }, 100);
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
      
      if(this.predictions.length != 0){
      if (this.getIdx === 0) {
        // new_walk
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

      } else if (this.getIdx === 1) {
        // shoulder_press
        // console.log(typeof(this.predictions[0].probability))
        if (this.predictions[0].probability.toFixed(2) > 0.85) {
          // down
          if (this.status == "up") {
            if(this.isAction === false){
              this.isAction = true;
              console.log("Start Action")
              this.action(0);
            }
            // this.count++;
            // console.log(this.count);
            this.status = "down";
            return this.predictions[0].probability
          } else if (this.status == "middle") {
            console.log("더 위로 올려");
            // this.$emit("child", {type: "bad", cnt: this.count})
          }
          this.status = "down";
          // return {type: "pass", prob: this.predictions[0].probability.toFixed(2)}
        } else if (this.predictions[1].probability.toFixed(2) == 1.0) {
          // middle
          if (this.status == "down") {
            this.status = "middle";
          }
        } else if (this.predictions[2].probability.toFixed(2) == 1.0) {
          // up
          this.status = "up";
        }
        return this.predictions[0].probability;
        }
      }
      // } else if (this.getIdx === 2) {
      //   // side_lunge
      //   if (this.predictions[0].probability.toFixed(2) == 1.0) {
      //     // middle
      //     if (this.status == "right" || this.status == "left") {
      //       this.count++;
      //       console.log(this.count);
      //     }
      //     this.status = "stand";
      //     return this.count;
      //   } else if (this.predictions[2].probability.toFixed(2) > 0.99) {
      //     // right
      //     if (this.status == "stand") {
      //       this.status = "right";
      //     }
      //   } else if (this.predictions[4].probability.toFixed(2) > 0.99) {
      //     // left
      //     if (this.status == "stand") {
      //       this.status = "left";
      //     }
      //   }
      //   return this.count;
      // } else if (this.getIdx == 3) {
      //   // new_squat
      //   if (
      //     this.predictions[0].probability.toFixed(2) > 0.97 ||
      //     this.predictions[1].probability.toFixed(2) > 0.97
      //   ) {
      //     // stand , step2
      //     if (this.status == "squat") {
      //       this.count++;
      //       console.log(this.count);
      //     }
      //     this.status = "stand";
      //     return this.count;
      //   } else if (this.predictions[3].probability.toFixed(2) > 0.97) {
      //     if (this.status == "stand") {
      //       this.status = "squat";
      //     }
      //   }
      //   return this.count;
      // } else if (this.getIdx == 4) {
      //   // side_crunch
      //   if (this.predictions[0].probability.toFixed(2) == 1.0) {
      //     // stand
      //     if (this.status == "right" || this.status == "left") {
      //       this.count++;
      //       console.log(this.count);
      //     }
      //     this.status = "stand";
      //     return this.count;
      //   } else if (this.predictions[2].probability.toFixed(2) > 0.99) {
      //     // right_exact
      //     if (this.status == "stand") {
      //       this.status = "right";
      //     }
      //   } else if (this.predictions[4].probability.toFixed(2) > 0.98) {
      //     // left_exact
      //     if (this.status == "stand") {
      //       this.status = "left";
      //     }
      //   }
      //   return this.count;
      // } else if (this.getIdx == 5) {
      //   // jumping_jacks
      //   if (this.predictions[0].probability.toFixed(2) == 1.0) {
      //     // 0: down
      //     // console.log("down")
      //     if (this.midCnt == 1) {
      //       this.count++;
      //       console.log(this.count);
      //       this.midCnt = 0;
      //     }
      //     this.status = "down";
      //   } else if (this.predictions[2].probability.toFixed(2) == 1.0) {
      //     // 2: middle
      //     if (this.status == "down") {
      //       this.midCnt++;
      //     }
      //     console.log("midCnt: ", this.midCnt);
      //     this.status = "mid";
      //   } else if (this.predictions[4].probability.toFixed(2) == 1.0) {
      //     // 4: up
      //     this.status = "up";
      //   }
      //   return this.count;
      // }
      // return "우리가 원하는 범위의 인덱스가 아니야!";
    }
  }
};
</script>
