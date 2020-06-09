import { Scene } from "phaser";
import tiles from "@/game/assets/tilemaps/tilesets/platformPack_tilesheet.png";
import bg from "@/game/assets/tilemaps/background.png";
import wipe from "@/game/assets/tilemaps/wipe2.png";
import coin from "@/game/assets/sprites/tile.png";
import end from "@/game/assets/sprites/end.png";
import player from "@/game/assets/tilemaps/kenney_player.png";
import atlas from "@/game/assets/tilemaps/kenney_player_atlas.json";
import coinAudio from "@/assets/sound/coin.mp3";
import wipeAudio from "@/assets/sound/wipe.mp3";
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
    this.load.audio("coinAudio", [coinAudio]);
    this.load.audio("wipeAudio", [wipeAudio]);
    this.textures.addBase64("coin", coin);
    this.textures.addBase64("end", end);
    this.load.spritesheet("wipe", wipe, { frameWidth: 160, frameHeight: 142 });
    this.textures.addBase64("tiles", tiles);
    // ↑ bootScene load ↓ 각 scene load
  }

  create() {
    //stage별로 scene을 다르게 start해주고
    if (this.registry.events.store.state.ringfit.stageNum == 1)
      // 튜토리얼이면
      this.scene.start("TutorialScene");
    if (this.registry.events.store.state.ringfit.stageNum == 2)
      // stage1이면
      this.scene.start("Stage1Scene");
    if (this.registry.events.store.state.ringfit.stageNum == 3)
      // stage2면
      this.scene.start("Stage2Scene");
  }
}
