import { Scene } from "phaser";

export default class PauseScene extends Scene {
  constructor() {
    super({ key: "PauseScene" });
  }
  // Runs once, after all assets in preload are loaded
  create() {}
  // Runs once per frame for the duration of the scene

  update() {
    if (!this.registry.events.store.state.ringfit.isPause) {
      this.scene.resume(this.registry.events.store.state.phaser.scene);
      this.scene.stop();
    }
  }
}
