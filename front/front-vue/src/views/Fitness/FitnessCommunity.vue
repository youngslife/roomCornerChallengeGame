<template>
  <div class="row justify-around" style="height:700px; margin-top:20px">
    <div class="col-7">
      <q-tabs v-model="tab" class="text-teal row" @click="check()">
        <q-tab name="mails" icon="mail" label="자유계시판" class="col-4" />
        <q-tab name="alarms" icon="alarm" label="질문계시판" class="col-4" />
        <q-tab name="movies" icon="movie" label="팁과공략" class="col-4" />
      </q-tabs>
      <template v-if="isWrite">
        <writer game="링피트" type="tab"></writer
      ></template>
      <template v-else>
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="mails">
            <div class="row justify-end">
              <q-btn
                color="primary"
                icon="check"
                label="글쓰기"
                @click="write('asd')"
              />
            </div>
            <q-list bordered>
              <q-item v-for="index in 10" :key="index" clickable v-ripple>
                <q-item-section avatar>
                  <q-icon color="primary" name="bluetooth" />
                </q-item-section>
                <q-item-section>Icon as avatar</q-item-section>
              </q-item>
            </q-list>
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
      </template>
    </div>
    <!-- 사이드바 -->
    <div class="col-2">
      <q-list bordered>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="bluetooth" />
          </q-item-section>
          <q-item-section>Icon as avatar</q-item-section>
        </q-item>
        <q-item>
          <q-item-section top avatar>
            <q-avatar color="primary" text-color="white" icon="bluetooth" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Single line item</q-item-label>
            <q-item-label caption lines="2">Secondary line text.</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
            <q-icon name="star" color="yellow" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section top avatar>
            <q-avatar color="primary" text-color="white" icon="bluetooth" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Single line item</q-item-label>
            <q-item-label caption lines="2">Secondary line text.</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-item-label caption>5 min ago</q-item-label>
            <q-icon name="star" color="yellow" />
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import writer from "../../components/PostWrite";
export default {
  data() {
    return {
      tab: "mails",
      isWrite: false
    };
  },
  components: {
    writer
  },
  methods: {
    write(a) {
      console.log(this.isWrite);
      console.log(a);
      this.isWrite = true;
    },
    check() {
      console.log("gigigi");
      this.isWrite = false;
    }
  }
};
</script>

<style></style>
