<template>
  <div class="q-pa-md q-gutter-sm">
    <template v-if="isUpdate">
      <writer :game="game" :type="type" :isUpdate.sync="isUpdate" :post="post"></writer>
    </template>
    <template v-else>
      <h4 v-html="post.post_title" />
      <div v-html="post.post_content" />
      <q-btn color="white" text-color="black" label="목록으로" @click="back" />
      <q-btn v-if="isSame" color="white" text-color="black" label="수정" @click="updatePost" />
      <q-btn v-if="isSame" color="white" text-color="black" label="삭제" @click="deletePost" />
      <hr />
      <div class="row justify-end">
        <q-input outlined v-model="comment" label="댓글" :dense="false" />
        <q-btn color="primary" icon="check" label="댓글쓰기" @click="insertCmt()" />
      </div>
      <q-list bordered>
        <q-item v-for="(cmt,index) in post.post_cmtList" :key="index" clickable v-ripple>
          <q-item-section>{{cmt.cmt_user.user_email}}</q-item-section>
          <template v-if="isUpdateCmt">
            <q-input outlined v-model="cmt.cmt_content" label="댓글" :dense="false" />
            <q-btn color="white" text-color="black" label="수정" @click="updateCmt(cmt.cmt_content)" />
          </template>
          <template v-else>
            <q-item-section>{{cmt.cmt_content}}</q-item-section>
            <q-btn
              v-if="cmt.cmt_user.user_no === user_no"
              color="white"
              text-color="black"
              label="수정"
              @click="isUpdateCmt = true"
            />
            <q-btn
              v-if="cmt.cmt_user.user_no === user_no"
              color="white"
              text-color="black"
              label="삭제"
              @click="deleteCmt(cmt.cmt_no)"
            />
          </template>
        </q-item>
      </q-list>
    </template>
  </div>
</template>

<script>
import writer from "./PostWrite";
export default {
  name: "writer",
  props: {
    game: String,
    type: String,
    post: Object,
    isDetail: Boolean
  },
  components: {
    writer
  },
  data() {
    return {
      isSame: false,
      isUpdate: false,
      isUpdateCmt: false,
      comment: "",
      user_no: 0
    };
  },
  mounted() {
    this.user_no = this.$store.state.user.user_no;
    console.log(this.user_no);
    if (this.post.post_user.user_no === this.user_no) {
      this.isSame = true;
    }
  },
  methods: {
    back() {
      this.$emit("update:isDetail", false);
    },
    insertCmt() {
      this.$store.dispatch("comment/insertCmt", {
        post_no: this.post.post_no,
        user_no: this.user_no,
        cmt_content: this.comment
      });
    },
    updateCmt(cmt) {
      this.$store.dispatch("comment/updateCmt", {
        post_no: this.post.post_no,
        user_no: this.user_no,
        cmt_content: cmt
      });
      this.isUpdateCmt = false;
    },
    deleteCmt(no) {
      this.$store.dispatch("comment/deleteCmt", {
        cmt_no: no
      });
    }
  }
};
</script>

<style></style>
