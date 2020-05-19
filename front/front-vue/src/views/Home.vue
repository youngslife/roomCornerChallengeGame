<template>
  <div>
    <div class="row flex flex-center">
      <q-card
        v-for="(card, index) in cards"
        :key="index"
        class="my-card col-5 q-gutter-sm flex flex-center"
        style="margin:2px;"
      >
        <q-img
          src="https://cdn.quasar.dev/img/parallax2.jpg"
          :ratio="16/9"
          
        >
          <div
            class="text-h5 absolute-bottom text-center"
            style="background-color: rgba(255, 255, 255,.0);"
            @click="goPath(card.url)"
          >
            {{ card.name }}
          </div>
        </q-img>
      </q-card>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      cards: [{name:"랭킹",url:"how"}, {name:"게시판",url:"boardList"}, {name:"게임",url:"gamehome"}, {name:"설정",url:"how"}]
    };
  },
  methods: {
    goPath(url) {
      this.$router.push(url)}
  },
  computed: {
    user() {
      return firebase.auth().currentUser;
    }
  }
};
</script>
