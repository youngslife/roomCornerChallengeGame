import { Scene } from "phaser";
import map from "@/game/assets/tilemaps/maps/test.json";
import m from "@/assets/monster_sprites/tutorial/01_ordinary/slime_sprites.png";

let player,
  monster,
  layer,
  coinLayer,
  endLayer,
  end,
  coins,
  self,
  score = 0,
  time = 0;

export default class TutorialScene extends Scene {
  constructor() {
    super({
      key: "TutorialScene"
    });
  }
  preload() {
    this.load.tilemapTiledJSON("map", map);
    this.load.spritesheet("monster", m, {
      frameWidth: 128,
      frameHeight: 128
    });
  }
  // Runs once, after all assets in preload are loaded
  create() {
    self = this;
    this.sound.add("wipeAudio");
    this.sound.add("coinAudio");
    this.cameras.main.setBounds(0, 0, 1920, 100);
    this.physics.world.setBounds(0, 0, 1920);
    const backgroundImage = this.add.image(0, 0, "bg").setOrigin(0, 0);
    backgroundImage.setScale(2, 1);
    this.map = this.make.tilemap({
      key: "map"
    });
    let tileset = this.map.addTilesetImage("test", "tiles");
    layer = this.map.createStaticLayer("test", tileset, 0, 200);
    coinLayer = this.map.getObjectLayer("CoinLayer")["objects"];
    coins = this.physics.add.staticGroup();

    endLayer = this.map.getObjectLayer("EndLayer")["objects"];
    end = this.physics.add.staticGroup();
    endLayer.forEach(el => {
      let obj = end.create(el.x, el.y + 136, "end");
      obj.setOrigin(0);
      obj.body.width = el.width;
      obj.body.height = el.height;
    });

    coinLayer.forEach(el => {
      let obj = coins.create(el.x, el.y + 150, "coin");
      obj.setOrigin(0);
      obj.body.width = el.width;
      obj.body.height = el.height;
    });
    player = this.physics.add.sprite(0, 400, "player");
    player.setCollideWorldBounds(true);

    layer.setCollisionByExclusion(-1, true);
    this.cameras.main.startFollow(player, true); // 캐릭터 center
    this.physics.add.collider(player, layer);
    this.physics.add.overlap(player, coins, this.collectCoin);
    this.physics.add.overlap(player, end, true, this.endGame);
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNames("player", {
        prefix: "robo_player_",
        start: 2,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "idle",
      frames: [
        {
          key: "player",
          frame: "robo_player_0"
        }
      ],
      frameRate: 10
    });
    this.anims.create({
      key: "jump",
      frames: [
        {
          key: "player",
          frame: "robo_player_1"
        }
      ],
      frameRate: 10
    });
    // monster
    monster = this.physics.add.sprite(1600, 400, "monster");
    monster.setSize(0.3);
    monster.setDisplaySize(200, 150);
    monster.setCollideWorldBounds(true);
    this.physics.add.collider(monster, layer);
    this.physics.add.overlap(player, monster, this.meetMonster, null, this);
  }
  // Runs once per frame for the duration of the scene

  update() {
    const cursors = this.input.keyboard.createCursorKeys();
    if (this.registry.events.store.state.ringfit.isPause) {
      this.registry.events.emit("saveScene", "TutorialScene");
      this.scene.launch("PauseScene");
      this.scene.pause();
    }
    document.addEventListener("keydown", function(e) {
      if (e.keyCode === 39) cursors.right.isDown = true;
      else if (e.keyCode === 37) cursors.left.isDown = true;
      else if (e.keyCode === 38) {
        cursors.up.isDown = true;
        cursors.right.isDown = true;
      }
    });
    if (cursors.left.isDown) {
      player.setVelocityX(-200);
      cursors.left.isDown = false;
      if (player.body.onFloor()) player.anims.play("walk", true);
    } else if (cursors.right.isDown) {
      cursors.right.isDown = false;
      player.setVelocityX(200);
      if (player.body.onFloor()) player.anims.play("walk", true);
    } else {
      if (time++ >= 60) {
        player.setVelocityX(0);
        time = 0;
      }
      if (player.body.onFloor()) player.anims.play("walk", true);
    }
    if (player.body.velocity.x > 0) {
      player.setFlipX(false);
    } else if (player.body.velocity.x < 0) {
      player.setFlipX(true);
    }
    if (cursors.up.isDown && player.body.onFloor()) {
      cursors.up.isDown = false;
      player.anims.play("jump", true);
      player.setVelocityY(-250);
    }
  }
  collectCoin(user, coin) {
    coin.destroy(coin.x, coin.y);
    self.sound.add("coinAudio");
    score++;
    self.registry.events.emit("setCoin", score);
    return false;
  }
  meetMonster() {
    self.sound.play("wipeAudio");
    this.registry.events.emit("saveScene", "TutorialScene");
    this.registry.events.emit("wipe", true);
    this.scene.launch("WipeScene");
    this.scene.pause();
    monster.destroy();
  }
  endGame() {
    self.registry.events.emit("setCoin", score);
    self.registry.events.store.state.phaser.isClear = this;
  }
}
