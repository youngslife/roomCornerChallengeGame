<template>
  <div>
    {{ msg }}
    <call
      :localvideo="activeCall.localVideo"
      :remotevideo="activeCall.remoteVideo"
    ></call>
    <incomingcall
      v-for="call in incomingCalls"
      :caller="call.username"
      :key="call.username"
    ></incomingcall>

    <q-btn
    
      v-on:click.native="onHangup()"
      >hangup</q-btn
    >
    <q-btn
      :primary="callReady"
      :disabled="!callReady"
      v-on:click.native="call()"
      >Call</q-btn
    >
  </div>
</template>

<script>
import Call from "../components/Janus/Call";
import IncomingCall from "../components/Janus/IncomingCall";
export default {
  components: {
    call: Call,
    incomingcall: IncomingCall
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      activeCalls: [{ active: false }]
    };
  },
  methods: {
    call() {
      this.$store.dispatch("initOutgoing", {
        username: "main@h11"
      });
    },
    onHangup: function() {
      this.$store.dispatch("hangup");
    }
  },
  computed: {
    incomingCalls: function() {
      console.log(this.$store.getters.getIncoming)
      return this.$store.getters.getIncoming;
    },
    callReady: function() {
      return this.$store.getters.getCallReady;
    },
    activeCall: function() {
      return this.$store.getters.getActive;
    }
  }
};
</script>

<style></style>
