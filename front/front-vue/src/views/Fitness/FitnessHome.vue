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
        >시작버튼</button>
      </div>
      <div class="col-4">
        <div class="row justify-around" style="margin-top:20px;height:70px;">
          <q-btn color="primary" icon="check" label="로그인" class="col-5" />
          <q-btn color="primary" icon="check" label="회원가입" class="col-5" />
        </div>
        <div class="row justify-center" style="margin-top:20px">
          <q-btn color="primary" icon="check" label="다른 간편 로그인 " class="col-11" />
        </div>
        <div class="row justify-around" style="margin-top:20px">
          <q-btn color="primary" icon="check" label="방구석ID 찾기" />
          <q-btn color="primary" icon="check" label="비밀번호 찾기" />
        </div>
      </div>
    </div>
    <div class="row justify-around" style="margin-top:50px;">
      <div class="col-3 justify-center">
        <q-carousel
          v-model="slide2"
          transition-prev="jump-right"
          transition-next="jump-left"
          swipeable
          animated
          control-color="white"
          prev-icon="arrow_left"
          next-icon="arrow_right"
          navigation-icon="radio_button_unchecked"
          navigation
          padding
          arrows
          height="300px"
          class="bg-purple text-white shadow-1 rounded-borders col-10"
        >
          <q-carousel-slide name="style" class="column no-wrap flex-center">
            <q-icon name="style" size="56px" />
            <div class="q-mt-md text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
          </q-carousel-slide>
          <q-carousel-slide name="tv" class="column no-wrap flex-center">
            <q-icon name="live_tv" size="56px" />
            <div class="q-mt-md text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
          </q-carousel-slide>
        </q-carousel>
      </div>
      <div class="col-6 row">
        <div class="col-7">
          <q-list bordered class="col">
            <q-item
              v-for="index in 4"
              clickable
              v-ripple
              :key="index"
              class="col-2"
              style="margin-top:22px; margin-bottom:22px;"
            >
              <q-item-section avatar>
                <q-icon color="primary" name="bluetooth" />
              </q-item-section>
              <q-item-section>Icon as avatar</q-item-section>
            </q-item>
          </q-list>
        </div>
        <q-separator spaced inset vertical />
        <div class="col-4 justify-around" style="background:gray">
          <q-card class="my-card col-4">
            <img src="https://cdn.quasar.dev/img/mountains.jpg" style="height:100px" />
          </q-card>
          <q-card class="my-card col-4">
            <img src="https://cdn.quasar.dev/img/mountains.jpg" style="height:100px" />
          </q-card>
        </div>
      </div>
    </div>
    <div class="row justify-around" style="margin-top:20px;">
      <div class="col-3"></div>
      <div class="col-6 text-center">
        <h2>링피트 커뮤니티</h2>
      </div>
      <div class="col-3 text-center">
        <q-btn
          @click="goToPage('/fitness/community')"
          color="primary"
          icon="add"
          style="margin-top:50px"
        />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-10 row justify-around">
        <q-card v-for="(board, i) in boardList" class="my-card col-3" :key="i">
          <img src="https://cdn.quasar.dev/img/mountains.jpg" />
          <q-card-section>
            <div class="text-h6">{{ board.board_subtitle }}</div>
            <q-card
              class="text-subtitle2"
              v-for="(post, j) in board.board_postList.slice(0, 5)"
              :key="j"
            ><span>{{ post.post_user.user_name }}</span>
            <span>{{ post.post_title }}</span></q-card>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row justify-around" style="margin-top:20px;">
      <div class="col-3"></div>
      <div class="col-6 text-center">
        <h2>링피트 랭킹</h2>
      </div>
      <div class="col-3 text-center">
        <q-btn
          @click="goToPage('/fitness/rank')"
          color="primary"
          icon="add"
          style="margin-top:50px"
        />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-10 row justify-around">
        <q-card v-for="index in 4" class="my-card col-2" :key="index">
          <img src="https://cdn.quasar.dev/img/mountains.jpg" />
          <q-card-section>
            <div class="text-h6">Our Changing Planet</div>
            <div class="text-subtitle2">by John Doe</div>
          </q-card-section>
          <q-card-section>Lorem ipsum dolor sit amet, consectetur adipiscing elit</q-card-section>
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
    },
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
