<template>
  <div>
    <q-bar class="bg-white q-header" style="height:80px;">
      <div class="col text-left text-weight-bold">
        <button class="button button1" @click="changeIsDrawer">
          <q-icon name="menu" style="size:100px;" />메뉴
        </button>
      </div>
      <div class="col text-center text-weight-bold">
        <img :src="require('../assets/logo.png')" onclick="location.href ='/'" />
      </div>
      <template v-if="user_no > 0">
        <div class="col text-right text-weight-bold">
          <button class="button button1" onclick="location.href ='mypage'">마이페이지</button>
          <button class="button button2" @click="logout">로그아웃</button>
        </div>
      </template>
      <template v-else>
        <div class="col text-right text-weight-bold">
          <button class="button button1" onclick="location.href ='signin'">회원가입</button>
          <button class="button button2" onclick="location.href ='/login'">로그인</button>
        </div>
      </template>
    </q-bar>
    <q-separator />
  </div>
</template>
<script>
import { mapActions } from "vuex";
import router from "@/router"
const menuList = [
  {
    icon: "inbox",
    label: "Inbox",
    separator: true
  },
  {
    icon: "send",
    label: "Outbox",
    separator: false
  },
  {
    icon: "delete",
    label: "Trash",
    separator: false
  },
  {
    icon: "error",
    label: "Spam",
    separator: true
  },
  {
    icon: "settings",
    label: "Settings",
    separator: false
  },
  {
    icon: "feedback",
    label: "Send Feedback",
    separator: false
  },
  {
    icon: "help",
    iconColor: "primary",
    label: "Help",
    separator: false
  }
];
export default {
  data() {
    return {
      menuList
    };
  },
  methods: {
    ...mapActions("header", ["changeIsDrawer"]),
    async logout() {
      await window.sessionStorage.setItem("user_no", 0);
      console.log('여긴가')
      if (this.sessoinUser == 0) {
        console.log(3847298)
        // console.log('dafasdf', this.sessoinUser )
        await router.go()
        console.log(432234)
      }
    }
  },
  computed: {
    user_no: {
      get() {
        return this.$store.state.user.user_no;
      },
      set(val) {
        this.$store.commit("user/setUserNo", { user_no: val });
      }
    },
    sessoinUser() {
      console.log('안돼?')
      return window.sessionStorage.getItem("user_no")
    }
  },
  mounted() {
    this.$store.state.user_no = window.sessionStorage.getItem("user_no");
    this.user_no = this.$store.state.user_no;
  },
};
</script>

<style>
.button {
  border: none;
  color: white;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
}

.button1 {
  background-color: white;
  color: black;
  border: 2px solid #4caf50;
}

.button1:hover {
  background-color: #4caf50;
  color: white;
}

.button2 {
  background-color: white;
  color: black;
  border: 2px solid #008cba;
}

.button2:hover {
  background-color: #008cba;
  color: white;
}
</style>
