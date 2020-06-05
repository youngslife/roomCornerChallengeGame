<template>
  <div>
    <div ref="webcam"></div>
    <!-- <div>All Prediction</div> -->
    <all-predict :predictions="predictions" :stage="stage"></all-predict>
    <div>Prediction</div>
    <SquatPredict
      :predictions="predictions"
      :stage="stage"
      @child="test"
    >
    </SquatPredict>

  </div>
</template>

<script>
import "@tensorflow/tfjs";
import * as tmPose from "@teachablemachine/pose";
import AllPredict from "./predictions/AllPredictions";
import SquatPredict from "./predictions/SquatPrediction";
export default {
  props: {
    url: {
      type: String,
      required: true,
    },
    stage: {
      type: String,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
  },
  components: {
    AllPredict,
    SquatPredict,
  },
  data() {
    return {
      model: null,
      webcam: null,
      predictions: [],
    };
  },
  async mounted() {
    const modelURL = `${this.url}model.json`;
    const metadataURL = `${this.url}metadata.json`;
    const webcamContainer = this.$refs.webcam;
    const flip = true; // whether to flip the webcam
    // load the model and metadata
    // or files from your local hard drive
    this.model = await tmPose.load(modelURL, metadataURL);
    // Convenience function to setup a webcam
    this.webcam = new tmPose.Webcam(this.width, this.height, flip); // width, height, flip
    await this.webcam.setup(); // request access to the webcam
    await this.webcam.play();
    webcamContainer.appendChild(this.webcam.canvas);
    window.requestAnimationFrame(this.loop);
  },
  methods: {
    async loop() {
      this.webcam.update();
      await this.predict();
      window.requestAnimationFrame(this.loop);
    },
    async predict() {
      const flipHorizontal = false;
      const { pose, posenetOutput } = await this.model.estimatePose(
        this.webcam.canvas,
        flipHorizontal
      );
      // Prediction 2: run input through teachable machine classification model
      const prediction = await this.model.predict(
        posenetOutput,
        flipHorizontal,
        this.model.getTotalClasses()
      );
      const canvas = tmPose.createCanvas(this.width, this.height, true);
      let ctx = canvas.getContext("2d");
      ctx.drawImage(this.webcam.canvas, 0, 0);
      if (pose) {
        const minPartConfidence = 0.5;
        tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
        tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
      }
      // console.log(prediction[0].probability + ", " + prediction[1].probability);
      this.predictions = prediction;
    },
    test(count) {
      this.$emit("child", count);
    },
  },
};
</script>
