<template>
  <div class="row justify-around" style="height:700px; margin-top:20px">
    <div class="col-7">
      <q-tabs v-model="tab" class="text-teal row" @click="check()">
<<<<<<< HEAD
        <q-tab name="mails" icon="mail" label="자유게시판" class="col-4" />
        <q-tab name="alarms" icon="alarm" label="질문게시판" class="col-4" />
        <q-tab name="movies" icon="movie" label="팁과공략" class="col-4" />
      </q-tabs>
      <template v-if="isWrite">
        <writer game="마피아" type="tab"></writer>
      </template>
      <template v-else>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="mails">
            <div class="row justify-end">
              <q-btn
                color="primary"
                icon="check"
                label="글쓰기"
                @click="write('asd')"
              />
            </div>
            <q-list bordered>
              <q-item v-for="index in 10" :key="index" clickable v-ripple>
                <q-item-section avatar>
                  <q-icon color="primary" name="bluetooth" />
                </q-item-section>
                <q-item-section>Icon as avatar</q-item-section>
              </q-item>
            </q-list>
          </q-tab-panel>
          <q-tab-panel name="alarms">
            <div class="text-h6">Alarms</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
          <q-tab-panel name="movies">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
=======
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
          <detail
            game="링피트"
            :type="category"
            :post_no="post_no"
            :isDetail.sync="isDetail"
          />
        </template>
        <template v-else>
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="자유">
              <div class="row justify-end">
                <q-btn
                  color="primary"
                  icon="check"
                  label="글쓰기"
                  @click="write()"
                />
              </div>
              <q-list bordered>
                <q-item
                  v-for="(post, index) in board"
                  :key="index"
                  clickable
                  v-ripple
                >
                  <q-item-section avatar>
                    <q-icon color="primary" name="bluetooth" />
                  </q-item-section>
                  <q-item-section @click="goPostDetail(post.post_no)">{{
                    post.post_title
                  }}</q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>
            <q-tab-panel name="질문">
              <div class="row justify-end">
                <q-btn
                  color="primary"
                  icon="check"
                  label="글쓰기"
                  @click="write()"
                />
              </div>
              <q-list bordered>
                <q-item
                  v-for="(post, index) in board"
                  :key="index"
                  clickable
                  v-ripple
                >
                  <q-item-section avatar>
                    <q-icon color="primary" name="bluetooth" />
                  </q-item-section>
                  <q-item-section @click="goPostDetail(post.post_no)">{{
                    post.post_title
                  }}</q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>
            <q-tab-panel name="정보">
              <div class="row justify-end">
                <q-btn
                  color="primary"
                  icon="check"
                  label="글쓰기"
                  @click="write()"
                />
              </div>
              <q-list bordered>
                <q-item
                  v-for="(post, index) in board"
                  :key="index"
                  clickable
                  v-ripple
                >
                  <q-item-section avatar>
                    <q-icon color="primary" name="bluetooth" />
                  </q-item-section>
                  <q-item-section @click="goPostDetail(post.post_no)">{{
                    post.post_title
                  }}</q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>
          </q-tab-panels>
        </template>
>>>>>>> feature/maifasite
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
<<<<<<< HEAD
export default {
  data() {
    return {
      tab: "mails",
      isWrite: false
    };
  },
  components: {
    writer
  },
  methods: {
    write(a) {
      console.log(this.isWrite);
      console.log(a);
      this.isWrite = true;
    },
    check() {
      console.log("gigigi");
      this.isWrite = false;
=======
import detail from "../../components/PostDetail";
export default {
  data() {
    return {
      tab: "자유",
      category: "",
      isWrite: false,
      isDetail: false,
      post_no: 0
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
      this.isDetail = false;
    },
    getBoardList() {
      this.$store.dispatch("board/getBoardListByType", {
        location: 2,
        title: "커뮤니티",
        page_no: 1
      });
    },
    goPostDetail(post_no) {
      this.post_no = post_no;
      this.isDetail = true;
>>>>>>> feature/maifasite
    }
  }
};
</script>

<style></style>
