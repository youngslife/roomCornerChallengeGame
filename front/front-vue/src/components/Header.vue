<template>
  <div>
    <q-bar class="bg-white q-header" style="height:80px;">
      <div class="col text-left text-weight-bold">
        <button class="button button3" @click="changeIsDrawer">
          <q-icon name="menu" style="font-size:30px;" />
        </button>
      </div>
      <div class="col text-center text-weight-bold">
        <router-link to="/">
          <img :src="require('../assets/logo.png')" />
        </router-link>
      </div>
      <template v-if="user_no > 0">
        <div class="col text-right text-weight-bold">
          <router-link
            class="button account-button button1"
            to="/mypage"
            tag="button"
          >
            마이페이지
          </router-link>
          <button class="button account-button button2" @click="logout">
            로그아웃
          </button>
        </div>
      </template>
      <template v-else>
        <div class="col text-right text-weight-bold">
          <router-link
            class="button account-button button1"
            to="/signin"
            tag="button"
          >
            회원가입
          </router-link>
          <router-link
            class="button account-button button2"
            to="/login"
            tag="button"
          >
            로그인
          </router-link>
        </div>
      </template>
    </q-bar>
    <q-separator />
  </div>
</template>
<script>
import { mapActions } from "vuex";
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
    logout() {
      window.sessionStorage.setItem("user_no", 0);
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
    }
  },
  mounted() {
    this.$store.state.user.user_no = window.sessionStorage.getItem("user_no");
    this.user_no = this.$store.state.user.user_no;
  }
};
</script>

<style>
.button {
  border-radius: 10px;
  border: none;
  color: white;
  padding: 5px 5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 15px;
  transition-duration: 0.4s;
  cursor: pointer;
}
.account-button {
  margin: 4px 2px;
  width: 100px;
}
.button1 {
  background-color: white;
  color: black;
}

.button1:hover {
  background-color: #ffc17a;
  color: white;
}

.button2 {
  background-color: white;
  color: black;
}

.button2:hover {
  background-color: #ebbff8;
  color: white;
}
.button3 {
  background-color: white;
  color: black;
}

.button3:hover {
  background-color: #93f8ac;
  color: white;
}
</style>
