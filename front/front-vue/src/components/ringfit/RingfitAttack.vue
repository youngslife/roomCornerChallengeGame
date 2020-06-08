<template>
  <div>
    <div style="text-align: center;">
      <h3>
        <!--{{ monster.name }}-->
        hp : {{ mnowHp }}
      </h3>
      <!-- <div :class={}>  -->
      <img :src="chnImage" />
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

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
            image: require("../../assets/monster_sprites/tutorial/01_ordinary/dead.gif"),
            hurt: require("../../assets/monster_sprites/tutorial/01_ordinary/hurt.gif"),
            dead: require("../../assets/monster_sprites/tutorial/01_ordinary/dead.gif")
          }
        ][
          ({
            name: "1-1",
            hp: 100,
            image: require("../../assets/monster_sprites/tutorial/01_ordinary/dead.gif"),
            hurt: require("../../assets/monster_sprites/tutorial/01_ordinary/hurt.gif"),
            dead: require("../../assets/monster_sprites/tutorial/01_ordinary/dead.gif")
          },
          {
            name: "1-2",
            hp: 100,
            image: require("../../assets/monster_sprites/tutorial/01_ordinary/dead.gif"),
            hurt: require("../../assets/monster_sprites/tutorial/01_ordinary/hurt.gif"),
            dead: require("../../assets/monster_sprites/tutorial/01_ordinary/dead.gif")
          },
          {
            name: "1-3",
            hp: 100,
            image: require("../../assets/monster_sprites/tutorial/01_ordinary/dead.gif"),
            hurt: require("../../assets/monster_sprites/tutorial/01_ordinary/hurt.gif"),
            dead: require("../../assets/monster_sprites/tutorial/01_ordinary/dead.gif")
          })
        ],
        [
          {
            name: "2-1",
            hp: 150,
            image: require("../../assets/monster_sprites/tutorial/01_ordinary/dead.gif"),
            hurt: require("../../assets/monster_sprites/tutorial/01_ordinary/hurt.gif"),
            dead: require("../../assets/monster_sprites/tutorial/01_ordinary/dead.gif")
          },
          {
            name: "2-2",
            hp: 150,
            image: require("../../assets/monster_sprites/tutorial/01_ordinary/dead.gif"),
            hurt: require("../../assets/monster_sprites/tutorial/01_ordinary/hurt.gif"),
            dead: require("../../assets/monster_sprites/tutorial/01_ordinary/dead.gif")
          },
          {
            name: "2-3",
            hp: 150,
            image: require("../../assets/monster_sprites/tutorial/01_ordinary/dead.gif"),
            hurt: require("../../assets/monster_sprites/tutorial/01_ordinary/hurt.gif"),
            dead: require("../../assets/monster_sprites/tutorial/01_ordinary/dead.gif")
          }
        ]
      ],
      count: 0,
      monster: {},
      image: ""
    };
  },
  computed: {
    mnowHp() {
      return this.monster.hp;
    },
    chnImage() {
      return this.image;
    },
    cnt() {
      if (this.AttackCnt != 0) this.playerAttack();
      return this.AttackCnt;
    },
    atType() {
      return this.attackType;
    }
  },
  mounted() {
    this.monster = this.monsterArr[this.$store.state.ringfit.stageNum - 1][
      this.$store.state.ringfit.count
    ];
    this.image = this.monster.image;
    this.AttackCnt = 0;
  },
  methods: {
    ...mapMutations({
      setIdx: "ringfit/setIdx"
    }),
    playerAttack() {
      let demage;
      // if (skillName == this.skills.first.name) {
      //   demage = this.skills.first.strength;
      // } else if (skillName == this.skills.second.name) {
      //   demage = this.skills.second.strength;
      // } else if (skillName == this.skills.third.name) {
      //   demage = this.skills.third.strength;
      // }
      demage = 10;
      this.image = this.monster.hurt;
      this.monster.hp -= demage;
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
    this.$store.commit("ringfit/setCount", this.$store.state.ringfit.count + 1);
  }
};
</script>

<style></style>
