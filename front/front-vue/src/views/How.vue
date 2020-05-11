<template>
  <q-layout>
    <q-tabs
      v-model="tab"
      inline-label
      :breakpoint="0"
      align="justify"
      class="bg-purple text-white shadow-2"
    >
      <q-tab name="mails" label="게임1" />
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

    <q-card style="height: 500px">
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="mails" class="row">
          <q-scroll-area
            dark
            class="bg-dark text-white rounded-borders col-3"
            style="height: 600px; max-width: 300px;"
          >
            <div v-for="n in 100" :key="n" class="q-py-sm q-px-md">
            <q-checkbox right-label v-model="orange" label="뭔가 내용이 들어가겠지" />
            </div>
          </q-scroll-area>
          <div class="col-8 flex flex-center">
            <div class="text-h6">내용</div>

            <div>
              이 들어가겟지
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
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      tab: "mails",
      drawerLeft: true,
      orange: false,
    };
  },
};
</script>

<style></style>
