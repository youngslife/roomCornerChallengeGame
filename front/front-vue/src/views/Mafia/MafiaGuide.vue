<template>
  <div>
    <q-tabs v-model="tab" class="text-teal col row">
      <q-tab class="col-4" name="pose" icon="mail" label="게임 가이드" />
      <q-tab class="col-4" name="game" icon="alarm" label="직업 가이드" />
    </q-tabs>
    <q-card class="my-card">
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="pose">
          <div
            class="row justify-center q-ma-lg q-pa-lg items-center"
            v-for="(service, index) in serviceList"
            :key="index"
          >
            <div class="col-md-4 col-xs-12">
              <q-img :src="service.img"></q-img>
            </div>
            <div class="col-md-6 col-xs-12">
              <div class="q-my-lg text-center">
                <q-chip clickable size="20px" class="q-mx-lg">
                  <q-avatar
                    :icon="service.icon"
                    color="red"
                    text-color="white"
                  />
                  <span class="text-weight-bold">{{ service.name }}</span>
                </q-chip>
              </div>
              <div
                class="gt-md text-center text-h6"
                v-html="service.content"
              ></div>
              <div
                class="lt-lg text-center text-body1"
                v-html="service.content"
              ></div>
            </div>
          </div>
        </q-tab-panel>
        <q-tab-panel name="game">
          <div
            class="row justify-center q-ma-lg q-pa-lg items-center"
            v-for="(service, index) in serviceList"
            :key="index"
          >
            <div class="col-md-4 col-xs-12">
              <q-img :src="service.img"></q-img>
            </div>
            <div class="col-md-6 col-xs-12">
              <div class="q-my-lg text-center">
                <q-chip clickable size="20px" class="q-mx-lg">
                  <q-avatar
                    :icon="service.icon"
                    color="red"
                    text-color="white"
                  />
                  <span class="text-weight-bold">{{ service.name }}</span>
                </q-chip>
              </div>
              <div
                class="gt-md text-center text-h6"
                v-html="service.content"
              ></div>
              <div
                class="lt-lg text-center text-body1"
                v-html="service.content"
              ></div>
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: "pose",
      serviceList: [
        {
          name: "운동",
          icon: "bookmark",
          path: "/page1",
          content: "운동",
          img: "https://img.gqkorea.co.kr/gq/2017/08/style_598aabb79c7ab.gif"
        },
        {
          name: "운동",
          path: "/page2",
          icon: "directions",
          content: "운동",
          img: "https://img.gqkorea.co.kr/gq/2017/09/style_59cc9af5f081e.gif"
        },
        {
          name: "운동",
          icon: "add",
          path: "/page3",
          content: "운동",
          img:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSk76BADKMSDG81vPVu7FLnvWN55wnCuCHGYE7gZOFG_wOadD6I&usqp=CAU"
        }
      ]
    };
  }
};
</script>

<style></style>
