<template>
  <div id="analyser">
    <h1>Analyser</h1>
    <button @click="clickHandler"> Play / Pause </button>
    <button @click="muteHandler"> {{isMute ? 'unmute' : 'mute'}} </button>
    <div id="config">
      <div class="audio-note">
        <div class="result">
          <div class="fftData" v-for="n in 512" :key="n" :style="{'height': fftArray[(n-1)]+2 + 'px'}" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Analyser",
  data() {
    const AudioContext = window.AudioContext || window.webkitAudioContext // 跨瀏覽器
    const audioCtx = new AudioContext() // 主控台的概念
    const gainNode = audioCtx.createGain() // 增益節點 控制音量的
    const analyser = audioCtx.createAnalyser()

    gainNode.gain.value = 1
    analyser.fftSize = 1024
    analyser.connect(gainNode)
    return{
      isPlaying: false,
      isMute: false,
      source: null,
      audioCtx,
      gainNode,
      analyser,
      micStream: null,
      fftArray: new Uint8Array(analyser.fftSize),
    }
  },
  methods: {
    clickHandler(){
      if (this.isPlaying) {
        this.stop()
      } else {
        this.play()
      }
    },
    muteHandler() {
      if (this.isMute) {
        this.isMute = false
        this.gainNode.gain.value = 1
      } else {
        this.isMute = true
        this.gainNode.gain.value = 0
      }
    },
    play() {
      this.isPlaying = true
      this.gainNode.connect(this.audioCtx.destination)
      requestAnimationFrame(this.getFFTData)
    },
    stop() {
      this.isPlaying = false
      this.gainNode.disconnect(this.audioCtx.destination)
    },
    getUserMic(stream) {
      this.micStream = stream
      this.source = this.audioCtx.createMediaStreamSource(stream)
      this.source.connect(this.analyser)
    },
    getFFTData(){
      this.fftArray = new Uint8Array(this.analyser.fftSize)
      this.analyser.getByteFrequencyData(this.fftArray)
      if (this.isPlaying) requestAnimationFrame(this.getFFTData)
    }
  },
  mounted() {
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(this.getUserMic)
    .catch(e => console.log(e))
  },
  beforeDestroy() {
    if(this.micStream) this.micStream.getAudioTracks()[0].stop()
  }
}
</script>
<style lang="scss" scoped>
#analyser {
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
      .result {
        display: flex;
        justify-content: center;
        height: 300px;
        vertical-align: middle;
        align-items: center;
        .fftData {
          display: block;
          width: 2px;
          background-color: #3692be;
        }
      }
    }
  }
}
</style>
