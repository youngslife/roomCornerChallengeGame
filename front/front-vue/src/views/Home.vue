<template>
  <div>
    <q-carousel animated v-model="slide" infinite style="height:610px;">
      <q-carousel-slide
        v-for="(card, index) in mainCard"
        :name="card.name"
        :img-src="card.imgSrc"
        :key="index"
        @click="goPath(this)"
      >
        <div class="absolute-bottom">
          <q-btn-toggle
            v-model="slide"
            spread
            text-color="white"
            toggle-color="brand"
            :options="[
              { value: 'first', slot: 'first' },
              { value: 'second', slot: 'second' },
              { abel: '방탈출', value: 'third', slot: 'third' }
            ]"
            style="height:100px; width:100%;"
          >
            <template v-slot:first>
              <div style="height:100px; width:100%;" @click="change('first')" class="flex flex-center">
                sd
              </div>
            </template>
            <template v-slot:second>
              <div style="height:100px; width:100%;" @click="change('second')" class="flex flex-center">
                helo
              </div>
            </template>
            <template v-slot:third>
              <div style="height:100px; width:100%;" @click="change('third')" class="flex flex-center">
                helo
              </div>
            </template>
          </q-btn-toggle>
        </div>
      </q-carousel-slide>
    </q-carousel>
    <div class="row justify-center">
      <div class="col-7">
        <div class="col"><h2>추천 게임</h2></div>
        <div class="col">추천 리스트 목록</div>
        <div class="row">
          <q-card
            v-for="index in 3"
            class="my-card col-3"
            style="margin-left:20px; height:200px;"
            :key="index"
            to=""
          >
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
      <div class="col-3">
        <div class="col text-right" style="margin-top:50px;">
          <q-btn color="primary" icon="check" label="고객센터" />
          <q-btn color="primary" icon="check" label="보안센터" />
        </div>
        <div
          class="col flex flex-center"
          style="background:gray; margin-top:50px; height:300px"
        >
          <div class="col-10  text-center">
            <q-btn
              class="col"
              color="primary"
              icon="check"
              label="방구석 ID 로그인"
              to="/login"
            />
            <div class="col-10" style="margin-top:20px;">
              <span>다른계정 로그인</span>
              <q-icon name="print" />
              <q-icon name="print" />
              <q-icon name="print" />
              <q-icon name="print" />
            </div>
            <div class="col-10" style="margin-top:20px;">
              <p class=" text-right">회원가입</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-center" style="margin-top:100px;">
      <h2 class="col-10">뭔가추가</h2>
    </div>
    <div class="row justify-around" style="margin-top:30px;">
      <q-card class="my-card col-3" style="width:400px;">
        <img src="https://cdn.quasar.dev/img/mountains.jpg" />
        <q-card-section>
          <div class="text-h6">Our Changing Planet</div>
          <div class="text-subtitle2">by John Doe</div>
        </q-card-section>
        <q-card-section>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </q-card-section>
      </q-card>
      <q-card class="my-card col-3" style="width:400px;">
        <img src="https://cdn.quasar.dev/img/mountains.jpg" />
        <q-card-section>
          <div class="text-h6">Our Changing Planet</div>
          <div class="text-subtitle2">by John Doe</div>
        </q-card-section>
        <q-card-section>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </q-card-section>
      </q-card>
      <q-card class="my-card col-3" style="width:400px;">
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
</template>

<script>
export default {
  data() {
    return {
      slide: "first",
      mainCard: [
        { name: "first", imgSrc: require("../assets/mapia.jpeg") },
        { name: "second", imgSrc: require("../assets/ring.jpeg") },
        { name: "third", imgSrc: require("../assets/room.png") }
      ]
    };
  },
  methods: {
    goPath(target) {
      console.log(target);
      this.$router.push("/fitness");
    },
    change(target) {
      this.slide = target;
      event.stopPropagation();
    }
  }
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
