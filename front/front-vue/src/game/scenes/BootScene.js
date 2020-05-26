import { Scene } from "phaser";
// import road from "@/assets/road2.jpg";
// import dude from "@/game/assets/sprite.png";
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
    // this.load.image("tiles", "../assets/tilemaps/tiles/super_mario.png");
    this.load.tilemapTiledJSON("mario", mario);
    // this.load.image("player", "../assets/sprites/phaser-dude.png");
  }

  create() {
    this.scene.start("PlayScene");
  }
}
