<template>
  <div>
    <div>{{board.title}}</div>
    <div>{{board.content}}</div>
    <q-input borderless v-model="comment" label="댓글" />
    <q-btn label="저장" @click="createBoard()"></q-btn>
    <q-list bordered separator>
      <q-item v-for="comm in comments" :key="comm.id">
        <q-item-section>{{comm.comment}}</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      comment: ""
    };
  },
  computed: {
    ...mapState({
      board: state => state.board,
      comments: state => state.commentList
    })
  },
  mounted() {
    this.setBoard();
    this.setCommentList();
  },
  methods: {
    ...mapActions("board", ["getBoard"]),
    ...mapActions("comment", ["getCommentList", "create", "update", "delete"]),
    async setBoard() {
      let params = {
        id: this.$route.params.id
      };
      await this.getBoard(params);
    },
    async setCommentList() {
      let params = {
        id: this.$route.params.id
      };
      await this.getCommentList(params);
    },
    async createComment() {
      let params = {
        id: this.board.id,
        comment: this.comment
      };
      await this.create(params);
      this.comments = this.$store.state.commentList.slice(0);
    },
    async updateBoard() {
      let params = {
        board: this.board.id
      };
      await this.update(params);
    }
  }
};
</script>

<style lang="scss" scoped></style>
