import { Scene } from "phaser";
import mario from "@/game/assets/tilemaps/maps/test.json";
import tiles from "@/game/assets/tilemaps/tilesets/platformPack_tilesheet.png";
import bg from "@/game/assets/tilemaps/background.png";
import spike from "@/game/assets/tilemaps/spike.png";
import tile from "@/game/assets/sprites/tile.png";
import player from "@/game/assets/tilemaps/kenney_player.png";
import atlas from "@/game/assets/tilemaps/kenney_player_atlas.json";
export default class BootScene extends Scene {
  constructor() {
    super({ key: "BootScene" });
  }
  // Runs once, loads up assets like images and audio
  preload() {
    this.load.image("bg", bg);
    this.textures.addBase64("spike", spike);
    this.textures.addBase64("coin", tile);
    this.load.atlas("player", player, atlas);
    this.textures.addBase64("tiles", tiles);
    this.load.tilemapTiledJSON("mario", mario);
  }

  create() {
    //stage별로 scene을 다르게 start해주고
    // if(this.events.store.phaser.stage == 0) // 튜토리얼이면
    // this.scene.start("TutorialScene");
    // if(this.events.store.phaser.stage == 1) // stage1이면
    // this.scene.start("Stage1Scene");
    // if(this.events.store.phaser.stage == 2) // stage2면
    // this.scene.start("Stage2Scene");
    this.scene.start("PlayScene");
  }
}
