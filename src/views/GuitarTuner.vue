<template>
  <div id="guitar-tuner">
    <h1> Guitar Tuner </h1>
    <button @click="playHandler"> Play / Pause </button>
    <button @click="reset"> Reset </button>
    <div id="config">
      <div class="audio-note">
        <h3><span>設定</span></h3>
        <div class="item">
          <label for="standardA4">A4 : <span>{{standardA4}}</span> </label>
          <input type="range" min="430" max="450" step="1" id="standardA4Range" v-model="standardA4" @input="changeConfigHandler">
        </div>
        <div class="item">
          <label for="tuning">調弦法 : <span></span></label>
          <select id="tuning" v-model="tuning" @change="changeTuningHandler">
            <option value='standard' selected>標準</option>
            <option value='1-step-down'>降全音</option>
            <option value='drop-d'>Drop D</option>
            <option value='open-e'>Open E</option>
            <option value='open-d'>Open D</option>
          </select>
        </div>
        <div class="item">
          <label for="volume">volume : <span>{{volume}}</span> </label>
          <input type="range" min="0" max="5" step="0.1" id="volumeRange" v-model="volume" @input="changeConfigHandler">
        </div>
      </div>
    </div>
    <div id="notes">
      <div class="note" v-for="n in noteArr" :key="n" @click="changeNoteHandler(n)">{{n}}</div>
    </div>
    <div id="display">
      <h1>{{note}}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GuitarTuner',
  data() {
    const AudioContext = window.AudioContext || window.webkitAudioContext // 跨瀏覽器
    const audioCtx = new AudioContext() // 主控台的概念
    const oscillator = audioCtx.createOscillator() // 振盪器 (音源)
    const gainNode = audioCtx.createGain() // 增益節點 控制音量的
    return {
      isPlaying: false,
      audioCtx,
      oscillator,
      gainNode,
      waveType: 'triangle', // sine, square, sawtooth, triangle
      frequency: 440, // A4 -> 69
      detune: 0, // 解諧 可做出和聲
      volume: 1, // 音量

      standardA4: 440,
      tuning: 'standard',
      noteArr: ['E2','A2','D3','G3','B3','E4'],
      note: '-'
    }
  },
  methods: {
    playHandler(){
      if (this.isPlaying) {
        this.stop()
        this.note = '-'
      } else {
        this.changeNoteHandler(this.noteArr[0])
        this.play()
      }
      this.isPlaying = !this.isPlaying
    },
    changeTuningHandler() {
      this.noteArr = this.getTuningNoteArr(this.tuning)
    },
    changeNoteHandler(note) {
      this.note = note
      this.frequency = this.getFrequency(this.getSemitone(note))
      this.setNoteConfig()
    },
    changeConfigHandler() {
      this.frequency = this.getFrequency(this.getSemitone(this.note))
      this.setNoteConfig()
    },
    reset(){
      this.waveType = 'triangle'
      this.standardA4 = 440
      this.detune = 0
      this.volume = 1
      this.setNoteConfig()
    },
    play() {
      this.gainNode.connect(this.audioCtx.destination)
    },
    stop() {
      this.gainNode.disconnect(this.audioCtx.destination)
    },
    setNoteConfig() {
      this.oscillator.type = this.waveType
      this.oscillator.frequency.value = this.frequency
      this.oscillator.detune.value = this.detune
      this.gainNode.gain.value = this.volume
    },
    getSemitone(note) {
      if(!note || note === '-') return 69
      const noteList = {
        'C': 0,
        'C#': 1,
        'Db': 1,
        'D': 2,
        'D#': 3,
        'Eb': 3,
        'E': 4,
        'F': 5,
        'F#': 6,
        'Gb': 6,
        'G': 7,
        'G#': 8,
        'Ab': 8,
        'A': 9,
        'A#': 10,
        'Bb': 10,
        'B': 11
      }
      return noteList[note.slice(0,-1)] + 12 * (1 + parseInt(note.slice(-1)))
    },
    getFrequency(semitone) {
      return this.standardA4 * Math.pow(2, (semitone - 69)/12)
    },
    getTuningNoteArr() {
      const noteNameArr = {
        'standard' : ['E2','A2','D3','G3','B3','E4'],
        '1-step-down' : ['D2','G2','C3','F3','A3','D4'],
        'drop-d' : ['D2','A2','D3','G3','B3','E4'],
        'open-e' : ['E2','B2','E3','G#3','B3','E4'],
        'open-d' : ['D2','A2','D3','F#3','A3','D4']
      }
      return noteNameArr[this.tuning]
    }
  },
  mounted() {
    this.setNoteConfig()
    this.oscillator.connect(this.gainNode)
    this.oscillator.start() // 啟動音源
  },
  beforeDestroy() {
    if(this.isPlaying) this.gainNode.disconnect(this.audioCtx.destination)
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
    }
  }
  #notes {
    width: 50%;
    margin: auto;
    display: flex;
    justify-content: space-evenly;
    > .note {
      width: 10%;
      padding: 20px;
      margin: 10px;
      cursor: pointer;
      border: solid 1px #d9d9d9;
      background-color: #f9f9f9;
    }
  }
}
</style>
