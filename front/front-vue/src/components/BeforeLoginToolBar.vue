<template>
  <q-bar dark class="bg-black text-white">
    <div class="col text-left text-weight-bold q-pa-lg">
      <q-btn
        dense
        flat
        round
        label="마피아"
        size="20px"
        color="white"
        class="q-pa-lg"
        @click="clickMenu(false, 2)"
      />
      <q-btn
        dense
        flat
        round
        label="링피트"
        size="20px"
        color="yellow"
        class="q-pa-lg"
        @click="clickMenu(false, 3)"
      />
      <q-btn
        dense
        flat
        round
        label="기본 소개"
        size="20px"
        class="q-pa-lg"
        @click="clickMenu(false, 4)"
      />
    </div>
    <div class="col text-center text-weight-bold">
      In-Room-Chalinge
    </div>
    <div class="col text-right text-weight-bold">
      <q-btn
        dense
        flat
        round
        label="login"
        size="20px"
        color="green"
        class="q-pa-lg"
        @click="clickMenu(true, 1)"
      />
    </div>
  </q-bar>
</template>

<script>
export default {
  methods: {
    clickMenu(check, slide) {
      this.$emit("isLoginButton", check, slide);
    }
  }
};
</script>

<style></style>
