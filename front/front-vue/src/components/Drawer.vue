<template>
  <div>
    <q-drawer
      :value="isDrawer"
      :width="500"
      overlay
      content-class="bg-grey-3"
    >
      <div class="row justify-end">
        <span class="col-9">뭔가 적힐 공간</span><q-btn
          color="primary"
          icon="cancel"
          class="col-3"
          @click="changeIsDrawer"
        />
      </div>
      <q-scroll-area class="fit" style="margin-top:20px;">
        <q-list>
          <q-item >
          </q-item>
          <q-item v-for="index in 10" :key=index clickable v-ripple>
            <q-item-section>
              <q-item-label>링피트</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState("header", ["isDrawer"])
  },
  methods: {
    ...mapActions("header", ["changeIsDrawer"])
  }
};
</script>

<style></style>
