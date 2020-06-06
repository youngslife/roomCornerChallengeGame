import Phaser from "phaser";
import BootScene from "./scenes/BootScene";
import TutorialScene from "./scenes/TutorialScene";
import Stage1Scene from "./scenes/Stage1Scene";
import Stage2Scene from "./scenes/Stage2Scene";
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
    scene: [BootScene, TutorialScene, Stage1Scene, Stage2Scene]
    // stage별로 scene 추가해주고
  });
  game.registry.events = event;
  game.registry.events.store = store;

  return game;
}

export default launch;
export { launch };
