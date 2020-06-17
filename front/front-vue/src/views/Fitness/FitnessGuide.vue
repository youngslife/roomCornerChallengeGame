<template>
  <div>
    <q-tabs v-model="tab" class="text-teal col row">
      <q-tab class="col-4" name="pose" label="자세 가이드" />
      <q-tab class="col-4" name="game" label="게임 가이드" />
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
            <div class="col-md-6 col-xs-12" style="padding: 5vw;">
              <div class="q-my-lg text-center">
                <q-chip clickable size="20px" class="q-mx-lg">
                  <q-avatar icon="bookmark" color="red" text-color="white" />
                  <span class="text-weight-bold">{{ service.name }}</span>
                </q-chip>
              </div>
              <div class="gt-md text-center text-h6" v-html="service.content"></div>
              <div class="lt-lg text-center text-body1" v-html="service.content"></div>
            </div>
          </div>
        </q-tab-panel>
        <q-tab-panel name="game">
          <img src="../../assets/tutorial1.png" style="margin: 0 3vw; width: 90%" />
          <img src="../../assets/tutorial2.png" style="margin: 0 3vw; width: 90%" />
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
          name: "걷기",
          path: "/page1",
          content:
            "다리를 높게 들고 힘차게 걸어보세요. 게임 중 캐릭터의 점프 동작이 필요할 시, 양팔을 옆으로 뻗어 주세요.",
          img: require("../../assets/walkkk.gif")
        },
        {
          name: "스쿼트",
          path: "/page2",
          content:
            "다리를 어깨 너비만큼 벌린 채로 앉았다 일어나세요. 이 때, 무릎이 발 끝을 나가지 않도록 합니다. 허리도 앞으로 굽히지 마세요.",
          img: require("../../assets/squat.gif")
        },
        {
          name: "숄더 프레스",
          path: "/page3",
          content:
            "팔을 높게 든 후 90도를 유지하도록 팔을 내렸다가 다시 올리는 동작을 반복하세요. 팔을 올릴 때, 어깨가 따라 올라가지 않도록 유의합니다. 아령이 없다면 생수통으로!",
          img: require("../../assets/shoulder.gif")
        },
        {
          name: "점핑잭",
          path: "/page4",
          content: "팔과 다리를 벌렸다가 모으면서 뛰어보세요.",
          img: require("../../assets/jack.gif")
        },
        {
          name: "사이드 크런치",
          path: "/page5",
          content:
            "깍지 낀 손을 뒷통수에 댄 후 팔꿈치와 무릎이 만나도록 다리를 드세요. 앞으로 숙이지 않게 허리를 구부립니다.",
          img: require("../../assets/crunch.gif")
        },
        {
          name: "사이드 런지",
          path: "/page6",
          content:
            "두 다리를 옆으로 벌린 상태로 무릎을 번갈아가며 굽힙니다. 이 때, 허리를 펴기보다 무게중심을 뒤로 두어 무릎에 무리가 가지 않도록 합니다.",
          img: require("../../assets/side_lunge.gif")
        }
      ]
    };
  }
};
</script>

<style></style>
