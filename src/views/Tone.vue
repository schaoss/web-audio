<template>
  <div id="tone">
    <h1> Tone.js </h1>
    <div class="content">
    </div>
  </div>
</template>

<script>
import Tone from 'tone';
export default {
  name: 'tone',
  data() {
    const polySynth = new Tone.PolySynth(4, Tone.Synth).toMaster()
    const loop = new Tone.Loop(function(time){
      console.log(time)
      if (time % 12 < 4 ) {
        polySynth.triggerAttackRelease(['C3', 'E4', 'G3', 'Bb4'], "8n", time)
      } else if (time % 12 < 6 ) {
        polySynth.triggerAttackRelease(['F2', 'A4', 'C3', 'Eb3'], "8n", time)
      } else if (time % 12 < 8 ) {
        polySynth.triggerAttackRelease(['C2', 'E4', 'G3', 'Bb4'], "8n", time)
      } else if (time % 12 < 9 ) {
        polySynth.triggerAttackRelease(['G2', 'B4', 'D4', 'F3'], "8n", time)
      } else if (time % 12 < 10) {
        polySynth.triggerAttackRelease(['F2', 'A4', 'C4', 'Eb4'], "8n", time)
      } else if (time % 12 < 11) {
        polySynth.triggerAttackRelease(['C2', 'E4', 'G3', 'Bb4'], "8n", time)
      } else {
        polySynth.triggerAttackRelease(['G2', 'B4', 'D4', 'F4'], "8n", time)
      }
    }, "4n")
    loop.start("0m")
    return {
      isPlaying: false,
      Tone,
      loop
    }
  },
  methods: {
  },
  mounted() {
    this.Tone.Transport.start()
  },
  beforeDestroy() {
    this.Tone.Transport.stop()
  }
}
</script>

<style lang="scss" scoped>
#tone {
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
