import { Scene } from "phaser";
// import road from "@/assets/road2.jpg";
// import dude from "@/game/assets/sprite.png";
import map from "@/game/assets/tilemaps/maps/test.json";
import tiles from "@/game/assets/tilemaps/tilesets/platformPack_tilesheet.png";
import bg from "@/game/assets/tilemaps/background.png";
import spike from "@/game/assets/tilemaps/spike.png";
import tile from "@/game/assets/sprites/tile.png";
import end from "@/game/assets/sprites/end.png";
import player from "@/game/assets/tilemaps/kenney_player.png";
import atlas from "@/game/assets/tilemaps/kenney_player_atlas.json";
import monster from "@/game/assets/tilemaps/troll_sprites1.png";
import matlas from "@/game/assets/tilemaps/troll_sprites1_atlas.json";
export default class BootScene extends Scene {
  constructor() {
    super({
      key: "BootScene"
    });
  }
  // Runs once, loads up assets like images and audio
  preload() {
    this.load.image("bg", bg);
    this.load.atlas("player", player, atlas);
    // ↑ bootScene load ↓ 각 scene load
    this.textures.addBase64("spike", spike);
    this.textures.addBase64("coin", tile);
    this.textures.addBase64("end", end);
    this.load.atlas("monster", monster, matlas);
    this.textures.addBase64("tiles", tiles);
    this.load.tilemapTiledJSON("map", map);
  }

  create() {
    //stage별로 scene을 다르게 start해주고
    if (this.registry.events.store.state.ringfit.stageNum == 0)
      // 튜토리얼이면
      this.scene.start("TutorialScene");
    if (this.registry.events.store.state.ringfit.stageNum == 1)
      // stage1이면
      this.scene.start("Stage1Scene");
    if (this.registry.events.store.state.ringfit.stageNum == 2)
      // stage2면
      this.scene.start("Stage2Scene");
  }
}
