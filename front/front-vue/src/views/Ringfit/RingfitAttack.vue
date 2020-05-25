<template>
  <div>
    <div style="text-align: center;">
      <h3>{{ monster.name }} hp : {{ mnowHp }}</h3>
      <img :src="mimageChange">
      <p>{{ player.username }} hp : {{ pnowHp }}</p>
    </div>
    <div class="row skill-set">
      <q-btn class="col-4" :label="skills.first.name" @click="playerAttck(skills.first.name)"></q-btn>
      <q-btn class="col-4" :label="skills.second.name" @click="playerAttck(skills.second.name)"></q-btn>
      <q-btn class="col-4" :label="skills.third.name" @click="playerAttck(skills.third.name)"></q-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "RingfitAttack",
  data() {
    return {
      player: {
        username: "방구석여포",
        hp: 200,
        combo: 0
      },
      monster: {
        name: "라이언",
        hp: 100,
        strength: 5,
        image: null
      },
      skills: {
        first: {
          name: "스쿼트",
          strength: 10,
          image: '',
        },
        second: {
          name: "런지",
          strength: 20,
          image: '',
        },
        third: {
          name: "마운틴 클라이머",
          strength: 50,
          image: '',
        }
      }
    };
  },
  // 후에 component로 쓰게 된다면 prop 이용
  // props: {
  //   player: {
  //     username: String,
  //     hp: Number
  //   },
  //   monster: {
  //     name: String,
  //     hp: Number,
  //     strength: Number
  //   },
  //   skills: {
  //     first: {
  //       name: String,
  //       strength: Number
  //     },
  //     second: {
  //       name: String,
  //       strength: Number
  //     },
  //     third: {
  //       name: String,
  //       strength: Number
  //     },
  //   },
  // },
  methods: {
    playerAttck(skillName) {
      let demage;
      if (skillName == this.skills.first.name) {
        demage = this.skills.first.strength;
      } else if (skillName == this.skills.second.name) {
        demage = this.skills.second.strength;
      } else if (skillName == this.skills.third.name) {
        demage = this.skills.third.strength;
      }
      this.monster.image = require("../../assets/ryan2.png")
      this.monster.hp -= demage;
      if(this.monster.hp > 0) {
        setTimeout(() => {
          this.monster.image = require("../../assets/ryan1.png")
        }, 300)
      }
      if (this.monster.hp <= 0) {
        this.monster.image = require("../../assets/ryan3.png")
        this.monster.hp = 0;
        setTimeout(() => {
          alert(`${this.monster.name} 처치 완료`);
        }, 500)
      } else {
        setTimeout(() => {
          alert(`${this.monster.name}의 공격`)
          this.monsterAttack();
        }, 1000);
      }
    },
    monsterAttack() {
      console.log("attack from a monster");
      this.player.hp -= this.monster.strength;
      if (this.player.hp <= 0) {
        this.player.hp = 0;
        alert(`${this.player.username}(이)가 더이상 공격할 수 없습니다.`);
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
    mimageChange(){
      return this.monster.image;
    }
  },
  mounted() {
     this.monster.image = require("../../assets/ryan1.png")
  }
};
</script>

<style>
</style>