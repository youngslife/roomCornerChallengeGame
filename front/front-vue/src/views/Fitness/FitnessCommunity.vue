<template>
  <div class="row justify-around" style="height:700px; margin-top:20px">
      <div class="col-7">
    <q-tabs
        v-model="tab"
        class="text-teal row"
    >
        <q-tab name="mails" icon="mail" label="자유계시판" class="col-4"/>
        <q-tab name="alarms" icon="alarm" label="질문계시판" class="col-4"/>
        <q-tab name="movies" icon="movie" label="팁과공략" class="col-4"/>
    </q-tabs>
<q-tab-panels v-model="tab" animated>
    <q-tab-panel name="mails">
        <div class="row justify-end"> <q-btn color="primary" icon="check" label="글쓰기" /></div>
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
      </div>
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
export default {
    data(){
        return{
            tab:"mails"
        }
    }
}
</script>

<style>

</style>