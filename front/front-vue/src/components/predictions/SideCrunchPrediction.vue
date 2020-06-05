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
    stage: {
      type: String,
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
      if(this.bestPrediction.className == "stand"){
          if(this.bestPrediction.probability.toFixed(2) == 1.00){
            if(this.status == "right" || this.status == "left"){
              this.count++;
              console.log(this.count);
            }
            this.status = "stand"
            return this.count
          }
      }else if(this.bestPrediction.className == "right_exact"){
        if(this.bestPrediction.probability.toFixed(2) > 0.99){
          if(this.status == "stand"){
            this.status = "right";
          }
        }
      }else if(this.bestPrediction.className == "left_exact"){
        if(this.bestPrediction.probability.toFixed(2) > 0.98){
          if(this.status == "stand"){
            this.status = "left"
          }
        }
      }
      return this.count
    },
  },
};
</script>
