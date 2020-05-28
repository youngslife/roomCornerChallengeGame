<template>
  <div class="col justify-center" style="margin-bottom:150px;">
    <div class="row justify-center" style="margin-top:100px;">
      <div class="q-gutter-y-md col-4" style="max-width: 600px">
        <q-card>
          <div style="height:800px">
            <div class="row justify-center " style="margin-top:20px;">
              <h4>회원 정보</h4>
              <template v-if="email != ''">
                <q-input
                  outlined
                  flat
                  class="col-10"
                  v-model="email"
                  type="email"
                  :rules="emailRules"
                  lazy-rules
                  readonly
                  label="이메일 주소"
                />
              </template>
              <template v-else>
                <q-input
                  outlined
                  flat
                  class="col-10"
                  v-model="user.user_email"
                  type="email"
                  :rules="emailRules"
                  lazy-rules
                  v-bind:readonly="isReadOnly"
                  label="이메일 주소"
                />
              </template>

              <template v-if="email == ''">
                <q-input
                  class="col-10"
                  clearable
                  clear-icon="close"
                  outlined
                  v-model="user_password"
                  label="비밀번호"
                  :type="isPwd ? 'password' : 'text'"
                  hint
                  v-bind:readonly="isReadOnly"
                />
              </template>

              <q-input
                outlined
                hint
                class="col-10"
                v-model="user.user_name"
                label="이름"
                placeholder="예: 홍길동"
                type="string"
              />
              <q-input
                outlined
                class="col-10"
                v-model="user.user_birthday"
                label="생년월일"
              >
                <template v-slot:after>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      ref="qDateProxy"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="user.user_birthday"
                        @input="() => $refs.qDateProxy.hide()"
                        mask="YYYY-MM-DD"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>

              <div align="center" class="col-10">
                <q-radio v-model="user.user_sex" val="0" label="Male" />
                <q-radio v-model="user.user_sex" val="1" label="Female" />
              </div>
            </div>
            <div class="col-10 row justify-around" style="margin-top:50px;">
              <q-btn
                class="col-4"
                color="red"
                icon="check"
                label="취소"
                @click="cancle"
              />
              <q-btn
                class="col-4"
                color="primary"
                icon="check"
                label="방구석 회원가입"
                @click="SignUp"
              />
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        user_email: "",
        user_name: "",
        user_birthday: "",
        user_sex: "",
        user_login_type: ""
      },
      user_password: "",
      isPwd: true,
      isReadOnly: false,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ]
    };
  },
  computed: {
    email() {
      return this.$store.state.user.tempEmail;
    },
    emailType() {
      return this.$store.state.user.tempEmailType;
    }
  },
  methods: {
    SignUp() {
      this.user.user_login_type = this.emailType;
      let x = true;
      if (this.email != "") {
        this.user.user_email = this.email;
        x = false;
      }
      this.$store.dispatch("user/postSignUp", {
        user: this.user,
        status: x,
        user_password: this.user_password
      });
    },
    cancle() {
      alert("회원가입을 취소 하셨습니다.");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped></style>
