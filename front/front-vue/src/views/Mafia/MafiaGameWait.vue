<template>
  <div class="row justify-around">
    <div class="col-3 justify-center">
      <q-btn
        class="col-10"
        color="primary"
        icon="check"
        label="게임 시작"
        style="margin-top:180px; width:100%; height:70px;"
        @click="gamestart()"
      />

      <q-carousel
        v-model="slide"
        transition-prev="jump-right"
        transition-next="jump-left"
        swipeable
        animated
        autoplay
        control-color="white"
        prev-icon="arrow_left"
        next-icon="arrow_right"
        navigation-icon="radio_button_unchecked"
        navigation
        padding
        arrows
        height="500px"
        class="bg-purple text-white shadow-1 rounded-borders col-10"
        style="margin-top:60px;"
      >
        <q-carousel-slide name="style" class="column no-wrap flex-center">
          <q-icon name="home" size="56px" />
          <div class="q-mt-md text-center">
            <h6>{{ roomInfo.room_no }}번 방</h6>
            <h2>{{ roomInfo.room_name }}</h2>
            <h4>최대 참여 인원 : {{ roomInfo.room_person }}</h4>
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="tv" class="column no-wrap flex-center">
          <div class="q-mt-md text-center">
            <h2>
              인원분배 <br /><br />
              마피아 1명 <br />의사 1명 <br />경찰 1명 <br />시민 2명
            </h2>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
    <div class="col-8">
      <div class="text-center"><h2>유저 목록</h2></div>
      <div class="justify-around row">
        <q-card
          flat
          v-for="(wuser, index) in userList"
          :key="index"
          style="margin-top:20px;"
          class="col-5 bg-primary text-white"
        >
          <q-card-section class="text-center">
            <template v-if="wuser.data.user_nickname != ''">
              <h4>{{ wuser.data.user_nickname }}</h4>
            </template>
            <template v-else>
              <h4>대기중</h4>
            </template>
          </q-card-section>
          <q-card-section class="text-center">
            <template v-if="wuser.data.user_nickname != ''">
              <h4>준비 완료</h4>
            </template>
            <template
              v-else-if="
                wuser.data.user_no == user.user_no &&
                  wuser.data.user_nickname == ''
              "
            >
              <q-input v-model="myname" type="text" label="닉네임" />
              <q-btn
                color="primary"
                icon="check"
                label="설정"
                @click="setmyname()"
              />
            </template>
            <template v-else><h4>닉네임 설정중</h4> </template>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../../api/FirebaseService";
import MafiaService from "../../api/MafiaService";
export default {
  data() {
    return {
      slide: "style",
      userList: [],
      roomInfo: {},
      myname: ""
    };
  },
  created() {
    firebase
      .getMaifaRoomInfo(this.$route.params.roomNo)
      .get()
      .then(Response => {
        this.roomInfo = Response.data();
      });
    let ref = firebase.getMaifaUserCurrent(this.$route.params.roomNo);
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type == "added") {
          let doc = change.doc;
          this.userList.push({
            id: doc.id,
            data: doc.data()
          });
        }
        if (change.type === "modified") {
          console.log("zzzzz", change.doc.data());
          console.log(this.userList[0]);
          // let index = 0;
          //이것을 원한 것이냐
          for (let i = 0; i < this.userList.length; ++i) {
            console.log("userList[", i, "]:", this.userList[i].data);
            if (this.userList[i].data.user_no === change.doc.data().user_no) {
              this.userList[
                i
              ].data.user_nickname = change.doc.data().user_nickname;
            }
          }
          //아니면 이것을 원한 것이냐
          // let cnt = 0;
          // for (let i = 0; i < this.userList.length; ++i) {
          //   let tempName = this.userList[i].data.user_nickname;
          //   if (tempName == undefined || tempName == null || tempName === "") {
          //     console.log("이거면 준비가 덜 되었다는 뜻이 아니겠는가..?");
          //   } else {
          //     cnt++;
          //   }
          // }
          // if (cnt == this.room_person) {
          //   console.log("We are ready!!!");
          // }
          // console.log(this.userList[0]);
        }
        if (change.type === "removed") {
          console.log("Removed city: ", change.doc.data(), change.doc.id);
        }
      });
    });
  },
  computed: {
    user() {
      console.log(this.$store.state.user.user);
      return this.$store.state.user.user;
    }
  },
  methods: {
    setmyname() {
      console.log(this.$route.params.roomNo);
      MafiaService.setNickname({
        room_no: this.$route.params.roomNo,
        user_no: this.user.user_no,
        user_nickname: this.myname
      });
      console.log(this.myname);
    },
    async gamestart() {
      let ss = await firebase.checkStart(this.$route.params.roomNo);
      console.log(ss);
      if (ss) {
        console.log("start");
        this.$router.push("/game/mafia/start/" + this.$route.params.roomNo);
      } else {
        alert("아직 모두 준비가 되지 않앗다.");
      }
    }
  },
  destroyed() {
    console.log("Destroyed lifecycle .... ");
    console.log("exit room function call");
  }
};
</script>

<style>
.q-btn__wrapper {
  padding: 0px 0px;
}
h4 {
  margin: 20px 0px;
}
</style>
