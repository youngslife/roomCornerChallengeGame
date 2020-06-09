<template>
  <div>
    <q-carousel animated v-model="slide" infinite style="height:50vh;" autoplay>
      <q-carousel-slide
        v-for="(card, index) in mainCard"
        :name="card.name"
        :img-src="card.imgSrc"
        :key="index"
        style="padding: 0"
      >
        <div class="row menu-bar">
          <div class="col-2 menu-button" @click="goToPage('/fitness/info')">소식</div>
          <div class="col-2 menu-button" @click="goToPage('/fitness/guide')">가이드</div>
          <div class="col-4 menu-button" @click="goToPage('/fitness')">
            <img src="../../assets/fitrun.png" />
          </div>
          <div class="col-2 menu-button" @click="goToPage('/fitness/rank')">랭킹</div>
          <div class="col-2 menu-button" @click="goToPage('/fitness/community')">커뮤니티</div>
        </div>
      </q-carousel-slide>
    </q-carousel>

    <router-view></router-view>
  </div>
</template>

<script>
import router from "@/router";
export default {
  data() {
    return {
      slide: "first",
      menus: [
        { name: "소식", link: "/fitness/info" },
        { name: "가이드", link: "/fitness/guide" },
        { name: "랭킹", link: "/fitness/rank" },
        { name: "커뮤니티", link: "/fitness/community" }
      ],
      mainCard: [{ name: "first", imgSrc: require("../../assets/ring.png") }],
      slide2: "tv"
    };
  },
  methods: {
    goToPage(link) {
      router.push(link);
    }
  },
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
.menu-bar {
  height: 10vh;
  text-align: center;
  line-height: 10vh;
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}
.menu-button {
  background-color: rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
.menu-button:hover {
  background-color: rgba(0, 0, 0, 0.4);
  cursor: pointer;
}
</style>
