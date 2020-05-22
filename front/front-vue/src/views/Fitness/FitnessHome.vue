<template>
  <div>
    <q-carousel animated v-model="slide" infinite style="height:710px;">
      <q-carousel-slide
        v-for="(card, index) in mainCard"
        :name="card.name"
        :img-src="card.imgSrc"
        :key="index"
      >
        <!--이부분은 컴포넌트화시키면 될듯  -->
        <div class="absolute-top justify-around row" style="height:50px;margin-top:20px;">
          <div class="col-2 flex flex-center" >
            <q-btn  icon="check" label="피트니스로고" style="width:100%; height:100%; color:white; font-size:25px;" class="text-weight-bold"/>
          </div>
          <q-btn
            v-for="index in 4"
            :key="index"
            style=" color:white; font-size:25px;" 
            label="Persistent Menu"
            class="col-2 text-weight-bold"
          >
            <q-menu persistent auto-close>
              <q-list style="min-width: 350px">
                <q-item clickable>
                  <q-item-section>New tab</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>New incognito tab</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section>Recent tabs</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>History</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Downloads</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section>Settings</q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable>
                  <q-item-section>Help &amp; Feedback</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
        <div class="absolute-bottom">
          <q-btn-toggle
            v-model="slide"
            spread
            text-color="white"
            toggle-color="brand"
            :options="[
              { label: '링피트1', value: 'first' },
              { label: '링피트2', value: 'second' },
              { label: '링피트3', value: 'third' }
            ]"
            style="height:100px; width:100%;"
          />
        </div>
      </q-carousel-slide>
    </q-carousel>
    <div class="row" style="background:gray;">
      <div class="col-4 flex flex-center">
        <q-btn
          color="primary"
          icon="check"
          label="어떠한 공간"
          style="width:90%; height:200px; margin-top:20px; margin-bottom:20px;"
        />
      </div>
      <div class="col-4 flex flex-center">
        <button
          style="border-radius:50%; width:200px; height:200px; margin-top:20px;"
        >
          시작버튼
        </button>
      </div>
      <div class="col-4 ">
        <div class="row justify-around" style="margin-top:20px;height:70px;">
          <q-btn color="primary" icon="check" label="로그인" class="col-5" />
          <q-btn color="primary" icon="check" label="회원가입" class="col-5" />
        </div>
        <div class="row justify-center" style="margin-top:20px">
          <q-btn
            color="primary"
            icon="check"
            label="다른 간편 로그인 "
            class="col-11"
          />
        </div>
        <div class="row justify-around" style="margin-top:20px">
          <q-btn color="primary" icon="check" label="방구석ID 찾기" />
          <q-btn color="primary" icon="check" label="비밀번호 찾기" />
        </div>
      </div>
    </div>
    <div class="row justify-around" style="margin-top:50px;">
      <div class="col-3 justify-center">
        <q-carousel
          v-model="slide2"
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
          height="300px"
          class="bg-purple text-white shadow-1 rounded-borders col-10"
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
      <div class="col-6 row">
        <div class="col-7">
          <q-list bordered class="col ">
            <q-item v-for="index in 4" clickable v-ripple :key="index" class="col-2" style="margin-top:22px; margin-bottom:22px;">
              <q-item-section avatar>
                <q-icon color="primary" name="bluetooth" />
              </q-item-section>
              <q-item-section>Icon as avatar</q-item-section>
            </q-item>
          </q-list>
        </div>
        <q-separator spaced inset vertical />
        <div class="col-4 justify-around" style="background:gray">
                <q-card class="my-card col-4 ">
                    <img src="https://cdn.quasar.dev/img/mountains.jpg"  style="height:100px">
                </q-card>
                 <q-card class="my-card col-4" >
                    <img src="https://cdn.quasar.dev/img/mountains.jpg" style="height:100px">
                </q-card>
        </div>
      </div>
    </div>
    <div class="row justify-around" style="margin-top:20px;">
      <div class="col-3 "></div>
      <div class="col-6 text-center"><h2>링피트 커뮤니티</h2></div>
      <div class="col-3 text-center">
        <q-btn color="primary" icon="add" style="margin-top:50px" />
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-10 row justify-around">
        <q-card v-for="index in 4" class="my-card col-2" :key="index">
          <img src="https://cdn.quasar.dev/img/mountains.jpg" />
          <q-card-section>
            <div class="text-h6">Our Changing Planet</div>
            <div class="text-subtitle2">by John Doe</div>
          </q-card-section>
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slide: "first",
      mainCard: [
        { name: "first", imgSrc: require("../../assets/mapia.jpeg") },
        { name: "second", imgSrc: require("../../assets/ring.jpeg") },
        { name: "third", imgSrc: require("../../assets/room.png") }
      ],
      slide2: "tv"
    };
  },
  methods: {},
  computed: {}
};
</script>

<style>
.text-brand {
  color: white;
}
.bg-brand {
  background: rgba(0, 102, 255, 0.4);
}
</style>
