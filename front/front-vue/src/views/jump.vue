<template>
  <section>
    <q-btn color="primary" icon="check" label="유저보기" @click="showUsers" />
    <q-btn color="primary" icon="check" label="방만들" @click="createRoom" />
    <div class="row">
         <q-card class="my-card col-3" v-for="index in 8" :key="index">
        <video :id="'feed' + (index-1)" style="display: flex;width: 100%;border-radius: 0px 0px 10px 10px;" controls="controls" autoplay="autoplay"></video>
    </q-card>
    </div>
   
  </section>
</template>

<script>
import JanusWrapper from "../janus/JanusRoom";

export default {
  name: "jump",
  components: {},
  props: [],
  data() {
    return {
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
