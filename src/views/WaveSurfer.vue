<template>
  <div id="wavesurfer">
    <h1> Wavesurfer.js </h1>
    <div class="content">
      <button @click="clickHandler" :disabled="!isReady">{{getBtnStr}}</button>
    </div>
    <div id="waveform"></div>
  </div>
</template>

<script>
import WaveSurfer from 'wavesurfer.js'
export default {
  name: 'wavesurfer',
  data() {
    return {
      wavesurfer: null,
      isReady: false
    }
  },
  methods: {
    clickHandler() {
      this.wavesurfer.playPause()
    }
  },
  computed: {
    getBtnStr() {
      return this.isReady ? 'Play / Pause' : 'Loading...'
    }
  },
  mounted() {
    this.wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'violet',
      progressColor: 'purple',
    })
    this.wavesurfer.load(require('../static/Epic_Sax_Gay.mp3'))
    this.wavesurfer.on('ready', () => {
      this.isReady = true
    })
  }
}
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
      white-space: 1;
    }
    img {
      width: 100%;
    }
  }
}
</style>
