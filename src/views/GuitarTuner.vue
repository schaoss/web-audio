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

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import audioUnlock from '../lib/audioUnlock'

const AudioContextClass = window.AudioContext || window.webkitAudioContext
const audioCtx = new AudioContextClass()
const oscillator = audioCtx.createOscillator()
const gainNode = audioCtx.createGain()

const isPlaying = ref(false)
const waveType = ref<OscillatorType>('triangle')
const frequency = ref(440)
const detune = ref(0)
const volume = ref(1)

const standardA4 = ref(440)
const tuning = ref('standard')
const noteArr = ref(['E2','A2','D3','G3','B3','E4'])
const note = ref('-')

type TuningType = 'standard' | '1-step-down' | 'drop-d' | 'open-e' | 'open-d'

const noteNameMap: Record<string, number> = {
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

const tuningNoteMap: Record<TuningType, string[]> = {
  'standard': ['E2','A2','D3','G3','B3','E4'],
  '1-step-down': ['D2','G2','C3','F3','A3','D4'],
  'drop-d': ['D2','A2','D3','G3','B3','E4'],
  'open-e': ['E2','B2','E3','G#3','B3','E4'],
  'open-d': ['D2','A2','D3','F#3','A3','D4']
}

function playHandler() {
  if (isPlaying.value) {
    stop()
    note.value = '-'
  } else {
    changeNoteHandler(noteArr.value[0])
    play()
  }
  isPlaying.value = !isPlaying.value
}

function changeTuningHandler() {
  noteArr.value = getTuningNoteArr()
}

function changeNoteHandler(n: string) {
  note.value = n
  frequency.value = getFrequency(getSemitone(n))
  setNoteConfig()
}

function changeConfigHandler() {
  frequency.value = getFrequency(getSemitone(note.value))
  setNoteConfig()
}

function reset() {
  waveType.value = 'triangle'
  standardA4.value = 440
  detune.value = 0
  volume.value = 1
  setNoteConfig()
}

function play() {
  gainNode.connect(audioCtx.destination)
}

function stop() {
  gainNode.disconnect(audioCtx.destination)
}

function setNoteConfig() {
  oscillator.type = waveType.value
  oscillator.frequency.value = frequency.value
  oscillator.detune.value = detune.value
  gainNode.gain.value = volume.value
}

function getSemitone(n: string): number {
  if (!n || n === '-') return 69
  const noteName = n.slice(0, -1)
  const octave = parseInt(n.slice(-1))
  return (noteNameMap[noteName] ?? 0) + 12 * (1 + octave)
}

function getFrequency(semitone: number): number {
  return standardA4.value * Math.pow(2, (semitone - 69) / 12)
}

function getTuningNoteArr(): string[] {
  return tuningNoteMap[tuning.value as TuningType] ?? tuningNoteMap.standard
}

onMounted(() => {
  audioUnlock(audioCtx)
  setNoteConfig()
  oscillator.connect(gainNode)
  oscillator.start()
})

onBeforeUnmount(() => {
  if (isPlaying.value) gainNode.disconnect(audioCtx.destination)
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
  #notes {
    width: 50%;
    min-width: 300px;
    margin: auto;
    display: flex;
    justify-content: space-around;
    flex-flow: wrap;
    > .note {
      min-width: 70px;
      box-sizing: border-box;
      padding: 20px;
      margin: 10px;
      cursor: pointer;
      border: solid 1px #d9d9d9;
      background-color: #f9f9f9;
    }
  }
}
</style>
