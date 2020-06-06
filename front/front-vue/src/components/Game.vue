<template>
  <div :id="containerId" v-if="downloaded" />
  <!-- <game-load ref="gameload" v-if="downloaded" :containerId="containerId"></game-load> -->
  <div class="placeholder" v-else>Loading ...</div>
</template>

<script>
// import GameLoad from "../components/GameLoad.vue";

export default {
  name: "Game",
  data() {
    return {
      downloaded: false,
      gameInstance: null,
      containerId: "game-container"
    };
  },
  components: {
    // GameLoad
  },
  async mounted() {
    // await this.launch(this.containerId);
    const game = await import(/* webpackChunkName: "game" */ "@/game/game");
    this.downloaded = true;
    this.$nextTick(() => {
      // this.gameInstance = this.$refs.gameload.launch(this.containerId);
      this.gameInstance = game.launch({
        containerId: this.containerId,
        store: this.$store ? this.$store : null
      });
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
