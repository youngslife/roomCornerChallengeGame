<template>
  <div>
    <h1>RingfitModel Test</h1>
    <div class="row">
      <RingfitAttack class="col-9" />
      <div class="col-3">무엇인가가 들어가겠지
      <Webcam class="col-3" />
      </div>
    </div>
  </div>
</template>

<script>
import RingfitAttack from './RingfitAttack.vue'
import RingfitAttack from '../../components/Webcam.vue'
export default {
  name: "RingfitPlay",
  components: {
    RingfitAttack,
    Webcam,
  },
}
</script>

<style>

</style>