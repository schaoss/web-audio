<template>
  <div id="voice-changer">
    <h1 class="text-3xl font-bold text-center my-8 dark:text-white">VoiceChanger</h1>
    <div class="text-center my-4">
      <button class="btn" @click="clickHandler"> On / Off </button>
    </div>
    <div id="config">
      <div class="audio-note">
        <div class="item">
          <label for="pitchRatio">頻率倍率 : <span>{{pitchRatio}}</span></label>
          <input type="range" min="0.5" max="2" step="0.01" id="pitchRatio" v-model="pitchRatio" class="accent-primary">
        </div>
        <div class="item">
          <label for="overlapRatio">重疊率 : <span>{{overlapRatio}}</span></label>
          <input type="range" min="0.1" max="1" step="0.01" id="overlapRatio" v-model="overlapRatio" class="accent-primary">
        </div>
        <div class="result">
          <div class="timeData" v-for="n in 512" :key="n" :style="{'height': timeArray[(n-1)]*200+2 + 'px'}" />
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
const gainNode = audioCtx.createGain()
gainNode.gain.value = 1

const isPlaying = ref(false)
let micStream: MediaStream | null = null
const timeArray = ref(new Float32Array(2048))

const pitchRatio = ref(1.0)
const overlapRatio = ref(0.5)
const bufferSize = 2048

function clickHandler() {
  if (isPlaying.value) {
    stop()
  } else {
    play()
  }
}

function play() {
  isPlaying.value = true
  gainNode.connect(audioCtx.destination)
}

function stop() {
  isPlaying.value = false
  gainNode.disconnect(audioCtx.destination)
}

function getUserMic(stream: MediaStream) {
  micStream = stream

  const buffer = new Float32Array(bufferSize * 2)
  const hannWindow = hannWindowFn(bufferSize)

  const source = audioCtx.createMediaStreamSource(stream)
  const processor = audioCtx.createScriptProcessor(bufferSize, 1, 1)

  processor.onaudioprocess = e => {
    const input = e.inputBuffer.getChannelData(0)
    const output = e.outputBuffer.getChannelData(0)
    for (let i = 0; i < input.length; i++) {
      input[i] *= hannWindow[i]
      buffer[i] = buffer[i + bufferSize]
      buffer[i + bufferSize] = 0.0
    }

    const grainData = new Float32Array(bufferSize)
    for (let i = 0, j = 0.0; i < bufferSize; i++, j += parseFloat(String(pitchRatio.value))) {
      const index = Math.floor(j) % bufferSize
      const a = input[index]
      const b = input[(index + 1) % bufferSize]
      grainData[i] += linearInterpolation(a, b, j % pitchRatio.value) * hannWindow[i]
    }
    for (let i = 0; i < bufferSize; i += Math.round(bufferSize * overlapRatio.value)) {
      for (let j = 0; j <= bufferSize; j++) {
        buffer[i + j] += grainData[j]
      }
    }

    for (let i = 0; i < bufferSize; i++) {
      output[i] = buffer[i] || 0
    }
    timeArray.value = output
  }
  source.connect(processor)
  processor.connect(gainNode)
}

function hannWindowFn(length: number): Float32Array {
  const window = new Float32Array(length)
  for (let i = 0; i < length; i++) {
    window[i] = 0.5 * (1 - Math.cos((2 * Math.PI * i) / (length - 1)))
  }
  return window
}

function linearInterpolation(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

onMounted(() => {
  audioUnlock(audioCtx)
  navigator.mediaDevices
    .getUserMedia({ audio: true, video: false })
    .then(getUserMic)
    .catch(e => console.error(e))
})

onBeforeUnmount(() => {
  if (micStream) micStream.getAudioTracks()[0].stop()
})
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
      width: 50vw;
      min-width: 300px;
      margin: 15px auto;
      border: solid 1px #d9d9d9;
      > h3 {
        text-align: left;
        margin: 10px;
        color: #1e293b;
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
        color: #1e293b;
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

html.dark #voice-changer {
  #config .audio-note {
    border-color: #475569;
    > h3, > .item {
      color: #e2e8f0;
    }
  }
}
</style>
