<template>
  <div id="tone">
    <h1> Tone.js </h1>
    <div class="content">
    </div>
  </div>
</template>

<script>
import Tone from 'tone'
export default {
  name: 'tone',
  data() {
    const autoWah = new Tone.AutoWah(300, 6, -30).toMaster()
    const synth = new Tone.Synth().connect(autoWah)

    autoWah.Q.value  = 6
    return {
      isPlaying: false,
      synth
    }
  },
  methods: {
  },
  mounted() {
    // const tmp = new Tone.AMOscillator("A4", "sine", "sine").toMaster()
    // tmp.harmonicity.value = 0.5
    // tmp.start()
  },
  beforeDestroy() {
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
