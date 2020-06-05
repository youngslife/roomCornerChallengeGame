<template>
  <div class="q-pa-md q-gutter-sm">
    <q-select v-model="checkgame" :options="games" label="Standard" filled />
    <q-select v-model="checktype" :options="types" label="Standard" filled />
    <q-input outlined v-model="title" label="제목" :dense="false" />
    <q-editor v-model="editor" min-height="5rem" placeholder="What you see is what you get." />
    <q-btn color="white" text-color="black" label="저장" @click="isUpdate?update():insert()" />
  </div>
</template>

<script>
export default {
  name: "writer",
  props: {
    game: String,
    type: String,
    isWrite: Boolean,
    isUpdate: Boolean,
    post: Object
  },
  data() {
    return {
      title: "",
      editor: "",
      types: ["자유게시판", "팁과공략", "질문게시판"],
      games: ["링피트", "마피아"], //, "후루추닌자", "방탈출"]
      user_no: 0
    };
  },
  computed: {
    checkgame: function() {
      return this.game;
    },
    checktype: function() {
      return this.type;
    }
  },
  mounted() {
    this.user_no = this.$store.state.user_no;
    if (this.post !== undefined) {
      this.title = this.post.post_title;
      this.editor = this.post.post_content;
    }
    console.log(this.isUpdate);
  },
  methods: {
    insert() {
      let board_no;
      if (this.checktype === "자유게시판") board_no = 6;
      else if (this.checktype === "팁과공략") board_no = 7;
      else board_no = 8;
      console.log("insert");
      this.$store.dispatch("post/insertPost", {
        board_no: board_no,
        user_no: this.user_no,
        post_title: this.title,
        post_content: this.editor
      });
      this.$emit("update:isWrite", false);
    },
    update() {
      let board_no;
      if (this.checktype === "자유게시판") board_no = 6;
      else if (this.checktype === "팁과공략") board_no = 7;
      else board_no = 8;
      console.log("update");
      this.$store.dispatch("post/updatePost", {
        board_no: board_no,
        user_no: this.user_no,
        post_title: this.title,
        post_content: this.editor
      });
      this.$emit("update:isUpdate", false);
    }
  }
};
</script>

<style></style>
