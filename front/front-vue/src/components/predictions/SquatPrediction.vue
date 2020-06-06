<template>
  <div>
    {{ bestPrediction.className }}: {{ bestPrediction.probability.toFixed(2) }}
    <div id="test">{{ test() }}</div>
  </div>
</template>

<script>
export default {
  props: {
    predictions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      average: 0,
      startTime: {
        type: "",
        time: 0,
      },
      endTime: {
        type: "",
        time: 0,
      },
      befAction: "",
      count: 0,
    };
  },
  computed: {
    bestPrediction() {

      return this.predictions.reduce(
        (agg, prediction) => {
            // console.log(prediction.className)
          return prediction.probability > agg.probability ? prediction : agg;
        },
        { probability: 0 }
      );
    },
    // test() {
    //     if(this.bestPrediction.className == "stand" || this.bestPrediction.className == "step2"){
    //         if(this.bestPrediction.probability == 1.00){
    //             return "jump"
    //         }
    //     } else if (this.bestPrediction.className == "sit"){
    //         return "walk"
    //     }
    //     return "stand"
    // },

  },
  mounted() {
    this.action(0);
  },
  methods: {
    action(time) {
      if (this.startTime.type !== this.test()) {
        this.startTime.time = Date.now();
        this.startTime.type = this.test();
      }
      if (Date.now() - this.startTime.time >= 1500) {
        this.$emit("child", this.startTime.type);
      }
      setTimeout(() => {
        this.action(time + 100);
      }, 100);
    },
  test() {
        if(this.bestPrediction.className == "stand" || this.bestPrediction.className == "step2"){
            if(this.bestPrediction.probability > 0.97){
              if(this.status == "squat"){
                this.count++;
                console.log(this.count);
              }
              this.status = "stand"
              // console.log(this.status)
                return this.count
            }
        }else if (this.bestPrediction.className == "sit"){
            if(this.bestPrediction.probability > 0.97){
              if(this.status == "stand"){
                this.status = "squat";
                
              }
            }
        }
        return this.count
    },
  },
};
</script>
