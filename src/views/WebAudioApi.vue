<template>
  <div id="web-audio-api">
    <h1>Hello, Web Audio API</h1>
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
          <input type="range" min="-2000" max="2000" step="1" id="detuneRange" v-model="detune" @input="changeHandler">
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
        <h3><span>濾波器節點</span></h3>
        <div class="item">
          <label for="filterType">filterType : <span>{{filterType}}</span> </label>
          <select id="filterType" v-model="filterType" @change="changeHandler">
            <option value='allpass' selected>allpass</option>
            <option value='highpass'>highpass</option>
            <option value='bandpass'>bandpass</option>
            <option value='lowshelf'>lowshelf</option>
            <option value='highshelf'>highshelf</option>
            <option value='peaking'>peaking</option>
            <option value='notch'>notch</option>
          </select>
        </div>
        <div class="item">
          <label for="filterF">filterF : <span>{{filterF}}</span> </label>
          <input type="range" min="0" max="4000" step="1" id="filterF" v-model="filterF" @input="changeHandler">
        </div>
        <div class="item">
          <label for="filterQ">filterQ : <span>{{filterQ}}</span> </label>
          <input type="range" min="0.01" max="1000" step="0.01" id="filterQ" v-model="filterQ" @input="changeHandler">
        </div>
        <div class="item">
          <label for="filterGain">filterGain : <span>{{filterGain}}</span> </label>
          <input type="range" min="0" max="5" step="0.1" id="filterGain" v-model="filterGain" @input="changeHandler">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import audioUnlock from '../lib/audioUnlock'

const AudioContextClass = window.AudioContext || window.webkitAudioContext
const audioCtx = new AudioContextClass()
const oscillator = audioCtx.createOscillator()
const gainNode = audioCtx.createGain()
const filter = audioCtx.createBiquadFilter()

const isPlaying = ref(false)
const waveType = ref<OscillatorType>('sine')
const frequency = ref(440)
const detune = ref(0)
const volume = ref(1)
const filterType = ref<BiquadFilterType>('allpass')
const filterF = ref(350)
const filterQ = ref(1)
const filterGain = ref(0)

function setNoteConfig() {
  oscillator.type = waveType.value
  oscillator.frequency.value = frequency.value
  oscillator.detune.value = detune.value
  gainNode.gain.value = volume.value
  filter.type = filterType.value
  filter.frequency.value = filterF.value
  filter.Q.value = filterQ.value
  filter.gain.value = filterGain.value
}

function play() {
  filter.connect(audioCtx.destination)
}

function stop() {
  filter.disconnect(audioCtx.destination)
}

function clickHandler() {
  if (isPlaying.value) {
    stop()
  } else {
    play()
  }
  isPlaying.value = !isPlaying.value
}

function changeHandler() {
  setNoteConfig()
}

function reset() {
  waveType.value = 'sine'
  frequency.value = 440
  detune.value = 0
  volume.value = 1
  filterType.value = 'allpass'
  filterF.value = 350
  filterQ.value = 1
  filterGain.value = 0
  setNoteConfig()
}

onMounted(() => {
  audioUnlock(audioCtx)
  setNoteConfig()
  oscillator.connect(gainNode)
  gainNode.connect(filter)
  oscillator.start()
})

onBeforeUnmount(() => {
  if (isPlaying.value) stop()
})
</script>
<style lang="scss" scoped>
#web-audio-api {
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
