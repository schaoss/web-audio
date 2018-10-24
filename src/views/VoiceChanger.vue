<template>
  <div id="voice-changer">
    <h1>VoiceChanger</h1>
    <button @click="clickHandler"> On / Off </button>
    <div id="config">
      <div class="audio-note">
        <div class="item">
          <label for="pitchRatio">頻率倍率 : <span>{{pitchRatio}}</span> </label>
          <input type="range" min="0.5" max="2" step="0.01" id="pitchRatio" v-model="pitchRatio">
        </div>
        <div class="item">
          <label for="overlapRatio">重疊率 : <span>{{overlapRatio}}</span> </label>
          <input type="range" min="0.1" max="1" step="0.01" id="overlapRatio" v-model="overlapRatio">
        </div>
        <div class="result">
          <div class="timeData" v-for="n in 512" :key="n" :style="{'height': timeArray[(n-1)]*200+2 + 'px'}" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VoiceChanger",
  data() {
    const AudioContext = window.AudioContext || window.webkitAudioContext // 跨瀏覽器
    const audioCtx = new AudioContext() // 主控台的概念
    const gainNode = audioCtx.createGain() // 增益節點 控制音量的
    gainNode.gain.value = 1

    return{
      isPlaying: false,
      source: null,
      audioCtx,
      gainNode,
      micStream: null,
      timeArray: new Float32Array(1024),

      pitchRatio: 1.0,
      overlapRatio: 0.5,
      bufferSize: 2048
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
    },
    stop() {
      this.isPlaying = false
      this.gainNode.disconnect(this.audioCtx.destination)
    },
    getUserMic(stream) {
      this.micStream = stream
      this.source = this.audioCtx.createMediaStreamSource(stream)
      const processor = this.audioCtx.createScriptProcessor(this.bufferSize, 1, 1)
      const buffer = new Float32Array(this.bufferSize * 2)
      const hannWindow = this.hannWindow(this.bufferSize)

      processor.onaudioprocess = (e) => {
        const input = e.inputBuffer.getChannelData(0);
        const output = e.outputBuffer.getChannelData(0);
    
        for (let i = 0; i < input.length; i++) {
            input[i] *= hannWindow[i]

            buffer[i] = buffer[i + this.bufferSize]
            buffer[i + this.bufferSize] = 0.0
        }

        // 將輸入訊號依照頻率倍率重新計算
        const grainData = new Float32Array(this.bufferSize)
        for (let i = 0, j = 0.0;
              i < this.bufferSize;
              i++, j += parseFloat(this.pitchRatio)) {
            let index = Math.floor(j) % this.bufferSize
            let a = input[index]
            let b = input[(index + 1) % this.bufferSize]

            grainData[i] += this.linearInterpolation(a, b, j % 1.0) * hannWindow[i]
        }

        // 利用重疊，讓聲音聽起來較連續
        for (let i = 0; i < this.bufferSize; i += Math.round(this.bufferSize * (this.overlapRatio))) {
          for (let j = 0; j <= this.bufferSize; j++) {
              buffer[i + j] += grainData[j]
          }
        }

        // 將 buffer 內前半資料丟出去
        for (let i = 0; i < this.bufferSize; i++) {
          output[i] = buffer[i]
        }
        this.timeArray = output
      }
      this.source.connect(processor)
      processor.connect(this.gainNode)
    },
    hannWindow(length) {
      const window = new Float32Array(length)
      for (var i = 0; i < length; i++) {
          window[i] = 0.5 * (1 - Math.cos(2 * Math.PI * i / (length - 1)))
      }
      return window;
    },
    linearInterpolation(a, b, t) {
      return a + (b - a) * t;
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
#voice-changer {
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
        width: 800px;
        margin: 5px auto;
        padding: 10px;
        > label {
          display: inline-block;
          width: 150px;
          text-align: right;
          > span {
            font-weight: 600;
            display: inline-block;
            width: 50px;
            text-align: center;
          }
        }
        > input {
          width: 600px;
          margin: 0 20px;
        }
        > select {
          margin: 0 20px;
        }
      }
      .result {
        display: flex;
        justify-content: center;
        height: 300px;
        vertical-align: middle;
        align-items: center;
        overflow: hidden;
        .timeData {
          display: block;
          width: 2px;
          background-color: #36bf4b;
        }
      }
    }
  }
}
</style>
