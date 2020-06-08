<template>
  <div class="flex flex-center">
    <carousel-3d
      width="700"
      height="700"
      startIndex="0"
      clickable="true"
      perspective="20"
      controlsVisible="true"
      controlsWidth="100"
      controlsHeight="100"
    >
      <slide :index="0">
        <img
          src="https://cdn.flashtalking.com/xre/421/4214758/2776222/image/2776222.gif?434467347"
        />
      </slide>
      <slide :index="1">
        <img src="../assets/mafia.png" />
      </slide>
      <slide :index="2">
        <img src="../assets/ring.png" />
      </slide>
      <slide :index="3">
        <img src="../assets/room.png" />
      </slide>
      <slide :index="4">
        <img src="../assets/tabsonic.png" />
      </slide>
    </carousel-3d>
  </div>
</template>

<style></style>

<script>
import { Carousel3d, Slide } from "vue-carousel-3d";
export default {
  name: "HelloWorld",
  components: {
    Carousel3d,
    Slide
  },
  methods: {}
};
</script>
