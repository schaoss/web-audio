<template>
  <div id="source">
    <h1>Source</h1>
    <button @click="clickHandler"> Play / Pause </button>
    <button @click="reset"> Reset </button>
    <div id="config">
      <div class="audio-note">
        <h3>
          <span>音源：</span>
          <select @change="sourceType=$event.target.value">
            <option value="0">振盪器</option>
            <option value="1">Audio Tag</option>
            <option value="2">麥克風</option>
          </select>
        </h3>

        <div v-show="sourceType==='0'">
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
      </div>
      <div v-show="sourceType==='1'">
        <div class="source">
          <!-- https://kiwi6.com/file/jsixd8uctr -->
          <audio id="player" controls preload crossorigin="anonymous" src="http://k003.kiwi6.com/hotlink/jsixd8uctr/Rainy_Day_Games.mp3" type="audio/mpeg"></audio>
        </div>
      </div>
      <div v-show="sourceType ==='2'">
        <div>mic</div>
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

    return{
      isPlaying: false,
      sourceType: "0",
      source: null,
      audioCtx,
      gainNode,
      waveType: 'sine', // sine, square, sawtooth, triangle
      frequency: 440, // A4
      detune: 0, // 解諧 可做出和聲
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
    changeHandler(){
      this.setNoteConfig()
    },
    reset(){
      this.waveType = 'sine'
      this.frequency = 440
      this.detune = 0
      this.setNoteConfig()
    },
    play() {
      this.isPlaying = true
      this.gainNode.connect(this.audioCtx.destination)
    },
    stop() {
      this.isPlaying = false
      this.gainNode.disconnect(this.audioCtx.destination)
    },
    setNoteConfig() {
      if(this.sourceType === "0"){
        this.source.type = this.waveType
        this.source.frequency.value = this.frequency
        this.source.detune.value = this.detune
      }
    },
    getUserMic(stream) {
      this.source = this.audioCtx.createMediaStreamSource(stream)
      this.source.connect(this.gainNode)
      this.play()
    }
  },
  watch: {
    'sourceType': {
      handler: function(n, p) {
        if (this.isPlaying) {
          this.stop()
        }
        if (this.source) {
          this.source.disconnect(this.gainNode)
          if(p === "0") this.source.stop()
        }
        console.log(n)
        switch(n) {
          default:
          case "0":
            this.source = this.audioCtx.createOscillator()
            
            this.source.start()
            
            break
          case "1":
            const audio = document.querySelector('audio');
            audio.crossorigin = 'anonymous'
            audio.load()
            this.source = this.audioCtx.createMediaElementSource(audio);
            break
          case "2":
            navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            .then(this.getUserMic)
            .catch(e => console.log(e))
            break
        }
        this.source.connect(this.gainNode)
      },
      immediate: true
    }
  },
  mounted() {
    this.setNoteConfig()
  },
  beforeDestroy() {
    
  }
}
</script>
<style lang="scss" scoped>
#source {
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
      .item {
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
    }
  }
}
</style>
