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
      befAction: ""
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
      // const test2 =
      //   this.bestPrediction.probability > 0.9
      //     ? this.bestPrediction.className === "Class 2"
      //       ? "jump"
      //       : this.bestPrediction.className === "Class 3"
      //       ? "walk"
      //       : "stand"
      //     : "None";
      const test2 =
        this.bestPrediction.probability > 0.9
          ? this.bestPrediction.className === "up"
            ? "jump"
            : this.bestPrediction.className === "right"
            ? "walk"
            : this.bestPrediction.className === "left"
            ? "walk"
            : "stand"
          : "stand";
      return test2;
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
  }
};
</script>
