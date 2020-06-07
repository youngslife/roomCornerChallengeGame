<template>
  <div>
    {{ bestPrediction.className }}: {{ bestPrediction.probability.toFixed(2) }}
    <div id="test">{{ test }}</div>
  </div>
</template>

<script>
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
      count: 0
    };
  },
  computed: {
    bestPrediction() {
      return this.predictions.reduce(
        (agg, prediction) => {
          return prediction.probability > agg.probability ? prediction : agg;
        },
        { probability: 0 }
      );
    },
    test() {
      const test2 =
        this.bestPrediction.probability > 0.9
          ? this.bestPrediction.className === "jump"
            ? "jump"
            : this.bestPrediction.className === "walk"
            ? "walk"
            : "stand"
          : "None";
      return test2;
    }
  },
  mounted() {
    this.action(0);
  },
  methods: {
    action(time) {
      if (this.startTime.type !== this.test) {
        this.startTime.time = Date.now();
        this.startTime.type = this.test;
      }
      if (Date.now() - this.startTime.time >= 1500) {
        this.$emit("child", this.startTime.type);
      }
      setTimeout(() => {
        this.action(time + 100);
      }, 100);
    }
    // test() {
    //     if(this.bestPrediction.className == "stop"){

    //         if(this.bestPrediction.probability > 0.95){
    //           if(this.status == "left"){
    //             this.count++;
    //             console.log(this.count);
    //           }
    //           this.status = "right"
    //           return this.count
    //         }
    //     }else if(this.bestPrediction.className == "class3"){ // 왼쪽
    //       if(this.bestPrediction.probability > 0.98){
    //         this.status = "left";
    //       }
    //     }
    //     // this.status = "stop"
    //     // else if(this.bestPrediction.className == "class2"){ // stop
    //     //   if(this.bestPrediction.probability == 1.00){
    //     //       this.status = "stop"
    //     //   }

    //     return this.count

    //   },
  }
};
</script>
