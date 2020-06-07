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
          // console.log(prediction.className)
          return prediction.probability > agg.probability ? prediction : agg;
        },
        { probability: 0 }
      );
    }
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
      if (this.bestPrediction.className == "down") {
        if (this.bestPrediction.probability.toFixed(2) == 1.0) {
          if (this.status == "up") {
            this.count++;
            console.log(this.count);
          } else if (this.status == "middle") {
            console.log(" 더 위로 올려주세요");
          }
          this.status = "down";
          return this.count;
        }
      } else if (this.bestPrediction.className == "up") {
        if (this.bestPrediction.probability.toFixed(2) == 1.0) {
          this.status = "up";
        }
      } else if (this.bestPrediction.className == "middle") {
        if (this.bestPrediction.probability.toFixed(2) == 1.0) {
          if (this.status == "down") {
            this.status = "middle";
          }
        }
      }
      return this.count;
    }
  }
};
</script>
