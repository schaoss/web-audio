<template>
  <div id="tone">
    <h1> Tone.js </h1>
    <div class="content">
      <button @click="clickHandler"></button>
    </div>
  </div>
</template>

<script>
import * as Tone from 'tone';
export default {
  name: 'tone',
  data() {
    const synth = new Tone.Synth().toMaster()
    return {
      synth
    }
  },
  methods: {
    clickHandler() {
      this.synth.triggerAttackRelease('C4', '8n')
    }
  },
  mounted() {
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
      white-space: normal;
    }
    img {
      width: 100%;
    }
  }
}
</style>
