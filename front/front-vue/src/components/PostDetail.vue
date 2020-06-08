<template>
  <div class="q-pa-md q-gutter-sm">
    <template v-if="isUpdate">
      <!-- <writer
        :game="game"
        :type="type"
        :isUpdate.sync="isUpdate"
        :post="post"
      ></writer>-->
    </template>
    <template v-else>
      <h4 v-html="post.post_title" />
      <span>작성자 :</span>
      <span v-html="post.post_user.user_name" />
      <hr />

      <div v-html="post.post_content" />
      <q-btn color="white" text-color="black" label="목록으로" @click="back" />
      <q-btn
        v-if="isSame"
        color="white"
        text-color="black"
        label="수정"
        @click="update"
      />
      <q-btn
        v-if="isSame"
        color="white"
        text-color="black"
        label="삭제"
        @click="deletePost"
      />
      <hr />
      <div class="row justify-end">
        <q-input outlined v-model="comment" label="댓글" :dense="false" />
        <q-btn
          color="primary"
          icon="check"
          label="댓글쓰기"
          @click="insertCmt()"
        />
      </div>
      <q-list bordered v-if="cmtList[0].cmt_user != null">
        <q-item v-for="(cmt, index) in cmtList" :key="index" clickable v-ripple>
          <q-item-section>{{ cmt.cmt_user.user_name }}</q-item-section>
          <template>
            <q-item-section>{{ cmt.cmt_content }}</q-item-section>
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
// import writer from "./PostWrite";
export default {
  name: "detail",
  props: {
    game: String,
    type: String,
    isDetail: Boolean,
    post_no: Number
  },
  components: {
    // writer
  },
  data() {
    return {
      isUpdate: false,
      isUpdateCmt: false,
      comment: "",
      user_no: ""
    };
  },
  computed: {
    post() {
      return this.$store.state.post.post;
    },
    isSame() {
      return this.post.post_user.user_no == this.user_no;
    },
    cmtList() {
      return this.$store.state.post.post.post_cmtList;
    }
  },
  mounted() {
    this.user_no = Number(window.sessionStorage.getItem("user_no"));
    this.$store.dispatch("post/getPost", this.post_no);
    // console.log("test", this.post.post_cmtList);
    console.log("dddd", this.$store.state.comment.comment);
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
    },
    update() {
      this.isUpdate = true;
    },
    deletePost() {
      this.$store.dispatch("post/deletePost", this.post.post_no);
    }
  }
};
</script>

<style></style>
