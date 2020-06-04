<template>
  <div>
    <div class=" text-center"><h2>소식</h2></div>
    <div
      class="col-10 row justify-around"
      style="height:700px; margin-top:20px"
    >
      <q-card
        class="col-3 my-card"
        style="margin-left:20px; margin-top:20px;"
        v-for="(board, index) in boardList"
        :key="index"
      >
        {{ board }}
        <img src="https://cdn.quasar.dev/img/mountains.jpg" />
        <q-card-section>
          <div class="text-h6">X월 X일 공지사항</div>
          <div class="text-subtitle2">2020-02-02</div>
        </q-card-section>
        <q-card-section>
          우리 업데이트 해써용 ~^
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      tab: "mails",
      board_no: 1
    };
  },
  computed: {
    ...mapState({
      boardList: state => state.board.boardList
    })
  },
  mounted() {
    this.$store.dispatch("board/getBoardListByType", {
      location: "2",
      title: "게임소식",
      page_no: "1"
    });
  }
};
</script>

<style></style>
