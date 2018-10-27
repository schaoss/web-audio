<template>
  <div id="stereo-panner-node">
    <h1>Stereo Panner Node</h1>
    <button @click="clickHandler"> Play / Pause </button>
    <button @click="reset"> Reset </button>
    <div id="config">
      <div class="audio-note">
        <h3><span>音源</span></h3>
        <div class="item">
          <label for="waveType">type : <span>{{ waveType }}</span></label>
          <select id="waveType" v-model="waveType" @change="changeHandler">
            <option value='sine' selected>sine</option>
            <option value='square'>square</option>
            <option value='sawtooth'>sawtooth</option>
            <option value='triangle'>triangle</option>
          </select>
        </div>
        <div class="item">
          <label for="frequency">frequency : <span>{{frequency}}</span> </label>
          <input type="range" min="0" max="4000" step="1" id="frequencyRange" v-model="frequency" @input="changeHandler">
        </div>
        <div class="item">
          <label for="detune">detune : <span>{{detune}}</span> </label>
          <input type="range" min="-2000" max="2000" step="1" vid="detuneRange" v-model="detune" @input="changeHandler">
        </div>
      </div>
      <div class="audio-note">
        <h3><span>增益節點</span></h3>
        <div class="item">
          <label for="volume">volume : <span>{{volume}}</span> </label>
          <input type="range" min="0" max="5" step="0.1" id="volumeRange" v-model="volume" @input="changeHandler">
        </div>
      </div>
      <div class="audio-note">
        <h3><span>雙聲道節點</span></h3>
        <div class="item">
          <label for="pan">pan : <span>{{pan}}</span> </label>
          <input type="range" min="-1" max="1" step="0.01" id="pan" v-model="pan" @input="changeHandler">
        </div>
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
    const gainNode = audioCtx.createGain() // 增益節點 控制音量的
    const stereoPanner = audioCtx.createStereoPanner() // 雙聲道節點
    return{
      isPlaying: false,
      audioCtx,
      oscillator,
      gainNode,
      stereoPanner,
      waveType: 'sine', // sine, square, sawtooth, triangle
      frequency: 440, // A4
      detune: 0, // 解諧 可做出和聲
      volume: 1, // 音量
      pan: 0, // 左右聲道平衡
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
    reset(){
      this.waveType = 'sine'
      this.frequency = 440
      this.detune = 0
      this.volume = 1
      this.pan = 0
      this.setNoteConfig()
    },
    play() {
      this.stereoPanner.connect(this.audioCtx.destination)
    },
    stop() {
      this.stereoPanner.disconnect(this.audioCtx.destination)
    },
    setNoteConfig() {
      this.oscillator.type = this.waveType
      this.oscillator.frequency.value = this.frequency
      this.oscillator.detune.value = this.detune
      this.gainNode.gain.value = this.volume
      this.stereoPanner.pan.value = this.pan
    }
  },
  mounted() {
    this.setNoteConfig()
    this.oscillator.connect(this.gainNode) // 將音源接到音量節點上
    this.gainNode.connect(this.stereoPanner)
    this.oscillator.start() // 啟動音源
  },
  beforeDestroy() {
    if(this.isPlaying) this.stereoPanner.disconnect(this.audioCtx.destination)
  }
}
</script>
<style lang="scss" scoped>
#stereo-panner-node {
  > button {
    margin: 10px;
  }
  #config {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    > .audio-note {
      width: 50vw;
      min-width: 300px;
      margin: 15px auto;
      border: solid 1px #d9d9d9;
      > h3 {
        text-align: left;
        margin: 10px;
        > span {
          display: inline-block;
          width: 100px;
          text-align: right;
        }
      }
      > .item {
        display: flex;
        width: 100%;
        max-width: 800px;
        margin: 5px auto;
        padding: 10px;
        > label {
          display: inline-block;
          min-width: 150px;
          text-align: right;
          > span {
            font-weight: 600;
            display: inline-block;
            width: 50px;
            text-align: center;
          }
        }
        > input {
          width: 100%;
          max-width: 600px;
          margin: 0 20px;
        }
        > select {
          margin: 0 20px;
        }
      }
    }
  }
}
</style>
