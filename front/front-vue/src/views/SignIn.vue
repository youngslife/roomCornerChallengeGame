<template>
  <div class="col justify-center" style="margin-bottom:150px;">
    <div class="row justify-center" style="margin-top:100px;">
      <div class="q-gutter-y-md col-4" style="max-width: 600px">
        <q-card>
          <div style="height:700px">
            <div class="row justify-center " style="margin-top:20px;">
              <h4>회원 정보</h4>
              <q-input type="text" label="id" style="width:80%" />
              <q-input
                type="text"
                label="pw"
                style="width:80%; margin-top:20px;"
              />
              <q-input
                type="text"
                label="check pw"
                style="width:80%; margin-top:20px;"
              />
              <q-input
                type="text"
                label="name"
                style="width:80%; margin-top:20px;"
              />
              <q-input
                type="text"
                label="age"
                style="width:80%; margin-top:20px;"
              />
              <q-input
                type="text"
                label="etc"
                style="width:80%; margin-top:20px;"
              />
            </div>
            <div class="row justify-center" style="margin-top:50px;">
              <q-btn color="primary" icon="check" label="방구석 회원가입" />
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
// import firebase from "firebase";

export default {
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped></style>
