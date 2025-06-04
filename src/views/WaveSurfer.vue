<template>
  <div id="wavesurfer">
    <h1> Wavesurfer.js </h1>
    <div class="content">
      <button @click="clickHandler" :disabled="!isReady">{{getBtnStr}}</button>
    </div>
    <div id="waveform"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import WaveSurfer from 'wavesurfer.js'

const wavesurfer = ref(null)
const isReady = ref(false)

function clickHandler() {
  wavesurfer.value?.playPause()
}

const getBtnStr = computed(() => (isReady.value ? 'Play / Pause' : 'Loading...'))

onMounted(() => {
  wavesurfer.value = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'violet',
    progressColor: 'purple',
  })
  wavesurfer.value.load(require('../static/Epic_Sax_Gay.mp3'))
  wavesurfer.value.on('ready', () => {
    isReady.value = true
  })
})
</script>

<style lang="scss" scoped>
#wavesurfer {
  max-height: 100vh;
  overflow: auto;
  .content {
    max-width: 50vw;
    margin: 40px auto;
    > div {
      text-align: left;
      line-height: 1.8;
      white-space: normal;
    }
    img {
      width: 100%;
    }
  }
}
</style>
