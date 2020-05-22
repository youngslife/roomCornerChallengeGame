<template>
  <div>
    <q-bar class="bg-white q-header" style="height:80px;">
      <div class="col text-left text-weight-bold">
        <button class="button button1" @click="changeIsDrawer">
          <q-icon name="menu" style="size:100px;" /> 메뉴
        </button>
      </div>
      <div class="col text-center text-weight-bold">
        <a href="/"> <h3>방구석 챌린지</h3></a>
      </div>
      <div class="col text-right text-weight-bold">
        <button class="button button1" onclick="location.href ='signin'">
          회원가입
        </button>
        <button class="button button2" onclick="location.href ='/login'">
          로그인
        </button>
      </div>
    </q-bar>
    <q-separator />
  </div>
</template>

<script>
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
import { mapActions } from "vuex";
export default {
  data() {
    return {
      menuList
    };
  },
  methods: {
    ...mapActions("header", ["changeIsDrawer"])
  }
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
