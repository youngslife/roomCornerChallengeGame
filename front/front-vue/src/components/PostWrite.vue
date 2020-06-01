<template>
  <div class="q-pa-md q-gutter-sm">
    <q-select v-model="checkgame" :options="games" label="Standard" filled />
    <q-select v-model="checktype" :options="types" label="Standard" filled />
    <q-editor v-model="editor" min-height="5rem" />
  </div>
</template>

<script>
export default {
  name: "writer",
  props: {
    game: String,
    type: String
  },
  data() {
    return {
      editor: "What you see is <b>what</b> you get.",
      types: ["자유게시판", "팁과공략", "질문게시판"],
      games: ["링피트", "마피아", "후루추닌자", "방탈출"]
    };
  },
  computed: {
    checkgame: function() {
      return this.game;
    },
    checktype: function() {
      return this.type;
    }
  }
};
</script>

<style></style>
