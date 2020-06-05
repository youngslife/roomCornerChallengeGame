import Phaser from "phaser";
import BootScene from "./scenes/BootScene";
import PlayScene from "./scenes/PlayScene";
import event from "./events";
function launch({ containerId, store }) {
  const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: "95%",
    height: "84%",
    parent: containerId,
    physics: {
      default: "arcade",
      arcade: {
        gravity: {
          y: 200
        },
        debug: false
      }
    },
    scene: [BootScene, PlayScene]
  });
  game.registry.events = event;
  game.registry.events.store = store;

  return game;
}

export default launch;
export { launch };
