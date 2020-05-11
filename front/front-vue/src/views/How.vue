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
        <q-btn-dropdown v-if="$q.screen.lt.md" auto-close stretch flat label="More...">
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

      <q-card>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="mails">
            <div class="text-h6">Mails</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
 data () {
    return {
      tab: 'mails'
    }
  }
}
</script>

<style>

</style>