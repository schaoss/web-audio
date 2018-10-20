<template>
  <div id="guitar-tuner">
    <h1>Guitar Tuner 2.0</h1>
    <button @click="clickHandler"> On / Off </button>
    <div id="config">
      <div class="audio-note">
        <h3>{{getFrequencyStr}}</h3>
        <h2>{{getNoteStr}}</h2>
        <h4>{{getCentsOffStr}}</h4>
        <div class="result">
          <div class="fftData" v-for="n in 512" :key="n" :style="{'height': timeArray[(n-1)]*200+2 + 'px'}" />
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

      semiTone: null,
      centsOff: 0,
    }
  },
  computed: {
    getInputFrequency() {
      const MAX_SAMPLES = this.timeArray.length / 2 // 由於需要重複測試才能判斷正確波長，故只能做到資料長度的一半
      const GOOD_ENOUGH_CORRELATION = 0.9 // 相關係數要大於多少才接受
      const correlations = new Array(MAX_SAMPLES)
      let best_offset = -1
      let best_correlation = 0
      let last_correlation = 1
      let foundGoodCorrelation  = false // 旗標 紀錄找到好的結果沒

      if(this.timeArray.reduce((rms, d) => rms += d ** 2, 0) < 0.01) return -1

      for(let offset = 0; offset < MAX_SAMPLES; offset++) {
        let correlation = 0
        for(let n = 0; n < MAX_SAMPLES; n++) {
          correlation += Math.abs((this.timeArray[n])-(this.timeArray[n + offset]))
        }
        correlation = 1 - (correlation / MAX_SAMPLES) // 相關係數
        correlations[offset] = correlation

        if ((correlation > GOOD_ENOUGH_CORRELATION) && (correlation > last_correlation)) {
          // 當找到足夠好的結果的時候
          foundGoodCorrelation = true
          if (correlation > best_correlation) {
            best_correlation = correlation
            best_offset = offset
          }
        } else if (foundGoodCorrelation) {
          // 前一組為足夠好的結果，且當前的不夠好時
          const shift = (correlations[best_offset + 1] - correlations[best_offset - 1]) / correlations[best_offset];  
          return Math.round(this.audioCtx.sampleRate / (best_offset + (8 * shift)))
        }
        // 不好的結果
        last_correlation = correlation
      }
      if (best_correlation > 0.01) {
        return Math.round(this.audioCtx.sampleRate / best_offset)
      }
      return -1;
    },
    getFrequencyStr() {
      return this.getInputFrequency > 0 ? this.getInputFrequency : '-'
    },
    getNoteStr() {
      const noteStr = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
      return this.semiTone ? noteStr[this.semiTone % 12] : '-'
    },
    getCentsOffStr() {
      return this.centsOff < 0
      ? Math.abs(this.centsOff) + ' b'
      : this.centsOff > 0 
        ? Math.abs(this.centsOff) + ' #'
        : '-'
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
      this.semiTone = this.getSemitone(this.getInputFrequency)
      this.centsOff = this.getCentsOffFromPitch(this.getInputFrequency, this.semiTone)
      if (this.isPlaying) requestAnimationFrame(this.getMicData)
    },
    getSemitone(f) {
      return Math.round(12 * (Math.log(f / 440) / Math.log(2) )) + 69
    },
    getFrequencyFromSemitone(note) {
	    return 440 * Math.pow(2, (note - 69) / 12)
    },
    getCentsOffFromPitch(f, note) {
      return Math.floor(1200 * Math.log(f / this.getFrequencyFromSemitone(note)) / Math.log(2))
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
