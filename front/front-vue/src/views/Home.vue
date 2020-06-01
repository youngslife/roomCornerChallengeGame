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
        @click="goPath(this)"
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
              >
                마피아
              </div>
            </template>
            <template v-slot:second>
              <div
                style="height:100px; width:100%;"
                @click="change('second')"
                class="flex flex-center"
              >
                링피트
              </div>
            </template>
            <template v-slot:third>
              <div
                style="height:100px; width:100%;"
                @click="change('third')"
                class="flex flex-center"
              >
                후루추닌자?
              </div>
            </template>
          </q-btn-toggle>
        </div>
      </q-carousel-slide>
    </q-carousel>
    <div class="row justify-center">
      <div class="col-7">
        <div class="col"><h2>전체 게임</h2></div>
        <div class="row">
          <q-card
            v-for="(game, index) in gameList"
            class="my-card col-3"
            style="margin-left:20px; height:400px; margin-top:20px;"
            :key="index"
            :to="game.rink"
          >
            <q-img :src="game.imgSrc" :ratio="4 / 3" />
            <q-card-section>
              <div class="text-h6">{{ game.name }}</div>
              <div class="text-subtitle2">{{ game.people }}</div>
            </q-card-section>
            <q-card-section>
              {{ game.descript }}
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="col-3">
        <div
          class="col flex flex-center"
          style="background:#b2bec3; margin-top:180px; height:300px"
        >
          <div class="col-10  text-center">
            <q-btn
              class="col"
              color="primary"
              icon="check"
              label="방구석 ID 로그인"
              to="/login"
            />
            <div class="col-10" style="margin-top:20px;">
              <span>다른계정 로그인</span>
              <q-icon name="print" />
              <q-icon name="print" />
              <q-icon name="print" />
              <q-icon name="print" />
            </div>
            <div class="col-10" style="margin-top:20px;">
              <p class=" text-right">회원가입</p>
            </div>
          </div>
        </div>
        <div
          class="col flex flex-center"
          style="background:#b2bec3; margin-top:180px; height:300px"
        >
          <div class="col-10  text-center">
            <div class="col-10">
              <q-btn
                class="col-10"
                color="primary"
                icon="check"
                label="공지사항"
                to="/login"
              />
            </div>
            <div class="col-10" style="margin-top:20px;">
              <q-btn
                class="col-10"
                color="primary"
                icon="check"
                label="QNA"
                to="/login"
              />
            </div>
          </div>
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
        { name: "first", imgSrc: require("../assets/mapia.jpeg") },
        { name: "second", imgSrc: require("../assets/ring.jpeg") },
        { name: "third", imgSrc: require("../assets/room.png") }
      ],
      gameList: [
        {
          name: "마피아",
          imgSrc: require("../assets/mapia.jpeg"),
          people: "4~8명",
          descript: "마피아게임에 대한 설명",
          rink: "/mapia"
        },
        {
          name: "링피트",
          imgSrc: require("../assets/ring.jpeg"),
          people: "1명",
          descript: "링피트게임에 대한 설명",
          rink: "/fitness"
        },
        {
          name: "방탈출",
          imgSrc: require("../assets/room.png"),
          people: "1~4명",
          descript: "방탈출게임에 대한 설명",
          rink: "/mapia"
        },
        {
          name: "후루추닌자?",
          imgSrc: require("../assets/tabsonic.png"),
          people: "1명",
          descript: "게임게임에 대한 설명",
          rink: "/mapia"
        }
      ]
    };
  },
  methods: {
    goPath(target) {
      console.log(target);
      this.$router.push("/fitness");
    },
    change(target) {
      this.slide = target;
      event.stopPropagation();
    }
  }
};
</script>

<style>
.text-brand {
  color: white;
}
.bg-brand {
  background: rgba(0, 102, 255, 0.4);
}
</style>
