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
    test() {
    //   const test2 =
    //     this.bestPrediction.probability > 0.9
    //       ? this.bestPrediction.className === "Class 2"
    //         ? "jump"
    //         : this.bestPrediction.className === "Class 3"
    //         ? "walk"
    //         : "stand"
    //       : "None";
    //   return test2;
        if(this.bestPrediction.className == "stand" || this.bestPrediction.className == "step2"){
            if(this.bestPrediction.probability == 1.00){
                return "jump"
            }
        } else if (this.bestPrediction.className == "sit"){
            return "walk"
        }
        return "stand"
    },
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
    },
  },
};
</script>
