<template>
  <div>
    <div class="q-pa-md" style="max-width: 350px">
      <q-list bordered separator>
        <q-item v-for="board in boardList" :key="board.id">
          <q-item-section @click="goBoardDetail(board.id)">
            {{
            board.title
            }}
          </q-item-section>
        </q-item>
      </q-list>
      <q-btn label="글쓰기" to="/boardCreate"></q-btn>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      boardList: state => state.boardList
    })
  },
  mounted() {
    this.setBoardList();
  },
  methods: {
    ...mapActions("board", ["getBoardList"]),
    goBoardDetail(id) {
      this.$router.push({ name: "boardDetail", params: { id: id } });
    },
    async setBoardList() {
      let params = {};
      await this.getBoardList(params);
      console.log(this.boardList);
    }
  }
};
</script>

<style lang="scss" scoped></style>
