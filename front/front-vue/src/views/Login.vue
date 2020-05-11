<template>
<div>
  <q-layout class="flex flex-center">
      <q-card class="my-card">
          <q-card-section class="text-center">
              <div class="text-h5">방구석 챌린지</div>
              <div class="text-subtitle2">내가 방구석 여포다</div>
          </q-card-section>
          <q-card-section>
              <div class="row"><h3 class="col-2">id</h3> <q-input class="col-9" v-model="text" type="text" label="Label" /></div>
              <div class="row"><h3 class="col-2">pw</h3> <q-input class="col-9" v-model="text" type="text" label="Label" /></div>
          </q-card-section>
          <q-card-section class="row">
              <q-btn color="primary" icon="check" label="로그인" class="col-12" to="/home" />
              <q-btn color="primary" icon="check" label="카톡 로그인" class="col-12"/>
              <q-btn color="primary" icon="check" label="카톡 구글 로그인" class="col-12"/>
          </q-card-section>
      </q-card>
  </q-layout>
</div>
</template>

<script>
export default {
data(){
    return{
        text:""
    }
}
}
</script>

<style>

</style>