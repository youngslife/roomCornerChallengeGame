<template>
  <div>
    <!-- <div v-for="prediction in predictions" :key="prediction.className">
      {{ prediction.className }}: {{ prediction.probability.toFixed(2) }}
    </div> -->
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
  mounted() {
    console.log(this.predictions);
  },
};
</script>
