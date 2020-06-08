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
            <div class="text-h5" style=" font-weight:bold;">황야의 무법자</div>
          </q-card-section>
          <q-card-actions align="around">
            <q-btn flat style="color:red">
              <span style="font-size:30px; font-weight:bold;">처 형</span>
            </q-btn>
            <q-btn flat style="color:blue">
              <span style="font-size:30px; font-weight:bold;">치 료</span>
            </q-btn>
          </q-card-actions>
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
            <div class="text-h5" style=" font-weight:bold;">황야의 무법자</div>
          </q-card-section>
          <q-card-actions align="around">
            <q-btn flat style="color:red">
              <span style="font-size:30px; font-weight:bold;">처 형</span>
            </q-btn>
            <q-btn flat style="color:blue">
              <span style="font-size:30px; font-weight:bold;">치 료</span>
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="seamless" seamless position="bottom">
      <q-card
        style="width: 500px; height:400px;"
        class="text-center bg-grey-9 text-white"
      >
        <h1>낮</h1>
        <h1>1 : 00</h1>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import JanusWrapper from "../janus/JanusRoom";

export default {
  name: "jump",
  components: {},
  props: [],
  data() {
    return {
      seamless: true,
      flist: [0, 1, 2],
      slist: [3, 4, 5],
      message: null,
      expanded: false,
      showCreateRoomDialog: false,
      roomName: null,
      janus: null,
      muted: false,
      published: false,
      account: "jtree"
    };
  },
  computed: {
    roomNameFromRoute() {
      return "123";
    }
  },
  mounted() {
    // console.log("mounted !!!!!!!!!!!!!!!!!!!");
    // console.log(this.account);
    // console.log(this.roomName);
    // console.log(this.roomNameFromRoute);

    this.roomName = this.roomNameFromRoute;

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
      //   console.log("ih");
      this.janus = new JanusWrapper(this.roomName);
      //   console.log(this.janus);
    } else {
      // don't join the room
    }
  },
  methods: {
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
