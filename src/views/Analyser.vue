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

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import audioUnlock from '../lib/audioUnlock'

const AudioContext = window.AudioContext || window.webkitAudioContext
const audioCtx = new AudioContext()
const gainNode = audioCtx.createGain()
const analyser = audioCtx.createAnalyser()

gainNode.gain.value = 1
analyser.fftSize = 1024
analyser.connect(gainNode)

const isPlaying = ref(false)
const isMute = ref(false)
let source = null
let micStream = null
const fftArray = ref(new Uint8Array(analyser.fftSize))

function clickHandler(){
  if (isPlaying.value) {
    stop()
  } else {
    play()
  }
}

function muteHandler() {
  isMute.value = !isMute.value
  gainNode.gain.value = isMute.value ? 0 : 1
}

function play() {
  isPlaying.value = true
  gainNode.connect(audioCtx.destination)
  requestAnimationFrame(getFFTData)
}

function stop() {
  isPlaying.value = false
  gainNode.disconnect(audioCtx.destination)
}

function getUserMic(stream) {
  micStream = stream
  source = audioCtx.createMediaStreamSource(stream)
  source.connect(analyser)
}

function getFFTData(){
  fftArray.value = new Uint8Array(analyser.fftSize)
  analyser.getByteFrequencyData(fftArray.value)
  if (isPlaying.value) requestAnimationFrame(getFFTData)
}

onMounted(() => {
  audioUnlock(audioCtx)
  navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    .then(getUserMic)
    .catch(e => console.log(e))
})

onBeforeUnmount(() => {
  if(micStream) micStream.getAudioTracks()[0].stop()
})
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
