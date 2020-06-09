import { Scene } from "phaser";

let wipe;

export default class WipeScene extends Scene {
  constructor() {
    super({ key: "WipeScene" });
  }
  // Runs once, after all assets in preload are loaded
  create() {
    this.anims.create({
      key: "playWipe",
      frames: this.anims.generateFrameNames("wipe", {
        start: 1,
        end: 28
      }),
      frameRate: 14
    });
    const width = this.game.scale.displaySize.width / 2;
    const height = this.game.scale.displaySize.height / 2;
    wipe = this.physics.add.sprite(width, height, "wipe");
    wipe.body.setAllowGravity(0, 0);
    wipe.setScale(width / 80, height / 70);
    wipe.anims.play("playWipe", true);

    wipe.on("animationcomplete", () => {
      this.registry.events.emit("wipe", false);
      this.registry.events.emit("meetMonster");
      this.scene.resume(this.registry.events.store.state.phaser.scene);
      this.scene.stop();
    });
  }
  // Runs once per frame for the duration of the scene

  update() {}
}
