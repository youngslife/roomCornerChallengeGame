<template>
  <q-layout  q-gutter-sm  class="flex flex-center" >
    <div class="row" style="width:90%;">
      <q-card
        class="my-card col-5 q-gutter-sm flex flex-center"
        style="margin:2px;"
      >
        <q-img
          src="https://cdn.quasar.dev/img/parallax2.jpg"
          width="90%"
          height="90%"
        >
          <div
            class="text-h5 absolute-bottom text-center"
            style="background-color: rgba(255, 255, 255,.0);"
          >
            랭킹
          </div>
        </q-img>
      </q-card>
      <q-card
        class="my-card col-5 q-gutter-sm flex flex-center"
        style="margin:2px;"
      >
        <q-img
          src="https://cdn.quasar.dev/img/parallax2.jpg"
          width="90%"
          height="90%"
        >
          <div
            class="text-h5 absolute-bottom text-center"
            style="background-color: rgba(255, 255, 255,.0);"
          >
            게시판
          </div>
        </q-img>
      </q-card>
    </div>
    <div class="row" style="width:90%;">
      <q-card
        class="my-card col-5 q-gutter-sm flex flex-center"
        style="margin:2px;"
        OnClick="location.href ='http://localhost:8080/gamehome'"
      >
        <q-img
          src="https://cdn.quasar.dev/img/parallax2.jpg"
          width="90%"
          height="90%"
        >
          <div
            class="text-h5 absolute-bottom text-center"
            style="background-color: rgba(255, 255, 255,.0);"
          >
            게임
          </div>
        </q-img>
      </q-card>
      <q-card
        class="my-card col-5 q-gutter-sm flex flex-center"
        style="margin:2px;"
      >
        <q-img
          src="https://cdn.quasar.dev/img/parallax2.jpg"
          width="90%"
          height="90%"
        >
          <div
            class="text-h5 absolute-bottom text-center"
            style="background-color: rgba(255, 255, 255,.0);"
          >
            설정
          </div>
        </q-img>
      </q-card>
    </div>
  </q-layout>
</template>
