<template>
  <div></div>
</template>

<script>
import Phaser from "phaser";
// import BootScene from "../game/scenes/BootScene.js";
// import BootScene from "./BootScene.vue";
// import PlayScene from "../game/scenes/PlayScene.js";
import mario from "@/game/assets/tilemaps/maps/test.json";
import tiles from "@/game/assets/tilemaps/tilesets/platformPack_tilesheet.png";
import bg from "@/game/assets/tilemaps/background.png";
import spike from "@/game/assets/tilemaps/spike.png";
import tile from "@/game/assets/sprites/tile.png";
import player from "@/game/assets/tilemaps/kenney_player.png";
import atlas from "@/game/assets/tilemaps/kenney_player_atlas.json";
import monster from "@/game/assets/tilemaps/troll_sprites1.png";
import matlas from "@/game/assets/tilemaps/troll_sprites1_atlas.json";

export default {
  name: "GameLoad",
  // props: {
  //   containerId: String
  // },
  data() {
    return {
      game: null,
      bootScene: null
    };
  },
  methods: {
    launch() {
      if (this.game == null) {
        const self = this;
        this.game = new Phaser.Game({
          type: Phaser.AUTO,
          width: "95%",
          height: "84%",
          antialias: true,
          parent: this.$el,
          // parent: containerId,
          physics: {
            default: "arcade",
            arcade: {
              gravity: { y: 200 },
              debug: false
            }
          },
          // scene: [BootScene, PlayScene]
          scene: {
            preload: function preload() {
              self.preload(this);
            }
            // create: function create() {
            //   self.create(this);
            // }
            // update: function update() {
            //   self.update(this);
            // },
            // render: function render() {
            //   self.render(this);
            // }
          }
        });
      }
      return this.game;
    },
    preload() {
      console.log(this.game);
      this.game.load.image("bg", bg);
      console.log("success");
      this.game.textures.addBase64("spike", spike);
      this.game.textures.addBase64("coin", tile);
      this.game.load.atlas("player", player, atlas);
      this.game.load.atlas("monster", monster, matlas);
      this.game.textures.addBase64("tiles", tiles);
      // this.load.image("tiles", "../assets/tilemaps/tiles/super_mario.png");
      this.game.load.tilemapTiledJSON("mario", mario);
      // this.load.image("player", "../assets/sprites/phaser-dude.png");
    }
  }
};
</script>

<style>
</style>