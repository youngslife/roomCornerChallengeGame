<template>
  <div>
    <q-carousel
      animated
      v-model="slide"
      infinite
      style="height:610px;"
      autoplay
    >
      <q-carousel-slide
        v-for="(card, index) in mainCard"
        :name="card.name"
        :img-src="card.imgSrc"
        :key="index"
        @click="goPath(gameList[index].link)"
      >
        <div class="absolute-bottom">
          <q-btn-toggle
            v-model="slide"
            spread
            text-color="white"
            toggle-color="brand"
            :options="[
              { value: 'first', slot: 'first' },
              { value: 'second', slot: 'second' },
              { value: 'third', slot: 'third' }
            ]"
            style="height:100px; width:100%;"
          >
            <template v-slot:first>
              <div
                style="height:100px; width:100%;"
                @click="change('first')"
                class="flex flex-center"
              >마피아를 찾아라</div>
            </template>
            <template v-slot:second>
              <div
                style="height:100px; width:100%;"
                @click="change('second')"
                class="flex flex-center"
              >피트런 : 케니의 모험</div>
            </template>
            <template v-slot:third>
              <div
                style="height:100px; width:100%;"
                @click="change('third')"
                class="flex flex-center"
              >방탈출(예정)</div>
            </template>
          </q-btn-toggle>
        </div>
      </q-carousel-slide>
    </q-carousel>
    <div class="row justify-center">
      <div class="col-10" style="padding-left: 100px">
        <div class="row">
          <h4 class="col-5" id="game-list-title">전체 게임</h4>
          <!-- menu bar -->
          <div class="col-2 menus" style="margin-left: auto">
            <div class="menus-contents flex flex-center">
              <div @click="goPath('/jump')">공지</div>
              <div>QNA</div>
            </div>
          </div>
        </div>
        <div class="row">
          <q-card
            v-for="(game, index) in gameList"
            class="my-card col-3 game-description"
            style="margin-left:20px; height:400px; margin-top:20px;"
            :key="index"
            @click="goPath(game.link)"
          >
            <q-img :src="game.imgSrc" :ratio="4 / 3" />
            <q-card-section>
              <div class="text-h6">{{ game.name }}</div>
              <div class="text-subtitle2">{{ game.people }}</div>
            </q-card-section>
            <q-card-section v-if="!game.developing">{{ game.descript }}</q-card-section>
            <img class="developing" v-if="game.developing" src="../assets/developing.png" />
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slide: "first",
      mainCard: [
        { name: "first", imgSrc: require("../assets/mafia.png") },
        { name: "second", imgSrc: require("../assets/ring.png") },
        { name: "third", imgSrc: require("../assets/room.png") }
      ],
      gameList: [
        {
          name: "마피아를 찾아라",
          imgSrc: require("../assets/mafia.png"),
          people: "4~8명",
          descript:
            "웹캠으로 하는 고도의 심리 게임 마피아! 과연 이번 판의 저격수는 누가 될 것인가?",
          link: "/mafia",
          developing: false
        },
        {
          name: "피트런: 케니의 모험",
          imgSrc: require("../assets/ring.png"),
          people: "1명",
          descript:
            "운동으로 몬스터를 처치할 수 있다? 웹캠으로 즐기는 케니의 어드벤처 게임",
          link: "/fitness",
          developing: false
        },
        {
          name: "방탈출",
          imgSrc: require("../assets/room.png"),
          people: "1~4명",
          descript: "",
          developing: true,
          link: "/mafia"
        },
        {
          name: "후루추닌자",
          imgSrc: require("../assets/tabsonic.png"),
          people: "1명",
          descript: "",
          developing: true,
          descript: "게임게임에 대한 설명",
          link: "/mapmafiaia"
        }
      ],
      user_no: {}
    };
  },
  mounted() {
    this.user_no = window.sessionStorage.getItem("user_no");
  },
  methods: {
    goPath(link) {
      this.$router.push(link);
    },
    change(target) {
      this.slide = target;
      event.stopPropagation();
    }
  }
};
</script>

<style scoped>
.text-brand {
  color: white;
}
.bg-brand {
  background: rgba(218, 0, 0, 0.4);
}
.game-list-title {
  margin-bottom: 0px !important;
  margin-top: 10px !important;
  font-family: "SDKukdetopokki-Lt";
}
.developing {
  width: 70%;
  margin: auto;
  transform: rotate(-10deg);
}
.menus {
  padding-top: 50px;
}
.menus-contents {
  margin: 0 10px;
  justify-content: space-between;
}
.menus-contents > div {
  cursor: pointer;
  width: 70px;
  height: 40px;
  line-height: 40px;
  border-radius: 10px;
  text-align: center;
  transition-duration: 0.4s;
}
.menus-contents > div:hover {
  background: rgb(199, 199, 199);
  color: white;
}
</style>