<template>
  <div class="row justify-around">
    <div class="col-3 justify-center">
      <q-btn
        class="col-10"
        color="primary"
        icon="check"
        label="방만들기"
        style="margin-top:180px; width:100%; height:70px;"
        @click="basic = true"
      />

      <q-carousel
        v-model="slide"
        transition-prev="jump-right"
        transition-next="jump-left"
        swipeable
        animated
        control-color="white"
        prev-icon="arrow_left"
        next-icon="arrow_right"
        navigation-icon="radio_button_unchecked"
        navigation
        padding
        arrows
        height="500px"
        class="bg-purple text-white shadow-1 rounded-borders col-10"
        style="margin-top:60px;"
      >
        <q-carousel-slide name="style" class="column no-wrap flex-center">
          <q-icon name="style" size="56px" />
          <div class="q-mt-md text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="tv" class="column no-wrap flex-center">
          <q-icon name="live_tv" size="56px" />
          <div class="q-mt-md text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
    <div class="col-8">
      <div class="text-center"><h2>방 목록</h2></div>
      <div class="justify-around row">
        <q-btn
          flat
          v-for="(room, index) in roomList"
          :key="index"
          style="margin-top:20px;"
          class="col-5"
          @click="enter(room.data.room_no)"
        >
          <q-card class="bg-primary" style="width:100%; padding:0px;">
            <q-card-section>
              <div class="text-subtitle2">{{ room.id }}번 방</div>
              <div class="text-h4">{{ room.data.room_name }}</div>
            </q-card-section>
            <q-card-section class="justify-end row">
              <div class="text-subtitle1">
                참여인원 : {{ room.data.room_person }}
              </div>
            </q-card-section>
          </q-card>
        </q-btn>
      </div>
    </div>

    <q-dialog v-model="basic" transition-show="rotate" transition-hide="rotate">
      <q-card style="width:500px; height:500px;" class="row justify-center">
        <q-card-section class="col-11 text-center">
          <div class="text-h6">마피아 방 만들기</div>
        </q-card-section>

        <q-card-section class="q-pt-none col-9 row">
          <q-input
            v-model="createRoomName"
            type="text"
            label="방이름"
            class="col-12"
          />
          <b class="col-12">참여인원</b>
          <q-btn-toggle
            v-model="createUsers"
            spread
            class="my-custom-toggle col-12"
            no-caps
            rounded
            unelevated
            disable
            toggle-color="primary"
            color="white"
            text-color="primary"
            :options="[
              { label: '4', value: 4 },
              { label: '5', value: 5 },
              { label: '6', value: 6 }
            ]"
          />
        </q-card-section>

        <q-card-actions class="col-11 justify-around">
          <q-btn flat label="Decline" color="primary" v-close-popup />
          <q-btn
            flat
            label="Accept"
            color="primary"
            v-close-popup
            @click="makeRoom()"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import firebase from "../../api/FirebaseService";
export default {
  data() {
    return {
      slide: "style",
      roomList: [],
      basic: false,
      createRoomName: "",
      createUsers: 5
    };
  },
  created() {
    let ref = firebase.getMaifaRoomCurrent();
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type == "added") {
          let doc = change.doc;

          this.roomList.push({
            id: doc.id,
            data: doc.data()
          });
        }
      });
    });
  },
  methods: {
    makeRoom() {
      console.log(Date.now());
      console.log(this.createUsers);
      console.log("userNo");
    },
    enter(roomNo) {
      console.log(roomNo);
      this.$router.push("/game/mafia/room/" + roomNo);
    }
  }
};
</script>

<style>
.q-btn__wrapper {
  padding: 0px 0px;
}
</style>
