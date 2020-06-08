<template>
  <div>
    <div class="row" style="background:gray;">
      <div class="col-4 flex flex-center">
        <q-btn
          color="primary"
          icon="check"
          label="어떠한 공간"
          style="width:90%; height:200px; margin-top:20px; margin-bottom:20px;"
        />
      </div>
      <div class="col-4 flex flex-center">
        <button
          style="border-radius:50%; width:200px; height:200px; margin-top:20px;"
          @click="clickStart"
        >
          시작버튼
        </button>
      </div>
      <div class="col-4">
        <div class="row justify-around" style="margin-top:20px;height:70px;">
          <q-btn color="primary" icon="check" label="로그인" class="col-5" />
          <q-btn color="primary" icon="check" label="회원가입" class="col-5" />
        </div>
        <div class="row justify-center" style="margin-top:20px">
          <q-btn
            color="primary"
            icon="check"
            label="다른 간편 로그인 "
            class="col-11"
          />
        </div>
        <div class="row justify-around" style="margin-top:20px">
          <q-btn color="primary" icon="check" label="방구석ID 찾기" />
          <q-btn color="primary" icon="check" label="비밀번호 찾기" />
        </div>
      </div>
    </div>
    <div class="row justify-around" style="margin-top:20px;">
      <h3 @click="goToPage('/fitness/community')" style="cursor: pointer;">링피트 커뮤니티</h3>
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

<style></style>
