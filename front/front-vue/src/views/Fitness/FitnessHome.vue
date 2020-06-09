<template>
  <div>
    <div class="row" style="background: #444444;">
      <div class="col-4 flex flex-center">
        <img class="guide-btn" src="../../assets/guide_btn.png" @click="goToPage('/fitness/guide')" />
      </div>
      <div class="col-4 flex flex-center">
        <div class="start-button" @click="clickStart"></div>
      </div>
      <div class="col-4">
        <div class="row justify-around" style="margin-top: 3vh;">
          <q-btn
            color="#ddd"
            label="로그인"
            class="col-5"
            style="height:30vh"
            @click="goToPage('/login')"
          />
          <q-btn color="#ddd" label="회원가입" class="col-5" @click="goToPage('/signin')" />
        </div>
      </div>
    </div>
    <div class="row justify-around" style="margin-top: 3vh;">
      <h3 @click="goToPage('/fitness/community')" style="cursor: pointer;">피트런 커뮤니티</h3>
    </div>
    <div class="row justify-center">
      <div class="col-10 row justify-around">
        <q-card v-for="(board, i) in boardList.slice(1, 3)" class="my-card col-5" :key="i">
          <q-card-section>
            <div class="text-h5" style="text-align: center;">{{ board.board_subtitle }} 게시판</div>
            <div
              class="text-subtitle2"
              v-for="(post, j) in board.board_postList.slice(0, 5)"
              :key="j"
            >
              <hr />
              <div style="display: flex; justify-content: space-between">
                <span>{{ post.post_title }}</span>
                <span>by. {{ post.post_user.user_name }}</span>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
export default {
  data() {
    return {
      slide2: "tv",
      userNo: 0,
      commuList: {}
    };
  },
  mounted() {
    this.userNo = window.sessionStorage.getItem("user_no");
    this.$store.dispatch("board/getBoardListByType", {
      location: 2,
      title: "커뮤니티",
      page_no: 1
    });
  },
  methods: {
    clickStart() {
      if (this.userNo > 0) {
        router.push("/game/RingFit");
      } else {
        router.push("/login");
      }
    },
    goToPage(link) {
      router.push(link);
    }
    // goToPostDetail(post_no){
    //   각 글 제목 눌렀을 때 해당 글 페이지로 가게 하자
    //   console.log('hi there')
    //   this.$store.dispatch("post/getPost", post_no)
    // }
  },
  computed: {
    boardList() {
      return this.$store.state.board.boardList;
    }
  }
};
</script>

<style>
.start-button {
  background-image: url("../../assets/start_btn.png");
  width: 200px;
  height: 200px;
  transition-duration: 0.3s;
}
.start-button:hover {
  background-image: url("../../assets/start_btn_hover.png");
  width: 200px;
  height: 200px;
}
.guide-btn {
  width: 90%;
  height: 200px;
  margin-top: 3vh;
  margin-bottom: 3vh;
  cursor: pointer;
  border-radius: 3vmin;
}
</style>
