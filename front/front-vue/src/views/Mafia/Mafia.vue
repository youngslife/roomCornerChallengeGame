<template>
  <div>
    <q-carousel
      animated
      v-model="slide"
      infinite
      style="height:710px;"
      autoplay
    >
      <q-carousel-slide
        v-for="(card, index) in mainCard"
        :name="card.name"
        :img-src="card.imgSrc"
        :key="index"
      >
        <!--이부분은 컴포넌트화시키면 될듯  -->
        <div
          class="absolute-top justify-around row"
          style="height:50px;margin-top:20px;"
        >
          <div class="col-2 flex flex-center">
            <q-img
              :src="require('../../assets/fitrun.png')"
              :ratio="16 / 9"
              spinner-color="primary"
              spinner-size="82px"
            />
          </div>
          <q-btn
            v-for="(menu, index) in menus"
            :key="index"
            style=" color:white; font-size:25px;"
            :label="menu.name"
            class="col-2 text-weight-bold"
            :to="menu.link"
          ></q-btn>
        </div>
        <div class="absolute-bottom">
          <q-btn-toggle
            v-model="slide"
            spread
            text-color="white"
            toggle-color="brand"
            :options="[
              { label: '링피트1', value: 'first' },
              { label: '링피트2', value: 'second' },
              { label: '링피트3', value: 'third' }
            ]"
            style="height:100px; width:100%;"
          />
        </div>
      </q-carousel-slide>
    </q-carousel>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slide: "first",
      menus: [
        { name: "소식", link: "/mafia/info" },
        { name: "가이드", link: "/mafia/guide" },
        { name: "랭킹", link: "/mafia/rank" },
        { name: "커뮤니티", link: "/mafia/community" }
      ],
      mainCard: [
        { name: "first", imgSrc: require("../../assets/mapia.jpeg") },
        { name: "second", imgSrc: require("../../assets/ring.jpeg") },
        { name: "third", imgSrc: require("../../assets/room.png") }
      ],
      slide2: "tv"
    };
  },
  methods: {},
  computed: {}
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
