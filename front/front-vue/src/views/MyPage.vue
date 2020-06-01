<template>
  <q-layout class="row">
    <div class="col-3">
      <q-card class="my-card" style="margin-top:20px;">
        <img
          src="https://cdn.quasar.dev/img/mountains.jpg"
          style=" border-radius: 50%;"
        />
        <q-card-section>
          <div class="text-h3 text-center">김개똥</div>
          <div class="text-h6 text-center">19999등</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="text" type="text" label="자기소개칸" />
        </q-card-section>
      </q-card>
    </div>
    <div class="col-9">
      <q-tabs
        v-model="tab"
        inline-label
        :breakpoint="0"
        align="justify"
        class="bg-purple text-white shadow-2 col-7"
      >
        <q-tab name="mails" label="피트니스" />
        <q-tab name="alarms" label="게임2" />
        <q-tab v-if="$q.screen.gt.sm" name="movies" label="게임3" />
        <q-tab v-if="$q.screen.gt.sm" name="photos" label="게임4" />
        <q-btn-dropdown
          v-if="$q.screen.lt.md"
          auto-close
          stretch
          flat
          label="More..."
        >
          <q-list>
            <q-item clickable @click="tab = 'movies'">
              <q-item-section>Movies</q-item-section>
            </q-item>

            <q-item clickable @click="tab = 'photos'">
              <q-item-section>Photos</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-tabs>

      <q-card style="height: 1000px" class="col-7">
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="mails" class="row">
            <q-scroll-area
              dark
              class="bg-dark text-white rounded-borders col-3"
              style="height: 950px;"
            >
              <div v-for="n in 100" :key="n" class="q-py-sm q-px-md">
                <q-checkbox
                  right-label
                  v-model="orange"
                  label="뭔가 내용이 들어가겠지"
                />
              </div>
            </q-scroll-area>
            <div class="col-8 flex flex-cetner" style="margin-left:50px;">
              <div>
                <div>
                  <h2 class="text-weight-bold">스테이지 1번</h2>
                </div>
                <q-separator />
                <div>
                  <h3 class="inline-block">타임 :</h3>
                  <h3 class="inline-block">12:23</h3>
                  <br />
                  <h3 class="inline-block">칼로리 :</h3>
                  <h3 class="inline-block">123.323kcal</h3>
                </div>
                <q-separator />
                <div class="row">
                  <div class=" col-6">
                    <h3 class="inline-block">perfect :</h3>
                    <h3 class="inline-block">12:23</h3>
                  </div>
                  <div class=" col-6">
                    <h3 class="inline-block">great :</h3>
                    <h3 class="inline-block">12:23</h3>
                  </div>
                  <div class=" col-6">
                    <h3 class="inline-block">good :</h3>
                    <h3 class="inline-block">12:23</h3>
                  </div>
                  <div class=" col-6">
                    <h3 class="inline-block">miss :</h3>
                    <h3 class="inline-block">12:23</h3>
                  </div>
                </div>
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="alarms">
            <div class="text-h6">Alarms</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="movies">
            <div class="text-h6">Movies</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      tab: "mails",
      drawerLeft: true,
      orange: false,
      text: ""
    };
  }
};
</script>

<style></style>
