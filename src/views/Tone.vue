<template>
  <div id="tone">
    <h1> Tone.js </h1>
    <div class="content">
      <h2>{{getChord}}</h2>
      <h3>{{notes[0]}}, {{notes[1]}}, {{notes[2]}}, {{notes[3]}}</h3>
      <button @click="clickHandler"> Play / Pause</button>
    </div>
  </div>
</template>

<script>
import Tone from 'tone'
import { chord } from "tonal-detect"
export default {
  name: 'tone',
  data() {
    const noteArr = ["C3", "D3", "E3", "F3", "G3", "A4", "C4", "D4", "E4", "F4", "G4", "C5"]
    const polySynth = new Tone.PolySynth(6, Tone.Synth).toMaster()
    const pattern = new Tone.Pattern((time, note) => {
      polySynth.triggerAttackRelease(note, "1n")
      this.$set(this.notes, parseInt(time * 2 % 4), note)
    }, noteArr, "randomOnce")
    return {
      isPlaying: false,
      notes: ['-', '-', '-', '-'],
      Tone,
      pattern,
    }
  },
  methods: {
    clickHandler() {
      if (this.isPlaying) {
        this.pattern.stop()
        this.notes = ['-', '-', '-', '-']
      } else {
        this.pattern.start()
      }
      this.isPlaying = !(this.isPlaying)
    }
  },
  computed: {
    getChord() {
      if (this.notes.every(note => note !== '-')) {
        return chord(this.notes)[0] || '-'
      }else return '-'
    }
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
