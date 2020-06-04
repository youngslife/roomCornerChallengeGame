<template>
  <q-card v-if="activeCall.enabled" class="video-group">
    aa
    <div>{{ activeCall.username }}</div>
    <video v-bind:id="remotevideo" autoplay="autoplay" class="remote"></video>
    <video
      v-bind:id="localvideo"
      autoplay="autoplay"
      class="local"
      muted="muted"
    ></video>

    <div class="video-controls">
      <q-btn icon="icon" large error v-on:click.native="onHangup">
        <!-- <v-icon large>call_end</v-icon> -->
      </q-btn>
      <q-btn icon="icon" large v-on:click.native="onMicToggle">
        <!-- <v-icon large>{{ micIcon }}</v-icon> -->
      </q-btn>
      <q-btn icon="icon" large v-on:click.native="onCamToggle">
        <!-- <q-icon large>{{ camIcon }}</q-icon> -->
      </q-btn>
    </div>
    <q-dialog v-model="snackbarOn" seamless position="bottom">
      <q-card style="width: 350px">
        <q-linear-progress :value="0.6" color="pink" />

        <q-card-section class="row items-center no-wrap">
          {{ snackbarMsg }}
          <q-space />
          <q-btn flat round icon="close" v-close-popup />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
function getMicIcon(muted) {
  return muted ? "mic_off" : "mic";
}

function getCamIcon(muted) {
  return muted ? "videocam_off" : "videocam";
}

function getOnOff(status) {
  return status ? "ON" : "OFF";
}

export default {
  name: "call",
  props: ["localvideo", "remotevideo"],
  data: function() {
    return {
      snackbarMsg: "",
      snackbarOn: false,
      micMuted: false,
      micIcon: getMicIcon(false),
      camMuted: false,
      camIcon: getCamIcon(false)
    };
  },
  methods: {
    onMicToggle: function() {
      this.micMuted = !this.micMuted;
      this.micIcon = getMicIcon(this.micMuted);
      this.snackbarMsg = getOnOff(!this.micMuted);
      this.snackbarOn = true;
    },
    onCamToggle: function() {
      this.camMuted = !this.camMuted;
      this.camIcon = getCamIcon(this.camMuted);
      this.snackbarMsg = getOnOff(!this.camMuted);
      this.snackbarOn = true;
    },
    onHangup: function() {
      this.$store.dispatch("hangup");
    }
  },
  computed: {
    activeCall: function() {
      return this.$store.getters.getActive;
    }
  }
};
</script>

<style>
.video-group {
  position: relative;
  width: 600px;
  overflow: hidden;
}

.video-group video.remote {
  position: relative;
  width: 600px;
  height: 300px;
  background-color: #000;
}

.video-group video.local {
  width: 100px;
  height: 100px;
  position: absolute;
  right: 10px;
  top: 10px;
  background-color: #555;
}

.video-group .video-controls {
  position: absolute;
  bottom: 10px;
  width: 100%;
  display: block;
  color: #fff;
}
</style>
