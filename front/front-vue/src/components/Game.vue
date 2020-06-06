<template>
  <div :id="containerId" v-if="downloaded" />
  <div class="placeholder" v-else>Loading ...</div>
</template>

<script>
export default {
  name: "Game",
  props: {
    stage: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      downloaded: false,
      gameInstance: null,
      containerId: "game-container"
    };
  },
  async mounted() {
    const game = await import(/* webpackChunkName: "game" */ "@/game/game");
    this.downloaded = true;
    this.$nextTick(() => {
      this.gameInstance = game.launch(this.containerId);
    });
  },
  destroyed() {
    this.gameInstance.destroy(false);
    // if(isClear) this.$store.dispatch("ringfit/sendRes",{
    //    클리어 정보 보내주자
    //})
  }
};
</script>

<style lang="scss" scoped>
.placeholder {
  font-size: 2rem;
  font-family: "Courier New", Courier, monospace;
}
</style>
