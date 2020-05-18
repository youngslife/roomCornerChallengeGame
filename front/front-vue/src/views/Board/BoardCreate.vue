<template>
  <div class="q-pa-md q-gutter-sm">
    <q-input borderless v-model="board.title" label="제목" />
    <q-editor v-model="board.content" min-height="5rem" />
    <q-btn
      label="저장"
      @click="isCreate ? createBoard() : updateBoard()"
    ></q-btn>
    <q-btn label="목록으로" to="/boardList"></q-btn>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      id: 0,
      board: {
        title: "",
        content: "",
      },
      isCreate: this.$route.params.id === undefined ? true : false,
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    if (!this.create) this.setBoard();
  },
  methods: {
    ...mapActions("board", ["getBoard", "create", "update"]),
    async createBoard() {
      let params = {
        board: this.board,
      };
      const res = await this.create(params);
      this.goBoardDetail(res.data);
    },
    async updateBoard() {
      let params = {
        board: this.board,
      };
      const res = await this.update(params);
      this.goBoardDetail(res.data);
    },
    async setBoard() {
      let params = {
        id: this.$route.params.id,
      };
      await this.getBoard(params);
      this.board = this.$store.state.board;
    },
    goBoardDetail(id) {
      this.$router.push({ name: "boardDetail", params: { id: id } });
    },
  },
};
</script>

<style lang="scss" scoped></style>
