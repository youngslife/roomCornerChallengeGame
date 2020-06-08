<template>
  <q-card class="blue white--text incomingcallcard ">
    {{ caller }}

    <q-card row actions>
      <q-btn flat dark v-on:click.native="onAnswer()">Answer</q-btn>
      <q-spacer></q-spacer>
      <q-btn flat dark>Decline</q-btn>
    </q-card>
  </q-card>
</template>

<script>
export default {
  name: "incomingcall",
  props: ["caller"],
  computed: {
    count: function() {
      return this.$store.getters.getCount;
    }
  },
  methods: {
    onAnswer: function() {
      this.$store.dispatch("answer", { username: this.caller });
    },
    onHangup: function() {
      this.$store.dispatch("hangup");
    }
  }
};
</script>

<style>
.incomingcallcard {
  max-width: 20em;
}
</style>
