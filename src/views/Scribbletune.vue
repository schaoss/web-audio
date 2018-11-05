<template>
  <div id="scribbletune">
    <h1> Scribbletune </h1>
    <div class="content">
      <button></button>
    </div>
  </div>
</template>

<script>
import Tone from 'tone'
import Scribbletune from 'scribbletune'
import audioUnlock from '../lib/audioUnlock'
export default {
  name: 'scribbletune',
  data() {
    return {
    }
  },
  methods: {
  },
  mounted() {
    audioUnlock(Tone.context)
    window.Tone = Tone
    // Scribbletune.clip({ synth: 'PolySynth', notes: Scribbletune.progression.getChords('C major', 'I V vi iii IV I ii V'), pattern: 'x-'.repeat(8) }).start()
    Scribbletune.clip({ 
      synth: 'PolySynth',
      notes: 'F#m C#m DM Bm EM AM DM C#m AM',
      pattern: '[xx][x-]'.repeat(8)
    })
    Tone.Transport.start()
  },
  beforeDestroy() {
    Tone.Transport.cancel().stop()
  }
}
</script>

<style lang="scss" scoped>
#scribbletune {
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
