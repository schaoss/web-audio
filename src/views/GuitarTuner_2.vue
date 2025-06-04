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

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import audioUnlock from '../lib/audioUnlock'

const AudioContext = window.AudioContext || window.webkitAudioContext
const audioCtx = new AudioContext()
const gainNode = audioCtx.createGain()
const analyser = audioCtx.createAnalyser()

gainNode.gain.value = 0
analyser.fftSize = 2048
analyser.connect(gainNode)

const isPlaying = ref(false)
let source = null
let micStream = null
const timeArray = ref(new Float32Array(analyser.fftSize / 2))

const semiTone = ref(null)
const centsOff = ref(0)

const getInputFrequency = computed(() => {
  const MAX_SAMPLES = timeArray.value.length / 2
  const GOOD_ENOUGH_CORRELATION = 0.9
  const correlations = new Array(MAX_SAMPLES)
  let best_offset = -1
  let best_correlation = 0
  let last_correlation = 1
  let foundGoodCorrelation = false

  if(timeArray.value.reduce((rms, d) => rms += d ** 2, 0) < 0.01) return -1

  for(let offset = 0; offset < MAX_SAMPLES; offset++) {
    let correlation = 0
    for(let n = 0; n < MAX_SAMPLES; n++) {
      correlation += Math.abs((timeArray.value[n])-(timeArray.value[n + offset]))
    }
    correlation = 1 - (correlation / MAX_SAMPLES)
    correlations[offset] = correlation

    if ((correlation > GOOD_ENOUGH_CORRELATION) && (correlation > last_correlation)) {
      foundGoodCorrelation = true
      if (correlation > best_correlation) {
        best_correlation = correlation
        best_offset = offset
      }
    } else if (foundGoodCorrelation) {
      const shift = (correlations[best_offset + 1] - correlations[best_offset - 1]) / correlations[best_offset]
      return Math.round(audioCtx.sampleRate / (best_offset + (8 * shift)))
    }
    last_correlation = correlation
  }
  if (best_correlation > 0.01) {
    return Math.round(audioCtx.sampleRate / best_offset)
  }
  return -1;
})

const getFrequencyStr = computed(() => getInputFrequency.value > 0 ? getInputFrequency.value : '-')

const getNoteStr = computed(() => {
  const noteStr = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B']
  return semiTone.value ? noteStr[semiTone.value % 12] : '-'
})

const getCentsOffStr = computed(() => {
  return centsOff.value < 0
    ? Math.abs(centsOff.value) + ' b'
    : centsOff.value > 0
      ? Math.abs(centsOff.value) + ' #'
      : '-'
})

function clickHandler(){
  if (isPlaying.value) {
    stop()
  } else {
    play()
  }
}

function play() {
  isPlaying.value = true
  gainNode.connect(audioCtx.destination)
  requestAnimationFrame(getMicData)
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

function getMicData(){
  timeArray.value = new Float32Array(analyser.fftSize)
  analyser.getFloatTimeDomainData(timeArray.value)
  semiTone.value = getSemitone(getInputFrequency.value)
  centsOff.value = getCentsOffFromPitch(getInputFrequency.value, semiTone.value)
  if (isPlaying.value) requestAnimationFrame(getMicData)
}

function getSemitone(f) {
  return Math.round(12 * (Math.log(f / 440) / Math.log(2) )) + 69
}

function getFrequencyFromSemitone(note) {
  return 440 * Math.pow(2, (note - 69) / 12)
}

function getCentsOffFromPitch(f, note) {
  return Math.floor(1200 * Math.log(f / getFrequencyFromSemitone(note)) / Math.log(2))
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
#guitar-tuner {
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
