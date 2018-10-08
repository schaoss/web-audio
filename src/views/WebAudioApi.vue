<template>
  <div class="day1">
    <h1>Hello, Web Audio API</h1>
    <button @click="clickHandler"> Play / Pause </button>
  </div>
</template>

<script>
export default {
  data() {
    const AudioContext = window.AudioContext || window.webkitAudioContext // 跨瀏覽器
    const audioCtx = new AudioContext() // 主控台的概念
    const oscillator = audioCtx.createOscillator() // 振盪器 (音源)
    const gainNode = audioCtx.createGain() // 增益節點 也就是處理音效的地方
    oscillator.type = 'sine' // 正弦波
    oscillator.frequency.value = 440 // A4
    oscillator.detune.value = 0 //解諧 可做出和聲
    gainNode.gain.value = 1 //音量  
    
    return{
      isPlaying: false,
      audioCtx,
      oscillator,
      gainNode
    }
  },
  methods: {
    clickHandler(){
      if (this.isPlaying) {
        this.gainNode.disconnect(this.audioCtx.destination)
      } else {
        this.gainNode.connect(this.audioCtx.destination)
      }
      this.isPlaying = !this.isPlaying
    }
  },
  mounted() {
    this.oscillator.connect(this.gainNode) // 將音源接到處理節點上
    this.oscillator.start() // 啟動音源
  }
}
</script>
