<template>
  <div>
    <div style="text-align: center;">
      <h3>
        <!--{{ monster.name }}-->
        <h3>{{ cnt }}</h3>
        <h3>{{ attackType }}</h3>
        hp : {{ mnowHp }}
      </h3>
      <div>{{ cnt }} {{attackType}}</div>
      <!-- <div :class={}>  -->
      <img :src="chnImage" class="img" />
    </div>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "RingfitAttack",
  props: {
    AttackCnt: Number,
    attackType: String
  },
  data() {
    return {
      monsterArr: [
        [
          {
            name: "0",
            hp: 100,
            image: require("../../assets/monster_sprites/tutorial/01_ordinary/idle.gif"),
            hurt: require("../../assets/monster_sprites/tutorial/01_ordinary/hurt.gif"),
            dead: require("../../assets/monster_sprites/tutorial/01_ordinary/dead.gif")
          }
        ],
        [
          [
            {
              name: "1-1",
              hp: 100,
              image: require("../../assets/monster_sprites/stage1/01_ordinary/idle.gif"),
              hurt: require("../../assets/monster_sprites/stage1/01_ordinary/hurt.gif"),
              dead: require("../../assets/monster_sprites/stage1/01_ordinary/dead.gif")
            }
          ],
          [
            {
              name: "1-2",
              hp: 100,
              image: require("../../assets/monster_sprites/stage1/02_middleboss/idle.gif"),
              hurt: require("../../assets/monster_sprites/stage1/02_middleboss/hurt.gif"),
              dead: require("../../assets/monster_sprites/stage1/02_middleboss/dead.gif")
            }
          ],
          [
            {
              name: "1-3",
              hp: 100,
              image: require("../../assets/monster_sprites/stage1/03_finalboss/idle.gif"),
              hurt: require("../../assets/monster_sprites/stage1/03_finalboss/hurt.gif"),
              dead: require("../../assets/monster_sprites/stage1/03_finalboss/dead.gif")
            }
          ]
        ],
        [
          [
            {
              name: "2-1",
              hp: 150,
              image: require("../../assets/monster_sprites/tutorial/01_ordinary/dead.gif"),
              hurt: require("../../assets/monster_sprites/tutorial/01_ordinary/hurt.gif"),
              dead: require("../../assets/monster_sprites/tutorial/01_ordinary/dead.gif")
            }
          ],
          [
            {
              name: "2-2",
              hp: 150,
              image: require("../../assets/monster_sprites/tutorial/01_ordinary/dead.gif"),
              hurt: require("../../assets/monster_sprites/tutorial/01_ordinary/hurt.gif"),
              dead: require("../../assets/monster_sprites/tutorial/01_ordinary/dead.gif")
            }
          ],
          [
            {
              name: "2-3",
              hp: 150,
              image: require("../../assets/monster_sprites/tutorial/01_ordinary/dead.gif"),
              hurt: require("../../assets/monster_sprites/tutorial/01_ordinary/hurt.gif"),
              dead: require("../../assets/monster_sprites/tutorial/01_ordinary/dead.gif")
            }
          ]
        ]
      ],
      count: 0,
      monster: {},
      image: "",
      gameInfo: {}
    };
  },
  computed: {
    ...mapGetters({
      getGameInfo: "ringfit/getGameInfo"
    }),
    mnowHp() {
      return this.monster.hp;
    },
    chnImage() {
      return this.image;
    },
    cnt() {
      console.log(this.AttackCnt);
      if (this.AttackCnt != 0) this.playerAttack();
      return this.AttackCnt;
    },
    atType() {
      return this.attackType;
    }
  },
  mounted() {
    this.gameInfo = this.$store.state.ringfit.gameInfo;
    this.monster = this.monsterArr[this.$store.state.ringfit.stageNum - 1][
      this.$store.state.ringfit.count
    ][0];
    this.image = this.monster.image;
    this.AttackCnt = 0;
  },
  methods: {
    ...mapMutations({
      setIdx: "ringfit/setIdx",
      setGameInfo: "ringfit/setGameInfo"
    }),
    playerAttack() {
      const damage = 20;
      this.image = this.monster.hurt;
      this.monster.hp -= damage;
      if (this.monster.hp > 0) {
        setTimeout(() => {
          this.image = this.monster.image;
        }, 2000);
      }
      if (this.monster.hp <= 0) {
        this.image = this.monster.dead;
        this.monster.hp = 0;
        this.$store.state.phaser.isMeet = false;
      }
    }
  },
  destroyed() {
    this.$store.commit("ringfit/setGameInfo", this.gameInfo);
    this.$store.commit("ringfit/setCount", this.$store.state.ringfit.count + 1);
    console.log(this.gameInfo);
    this.$store.commit("ringfit/setGameInfo.perfect", this.$store.state.ringfit.gameInfo.perfect + this.gameInfo.perfect);
    this.$store.commit("ringfit/setGameInfo.great", this.$store.state.ringfit.gameInfo.great + this.gameInfo.great);
    this.$store.commit("ringfit/setGameInfo.good", this.$store.state.ringfit.gameInfo.good + this.gameInfo.good);
    this.$store.commit("ringfit/setGameInfo.bad", this.$store.state.ringfit.gameInfo.bad + this.gameInfo.bad);
  }
};
</script>

<style scoped>
.body {
  width: 95%;
  height: 95%;
}
.img {
  min-width: 300px;
  min-height: 300px;
}
</style>
