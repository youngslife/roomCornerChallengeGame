<template>
  <div>
    <div style="text-align: center;">
      <h3>{{ cnt }}</h3>
      <h3>{{ monster.name }} hp : {{ mnowHp }}</h3>
      <img :src="mimageChange" />
      <p>{{ player.username }} hp : {{ pnowHp }}</p>
    </div>
    <div class="row skill-set">
      <q-btn
        class="col-4"
        :label="skills.first.name"
        @click="playerAttack(skills.first.name)"
      ></q-btn>
      <q-btn
        class="col-4"
        :label="skills.second.name"
        @click="playerAttack(skills.second.name)"
      ></q-btn>
      <q-btn
        class="col-4"
        :label="skills.third.name"
        @click="playerAttack(skills.third.name)"
      ></q-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "RingfitAttack",
  data() {
    return {
      monster: {
        name: "라이언",
        hp: 100,
        strength: 5,
        image: null
      },
      skills: {
        first: {
          name: "walk",
          strength: 10,
          image: ""
        },
        second: {
          name: "런지",
          strength: 20,
          image: ""
        },
        third: {
          name: "jump",
          strength: 50,
          image: ""
        }
      },
      count: 0
    };
  },
  props: {
    AttackCnt: Number,
    player: {
      username: String,
      hp: Number
    }
  },
  methods: {
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
      this.monster.image = require("../../assets/ryan2.png");
      this.monster.hp -= demage;
      if (this.monster.hp > 0) {
        setTimeout(() => {
          this.monster.image = require("../../assets/ryan1.png");
        }, 300);
      }
      if (this.monster.hp <= 0) {
        this.monster.image = require("../../assets/ryan3.png");
        this.monster.hp = 0;
        this.$store.state.phaser.isMeet = false;
        // setTimeout(() => {
        //   alert(`${this.monster.name} 처치 완료`);
        // }, 500)
      } else {
        // setTimeout(() => {
        //   alert(`${this.monster.name}의 공격`)
        this.monsterAttack();
        // }, 1000);
      }
    },
    monsterAttack() {
      console.log("attack from a monster");
      this.player.hp -= this.monster.strength;
      if (this.player.hp <= 0) {
        this.player.hp = 0;
        // alert(`${this.player.username}(이)가 더이상 공격할 수 없습니다.`);
      }
    }
  },
  computed: {
    mnowHp() {
      return this.monster.hp;
    },
    pnowHp() {
      return this.player.hp;
    },
    mimageChange() {
      return this.monster.image;
    },
    cnt() {
      if (this.AttackCnt != 0) this.playerAttack();
      return this.AttackCnt;
    }
  },
  created() {
    this.AttackCnt = 0;
  },
  mounted() {
    this.monster.image = require("../../assets/ryan1.png");
    console.log(this);
  }
};
</script>

<style></style>
