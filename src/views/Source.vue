<template>
  <div id="source">
    <h1 class="text-3xl font-bold text-center my-8">Source</h1>
    <div class="text-center">
      <button class="btn" @click="clickHandler"> Play / Pause </button>
      <button class="btn" @click="reset"> Reset </button>
    </div>
    <div id="config">
      <div class="audio-note">
        <h3>
          <span>音源：</span>
          <select @change="(e: Event) => sourceType = (e.target as HTMLSelectElement).value">
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
            <input type="range" min="-2000" max="2000" step="1" id="detuneRange" v-model="detune" @input="changeHandler">
          </div>
        </div>
        <div v-show="sourceType==='1'">
          <div class="item">
            <audio id="player" controls preload="auto">
              <source src="../static/Rainy_Day_Games.mp3" type="audio/mp3" />
            </audio>
          </div>
        </div>
        <div v-show="sourceType ==='2'">
          <div class="item">{{micOutput}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import audioUnlock from '../lib/audioUnlock'

const AudioContextClass = window.AudioContext || window.webkitAudioContext
const audioCtx = new AudioContextClass()
const gainNode = audioCtx.createGain()

const isPlaying = ref(false)
const sourceType = ref('0')
let source: OscillatorNode | MediaElementAudioSourceNode | MediaStreamAudioSourceNode | null = null
let audioSource: MediaElementAudioSourceNode | null = null
let micStream: MediaStream | null = null
const waveType = ref<OscillatorType>('sine')
const frequency = ref(440)
const detune = ref(0)
const micOutput = ref<Float32Array>(new Float32Array(0))

function clickHandler() {
  if (isPlaying.value) {
    stop()
  } else {
    play()
  }
}

function changeHandler() {
  setNoteConfig()
}

function reset() {
  waveType.value = 'sine'
  frequency.value = 440
  detune.value = 0
  setNoteConfig()
}

function play() {
  isPlaying.value = true
  gainNode.connect(audioCtx.destination)
}

function stop() {
  isPlaying.value = false
  gainNode.disconnect(audioCtx.destination)
}

function setNoteConfig() {
  if (sourceType.value === '0' && source && 'type' in source) {
    const osc = source as OscillatorNode
    osc.type = waveType.value
    osc.frequency.value = frequency.value
    osc.detune.value = detune.value
  }
}

function getUserMic(stream: MediaStream) {
  micStream = stream
  source = audioCtx.createMediaStreamSource(stream)
  const processor = audioCtx.createScriptProcessor(1024, 1, 1)
  processor.onaudioprocess = (e) => {
    const input = e.inputBuffer.getChannelData(0)
    const output = e.outputBuffer.getChannelData(0)
    for (let i = 0; i < input.length; i++) {
      output[i] = input[i]
    }
    micOutput.value = output
  }
  source.connect(processor)
  processor.connect(gainNode)
}

watch(sourceType, (n, p) => {
  if (isPlaying.value) {
    stop()
  }
  if (source) {
    if (p === '0' && 'stop' in source) (source as OscillatorNode).stop()
    else if (p === '1') (document.querySelector('audio') as HTMLAudioElement)?.pause()
    else if (p === '2') micStream?.getAudioTracks()[0].stop()
  }
  switch (n) {
    default:
    case '0':
      source = audioCtx.createOscillator()
      source.start()
      source.connect(gainNode)
      break
    case '1': {
      const audio = document.querySelector('audio') as HTMLAudioElement
      audio.play()
      if (!audioSource) {
        audioSource = audioCtx.createMediaElementSource(audio)
      }
      source = audioSource
      source.connect(gainNode)
      break
    }
    case '2':
      navigator.mediaDevices.getUserMedia({ audio: true, video: false })
        .then(getUserMic)
        .catch(e => console.error(e))
      break
  }
}, { immediate: true })

onMounted(() => {
  audioUnlock(audioCtx)
  setNoteConfig()
})

onBeforeUnmount(() => {
  if (isPlaying.value) gainNode.disconnect(audioCtx.destination)
  if (micStream) micStream.getAudioTracks()[0].stop()
})
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
      .item {
        display: flex;
        width: 100%;
        max-width: 800px;
        margin: 5px auto;
        padding: 10px;
        max-height: 60vh;
        overflow: hidden;
        > audio {
          margin: auto;
        }
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
