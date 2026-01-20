<template>
  <div id="stereo-panner-node">
    <h1 class="text-3xl font-bold text-center my-8">Stereo Panner Node</h1>
    <div class="text-center">
      <button class="btn" @click="clickHandler"> Play / Pause </button>
      <button class="btn" @click="reset"> Reset </button>
    </div>
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
        <h3><span>雙聲道節點</span></h3>
        <div class="item">
          <label for="pan">pan : <span>{{pan}}</span> </label>
          <input type="range" min="-1" max="1" step="0.01" id="pan" v-model="pan" @input="changeHandler">
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
const stereoPanner = audioCtx.createStereoPanner()

const isPlaying = ref(false)
const waveType = ref<OscillatorType>('sine')
const frequency = ref(440)
const detune = ref(0)
const volume = ref(1)
const pan = ref(0)

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
  pan.value = 0
  setNoteConfig()
}

function play() { stereoPanner.connect(audioCtx.destination) }

function stop() { stereoPanner.disconnect(audioCtx.destination) }

function setNoteConfig() {
  oscillator.type = waveType.value
  oscillator.frequency.value = frequency.value
  oscillator.detune.value = detune.value
  gainNode.gain.value = volume.value
  stereoPanner.pan.value = pan.value
}

onMounted(() => {
  audioUnlock(audioCtx)
  setNoteConfig()
  oscillator.connect(gainNode)
  gainNode.connect(stereoPanner)
  oscillator.start()
})

onBeforeUnmount(() => {
  if (isPlaying.value) stereoPanner.disconnect(audioCtx.destination)
})
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
