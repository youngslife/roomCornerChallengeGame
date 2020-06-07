import { Scene } from "phaser";
import map from "@/game/assets/tilemaps/maps/test.json";
import m from "@/game/assets/tilemaps/troll_sprites1.png";
import matlas from "@/game/assets/tilemaps/troll_sprites1_atlas.json";
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
    this.load.atlas("monster", m, matlas);
  }
  // Runs once, after all assets in preload are loaded
  create() {
    self = this;
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
      // obj.setScale(el.width / 16, el.height / 16);
      obj.setOrigin(0);
      obj.body.width = el.width;
      obj.body.height = el.height;
    });

    coinLayer.forEach(el => {
      let obj = coins.create(el.x, el.y + 150, "coin");
      // obj.setScale(el.width / 16, el.height / 16);
      obj.setOrigin(0);
      obj.body.width = el.width;
      obj.body.height = el.height;
    });
    player = this.physics.add.sprite(0, 400, "player");
    // player.setBounce(0.1);
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
    // this.cameras.main.setZoom(2);
    this.anims.create({
      key: "attack",
      frames: this.anims.generateFrameNames("monster", {
        prefix: "ATTAK_",
        start: 1,
        end: 2
      }),
      frameRate: 10,
      repeat: -1
    });
    // monster
    monster = this.physics.add.sprite(1600, 400, "monster").play("attack");
    monster.setSize(0.3);
    monster.setDisplaySize(-250, 200);
    monster.setCollideWorldBounds(true);
    this.physics.add.collider(monster, layer);
    this.physics.add.overlap(player, monster, this.meetMonster, null, this);
  }
  // Runs once per frame for the duration of the scene

  update() {
    const cursors = this.input.keyboard.createCursorKeys();
    if (this.registry.events.store.ringfit.isPause) {
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
    score++;
    return false;
  }
  // meetMonster 마지막 몬스터랑 전투한 다음에 or
  // user hp가 < 0 이면
  // destroy or clear? 해주고
  // meetMonster() {
  //   this.registry.events.emit("saveScene", "TutorialScene");
  //   this.scene.launch("WipeScene");
  //   this.scene.pause();
  //   // this.registry.events.emit("meetMonster");
  //   monster.destroy();
  // }
  endGame() {
    // game 끝내고 백으로 result 보내주자
    // isClear 정보도 보내주고
    self.registry.events.emit("setCoin", score);
    self.registry.events.store.state.phaser.isClear = this;
    // end.destroy(end.x, end.y);
    // self.registry.events.store.dispatch(
    //   "ringfit/gameEnd" // 이부분에 백에 넘겨줄 데이터 입력해야함
    // );
  }
}
