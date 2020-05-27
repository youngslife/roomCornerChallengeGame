<template>
  <div class="col justify-center" style="margin-bottom:150px;">
    <div class="row justify-center">
      <h2 class="col-4" style="margin-top:150px;">로그인</h2>
    </div>
    <div class="row justify-center">
      <div class="q-gutter-y-md col-4" style="max-width: 600px">
        <q-card>
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="bg" label="방구석 ID 로그인" />
            <q-tab name="another" label="다른 간편 계정 로그인" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated style="height:500px">
            <q-tab-panel name="bg">
              <div class="row justify-center " style="margin-top:50px;">
                <q-input
                  type="text"
                  label="email"
                  style="width:80%"
                  v-model="email"
                />
                <q-input
                  class="col-10"
                  clearable
                  v-model="pw"
                  label="비밀번호"
                  :type="isPwd ? 'password' : 'text'"
                  hint
                  style="width:80%"
                />
                <q-btn
                  color="primary"
                  icon="check"
                  label="방구석 ID로 로그인"
                  style="width:80%; margin-top:50px;"
                  @click="DefaultLogin()"
                />
              </div>
              <q-separator style="margin-top:50px;" />
              <div class="row justify-around" style="margin-top:50px;">
                <q-btn color="primary" icon="check" label="방구석ID 찾기" />
                <q-btn color="primary" icon="check" label="비밀번호 찾기" />
                <q-btn color="primary" icon="check" label="방구석 회원가입" />
              </div>
            </q-tab-panel>
            <q-tab-panel name="another">
              <div class="row justify-center" style="margin-top:20px;">
                <q-btn
                  icon="img:https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                  size="md"
                  style="height: 50px"
                  class="full-width"
                  outline
                  @click="GoogleLogin()"
                  label="구글 아이디로 로그인"
                />
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      tab: "bg",
      email: "",
      pw: "",
      isPwd: true
    };
  },
  mounted() {},
  methods: {
    DefaultLogin() {
      this.$store.dispatch("user/postLogIn", {
        user_email: this.email,
        user_pw: this.pw
      });
    },
    GoogleLogin() {
      this.$store.dispatch("user/postGoogleLogIn");
    }
  }
};
</script>

<style scoped></style>
