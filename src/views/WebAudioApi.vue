<template>
  <div id="web-audio-api">
    <h1>Hello, Web Audio API</h1>
    <button @click="clickHandler"> Play / Pause </button>
    <div id="config">
      <div class="item">
        <label for="type">type : </label>
        <select id="type" v-model="type" @change="changeHandler">
          <option value='sine' selected>sine</option>
          <option value='square'>square</option>
          <option value='sawtooth'>sawtooth</option>
          <option value='triangle'>triangle</option>
        </select>
      </div>
      <div class="item">
        <label for="frequency">frequency : {{frequency}} </label>
        <input type="range" min="0" max="4000" step="1" value="440" id="frequencyRange" v-model="frequency" @input="changeHandler">
      </div>
      <div class="item">
        <label for="detune">detune : {{detune}} </label>
        <input type="range" min="-2000" max="2000" step="1" value="440" id="detuneRange" v-model="detune" @input="changeHandler">
      </div>
      <div class="item">
        <label for="volume">volume : {{volume}} </label>
        <input type="range" min="0" max="5" step="0.1" value="440" id="volumeRange" v-model="volume" @input="changeHandler">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const AudioContext = window.AudioContext || window.webkitAudioContext // 跨瀏覽器
    const audioCtx = new AudioContext() // 主控台的概念
    const oscillator = audioCtx.createOscillator() // 振盪器 (音源)
    const gainNode = audioCtx.createGain() // 增益節點 也就是處理音效的地方
    return{
      isPlaying: false,
      audioCtx,
      oscillator,
      gainNode,
      type: 'sine', // sine, square, sawtooth, triangle
      frequency: 440, // A4
      detune: 0, // 解諧 可做出和聲
      volume: 1 // 音量
    }
  },
  methods: {
    clickHandler(){
      if (this.isPlaying) {
        this.stop()
      } else {
        this.play()
      }
      this.isPlaying = !this.isPlaying
    },
    changeHandler(){
      this.setNoteConfig()
    },
    play() {
      this.gainNode.connect(this.audioCtx.destination)
    },
    stop() {
      this.gainNode.disconnect(this.audioCtx.destination)
    },
    setNoteConfig() {
      this.oscillator.type = this.type
      this.oscillator.frequency.value = this.frequency
      this.oscillator.detune.value = this.detune
      this.gainNode.gain.value = this.volume
    }
  },
  mounted() {
    this.setNoteConfig()
    this.oscillator.connect(this.gainNode) // 將音源接到處理節點上
    this.oscillator.start() // 啟動音源
  }
}
</script>
<style lang="scss" scoped>
#web-audio-api {
  #config {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    >.item {
      display: flex;
      width: 800px;
      margin: auto;
      >label {
        width: 200px;
        text-align: right;
      }
      >input, select {
        margin: 0 20px;
      }
    }
  }
}
</style>
