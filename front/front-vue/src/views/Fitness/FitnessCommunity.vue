<template>
  <div class="row justify-around" style="height:700px; margin-top:20px">
    <div class="col-7">
      <q-tabs v-model="tab" class="text-teal row" @click="check()">
        <q-tab name="자유" icon="mail" label="자유게시판" class="col-4" />
        <q-tab name="질문" icon="alarm" label="질문게시판" class="col-4" />
        <q-tab name="정보" icon="movie" label="팁과공략" class="col-4" />
      </q-tabs>
      <!-- {{board}} -->
      <template v-if="isWrite">
        <writer game="링피트" :type="category" :isWrite.sync="isWrite"></writer>
      </template>
      <template v-else>
        <template v-if="isDetail">
          <detail game="링피트" :type="category" :post="post" :isDetail.sync="isDetail" />
        </template>
        <template v-else>
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="자유">
              <div class="row justify-end">
                <q-btn color="primary" icon="check" label="글쓰기" @click="write()" />
              </div>
              <q-list bordered>
                <q-item v-for="(post,index) in board" :key="index" clickable v-ripple>
                  <q-item-section avatar>
                    <q-icon color="primary" name="bluetooth" />
                  </q-item-section>
                  <q-item-section>{{post}}</q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>
            <q-tab-panel name="질문">
              <div class="row justify-end">
                <q-btn color="primary" icon="check" label="글쓰기" @click="write()" />
              </div>
              <q-list bordered>
                <q-item v-for="(post,index) in board" :key="index" clickable v-ripple>
                  <q-item-section avatar>
                    <q-icon color="primary" name="bluetooth" />
                  </q-item-section>
                  <q-item-section>{{post}}</q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>
            <q-tab-panel name="정보">
              <div class="row justify-end">
                <q-btn color="primary" icon="check" label="글쓰기" @click="write()" />
              </div>
              <q-list bordered>
                <q-item v-for="(post,index) in board" :key="index" clickable v-ripple>
                  <q-item-section avatar>
                    <q-icon color="primary" name="bluetooth" />
                  </q-item-section>
                  <q-item-section @click="goPostDetail(post)">{{post.post_title}}</q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>
          </q-tab-panels>
        </template>
      </template>
    </div>
    <!-- 사이드바 -->
    <div class="col-2">
      <q-list bordered>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="bluetooth" />
          </q-item-section>
          <q-item-section>Icon as avatar</q-item-section>
        </q-item>
        <q-item>
          <q-item-section top avatar>
            <q-avatar color="primary" text-color="white" icon="bluetooth" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Single line item</q-item-label>
            <q-item-label caption lines="2">Secondary line text.</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
            <q-icon name="star" color="yellow" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section top avatar>
            <q-avatar color="primary" text-color="white" icon="bluetooth" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Single line item</q-item-label>
            <q-item-label caption lines="2">Secondary line text.</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
            <q-icon name="star" color="yellow" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import writer from "../../components/PostWrite";
import detail from "../../components/PostDetail";
export default {
  data() {
    return {
      tab: "자유",
      category: "",
      isWrite: false,
      isDetail: false,
      post: {}
    };
  },
  components: {
    writer,
    detail
  },
  mounted() {
    this.getBoardList();
  },
  computed: {
    boardList() {
      return this.$store.state.board.boardList;
    },
    board() {
      return this.boardList.filter(el => el.board_subtitle === this.tab)[0] ===
        undefined
        ? []
        : this.boardList.filter(el => el.board_subtitle === this.tab)[0]
            .board_postList;
    }
  },
  methods: {
    write() {
      if (this.tab === "자유") {
        this.category = "자유게시판";
      } else if (this.tab === "질문") {
        this.category = "질문게시판";
      } else this.category = "팁과공략";
      this.isWrite = true;
    },
    check() {
      this.isWrite = false;
    },
    getBoardList() {
      this.$store.dispatch("board/getBoardListByType", {
        location: 2,
        title: "커뮤니티",
        page_no: 1
      });
    },
    goPostDetail(post) {
      this.post = post;
      this.isDetail = true;
    }
  }
};
</script>

<style></style>
