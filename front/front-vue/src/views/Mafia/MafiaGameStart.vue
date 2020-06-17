<template>
  <div class="bg-grey-7" style="height:1100px;">
    <!-- <q-btn color="primary" icon="check" label="유저보기" @click="showUsers" />
    <q-btn color="primary" icon="check" label="방만들" @click="createRoom" /> -->
    <div class="row">
      <div class="col-6 justify-around row">
        <q-card
          class="bg-grey-9  col-5"
          v-for="index in flist"
          :key="index"
          style="height:450px; margin-top:50px;"
        >
          <video
            poster="https://images.assetsdelivery.com/compings_v2/vbaleha/vbaleha1402/vbaleha140200171.jpg"
            :id="'feed' + index"
            style="width:100%;"
            autoplay="autoplay"
          ></video>
          <q-card-section class="text-white text-center">
            <div
              :id="'name' + index"
              class="text-h5"
              style=" font-weight:bold;"
            >
              황야의 무법자
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-6 justify-around row">
        <q-card
          class="bg-grey-9  col-5"
          v-for="index in slist"
          :key="index"
          style="height:450px; margin-top:50px;"
        >
          <video
            poster="https://images.assetsdelivery.com/compings_v2/vbaleha/vbaleha1402/vbaleha140200171.jpg"
            :id="'feed' + index"
            style="width:100%;"
            autoplay="autoplay"
          ></video>
          <q-card-section class="text-white text-center">
            <div
              :id="'name' + index"
              class="text-h5"
              style=" font-weight:bold;"
            ></div>
          </q-card-section>
        </q-card>
        <q-card class="bg-grey-9  col-6" style="height:450px; margin-top:50px;">
          <q-card-section class="text-white text-center col-10">
            <h4>투표용지</h4>
          </q-card-section>
          <q-card-section
            class="text-white text-center col-10 justify-around row"
          >
            <q-btn
              color="bg-grey-5"
              class="col-5"
              style="margin-top:20px;"
              v-for="(user, index) in userList"
              :key="index"
            >
              {{ user.data.user_nickname }}
            </q-btn>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="seamless" seamless position="bottom">
      <!-- 페이즈 메이커 -->
      <q-card
        style="width: 500px; height:400px;"
        class="text-center bg-grey-9 text-white"
      >
        <template v-if="true">
          <h1>{{ pp }}</h1>
          <h1>{{ timer }}</h1>
        </template>

        <iframe
          src="../../assets/sound/silence.mp3"
          allow="autoplay"
          id="audio"
          style="display:none"
        ></iframe>

        <audio id="audio" autoplay>
          <source src="../../assets/sound/마피아인트로.mp3" />
        </audio>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import JanusWrapper from "../../janus/JanusRoom";
import firebase from "../../api/FirebaseService";
export default {
  data() {
    return {
      seamless: true,
      flist: [0, 1, 2],
      slist: [3, 4],
      message: null,
      expanded: false,
      showCreateRoomDialog: false,
      roomName: null,
      janus: null,
      muted: false,
      published: false,
      account: "jtree",
      timer: 30,
      userList: [],
      phase: [
        { mod: "준비시간", time: 32 },
        { mod: "낮", time: 60 },
        { mod: "낮 투표", time: 30 },
        {
          mod: "밤",
          time: 60
        }
      ],
      pi: 0,
      pp: ""
    };
  },
  created() {
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
    roomNameFromRoute() {
      return this.$route.params.roomNo;
    },
    user() {
      return this.$store.state.user.user;
    }
  },
  async mounted() {
    this.$nextTick(() => {
      var myaudio = document.getElementById("myt");
      myaudio.play();
    });
    // console.log("mounted !!!!!!!!!!!!!!!!!!!");
    // console.log(this.account);
    // console.log(this.roomName);
    // console.log(this.roomNameFromRoute);
    let caq = firebase.checkMyInfo(
      this.$route.params.roomNo,
      this.$store.state.user.user.user_no
    );
    this.roomName = this.roomNameFromRoute;
    console.log("-----------------");
    var myinfo = await caq.then(ex => {
      return ex;
    });
    if (this.account === null || this.account === undefined) {
      //   console.log("this.userName: " + this.account);
      this.showCreateRoomDialog = true;
      return;
    }

    if (this.roomName === null || this.roomName === undefined) {
      //   console.log("this.userName: " + this.account);
      this.showCreateRoomDialog = true;
      return;
    }

    if (this.roomNameFromRoute !== undefined) {
      console.log(myinfo.user_nickname + ", " + myinfo.user_no);
      this.janus = new JanusWrapper(
        this.roomName,
        myinfo.user_no,
        myinfo.user_nickname
      );
      //   console.log(this.janus);
    } else {
      // don't join the room
    }
    this.pp = this.phase[0].mod;
    this.pi = 0;
    this.timer = this.phase[0].time;
    setTimeout(this.countdown, 1000);
  },
  methods: {
    countdown() {
      if (this.timer > 0) {
        this.timer = this.timer - 1;
        setTimeout(this.countdown, 1000);
      } else if (this.timer <= 0) {
        console.log("hi");
        this.pi++;
        this.timer = this.phase[this.pi].time;
        this.pp = this.phase[this.pi].mod;
        setTimeout(this.countdown, 1000);
      }
    },
    ad() {
      console.log(document.getElementById("qb1"));
    },
    confirmRoomName() {
      this.showCreateRoomDialog = false;
      //   console.log("Helloooooo: " + this.roomName);
      this.createRoom();
    },
    createRoom(events) {
      console.log(events);
      this.janus = new JanusWrapper(this.roomName);
      console.log(this.janus);
    },
    leave() {
      //   console.log("We are going to attempt to disconnect.");
      this.janus.disconnect();
    },
    join() {
      //   console.log("We are going to attempt to connect.");
      this.janus.connect(this.roomName);
    },
    showUsers() {
      //   console.log("showUsers in room ", this.roomName);
      this.janus.showUsers(this.roomName);
    },
    toggleMute() {
      //   console.log("Toggling microphone");

      var isMuted = this.janus.toggleMute();
      this.muted = isMuted;
    },
    unpublish() {
      //   console.log("Unpublishing feed");
      this.janus.unpublishOwnFeed();
      this.published = !this.published;
    },
    publish() {
      //   console.log("Publishing feed");
      this.janus.publishOwnFeed(true);
      this.published = !this.published;
    }
  },
  destroyed: function() {
    console.log("Destroyed lifecycle .... ");
    this.message = null;
    this.expanded = false;
    this.showCreateRoomDialog = false;
    this.roomName = null;
    this.janus = null;
    this.muted = false;
    this.published = false;
  }
};
</script>

<style></style>
