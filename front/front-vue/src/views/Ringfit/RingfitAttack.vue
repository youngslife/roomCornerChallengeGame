<template>
  <div>
    <h1>공격화면</h1>
    <h3>{{ player.username }} hp : {{ pnowHp }}</h3>
    <h3>{{ monster.name }} hp : {{ mnowHp }}</h3>
    <q-btn :label="skills.first.name" @click="playerAttck(skills.first.name)"></q-btn>
    <q-btn :label="skills.second.name" @click="playerAttck(skills.second.name)"></q-btn>
    <q-btn :label="skills.third.name" @click="playerAttck(skills.third.name)"></q-btn>
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
        name: "피카츄",
        hp: 100,
        strength: 5
      },
      skills: {
        first: {
          name: "스쿼트",
          strength: 10
        },
        second: {
          name: "런지",
          strength: 20
        },
        third: {
          name: "마운틴 클라이머",
          strength: 30
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
      this.monster.hp -= demage;
      if (this.monster.hp <= 0) {
        this.monster.hp = 0;
        alert(`${this.monster.name} 처치 완료`);
        return;
      }
      setTimeout(() => {
        this.monsterAttack();
      }, 1000);
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
    }
  }
};
</script>

<style>
</style>