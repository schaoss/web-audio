<template>
  <div id="guitar-tuner">
    <h1>Guitar Tuner 2.0</h1>
    <button @click="clickHandler"> On / Off </button>
    <div id="config">
      <div class="audio-note">
        <div class="result">
          <div class="fftData" v-for="n in 512" :key="n" :style="{'height': timeArray[(n-1)]*5000+2 + 'px'}" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Source",
  data() {
    const AudioContext = window.AudioContext || window.webkitAudioContext // 跨瀏覽器
    const audioCtx = new AudioContext() // 主控台的概念
    const gainNode = audioCtx.createGain() // 增益節點 控制音量的
    const analyser = audioCtx.createAnalyser()

    gainNode.gain.value = 0
    analyser.fftSize = 2048
    analyser.connect(gainNode)
    return{
      isPlaying: false,
      isMute: false,
      source: null,
      audioCtx,
      gainNode,
      analyser,
      micStream: null,
      timeArray: new Float32Array(analyser.fftSize / 2),
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
    play() {
      this.isPlaying = true
      this.gainNode.connect(this.audioCtx.destination)
      requestAnimationFrame(this.getMicData)
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
    getMicData(){
      this.timeArray = new Float32Array(this.analyser.fftSize)
      this.analyser.getFloatTimeDomainData(this.timeArray)
      if (this.isPlaying) requestAnimationFrame(this.getMicData)
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
#guitar-tuner {
  > button {
    margin: 10px;
  }
  #config {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    > .audio-note {
      width: 1000px;
      margin: 15px auto;
      border: solid 1px #d9d9d9;
      .result {
        display: flex;
        justify-content: center;
        height: 300px;
        vertical-align: middle;
        align-items: center;
        overflow: hidden;
        .fftData {
          display: block;
          width: 2px;
          background-color: #bf8f36;
        }
      }
    }
  }
}
</style>
