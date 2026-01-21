<template>
  <div id="sequencer">
    <div id="config" :class="{'drum': tab === 0, 'lead': tab === 1}">
      <button @click="tabHandler"><i class="fas" :class="{ 'fa-drum': tab === 0, 'fa-music': tab === 1}"></i></button>
      <button @click="random"><i class="fas fa-random"></i></button>
      <div id="play">
        <button @click="playHandler"><i class="fas"
            :class="{'fa-play': !isPlaying, 'fa-pause': isPlaying}"></i></button>
      </div>
      <div id="bpm">
        <button @click="BPM -= 5"><i class="fas fa-minus"></i></button>
        <input type="text" :value="BPM" readonly /><span>bpm</span>
        <button @click="BPM += 5"><i class="fas fa-plus"></i></button>
      </div>
      <button @click="reset"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div id="pad" @mousedown="mousedown" @mouseup="mouseup" @touchstart="touchstart" @touchend="touchend"
      @touchmove="touchmove">
      <div id="timeLine">
        <div v-for="i in 16" :key="`time_${i-1}`" class="time" :class="{'active': index === i-1 }" />
      </div>
      <div id="drum" class="set" v-show="tab === 0">
        <ul class="kick">
          <li v-for="i in 16" :key="`kick_${i-1}`" :name="`kick_${i-1}`" class='item'
            :class="{'active': !!sequencer.drum.kick[i-1] }" @mousedown="clickHandler(sequencer.drum.kick, i-1)"
            @mouseenter="() => mouseenter(sequencer.drum.kick, i-1)"
            @touchstart="clickHandler(sequencer.drum.kick, i-1)" />
        </ul>
        <ul class="hihat">
          <li v-for="i in 16" :key="`hihat_${i-1}`" :name="`hihat_${i-1}`" class='item'
            :class="{'active': !!sequencer.drum.hihat[i-1] }" @mousedown="clickHandler(sequencer.drum.hihat, i-1)"
            @mouseenter="() => mouseenter(sequencer.drum.hihat, i-1)" />
        </ul>
        <ul class="snare">
          <li v-for="i in 16" :key="`snare_${i-1}`" :name="`snare_${i-1}`" class='item'
            :class="{'active': !!sequencer.drum.snare[i-1] }" @mousedown="clickHandler(sequencer.drum.snare, i-1)"
            @mouseenter="() => mouseenter(sequencer.drum.snare, i-1)" />
        </ul>
        <ul class="tomL">
          <li v-for="i in 16" :key="`tomL_${i-1}`" :name="`tomL_${i-1}`" class='item'
            :class="{'active': !!sequencer.drum.tomL[i-1] }" @mousedown="clickHandler(sequencer.drum.tomL, i-1)"
            @mouseenter="() => mouseenter(sequencer.drum.tomL, i-1)" />
        </ul>
        <ul class="tomM">
          <li v-for="i in 16" :key="`tomM_${i-1}`" :name="`tomM_${i-1}`" class='item'
            :class="{'active': !!sequencer.drum.tomM[i-1] }" @mousedown="clickHandler(sequencer.drum.tomM, i-1)"
            @mouseenter="() => mouseenter(sequencer.drum.tomM, i-1)" />
        </ul>
        <ul class="tomH">
          <li v-for="i in 16" :key="`tomH_${i-1}`" :name="`tomH_${i-1}`" class='item'
            :class="{'active': !!sequencer.drum.tomH[i-1] }" @mousedown="clickHandler(sequencer.drum.tomH, i-1)"
            @mouseenter="() => mouseenter(sequencer.drum.tomH, i-1)" />
        </ul>
      </div>
      <div id="lead" class="set" v-show="tab === 1">
        <ul v-for="(_row, i) in sequencer.lead" :key="`lead_${i}`">
          <li v-for="j in 16" :key="`lead_${i}_${j-1}`" :name="`lead_${i}_${j-1}`" class='item'
            :class="{'active': !!sequencer.lead[i][j-1] }" @mousedown="clickHandler(sequencer.lead[i], j-1)"
            @mouseenter="() => mouseenter(sequencer.lead[i], j-1)" />
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import * as Tone from 'tone'
import Snare from '../lib/snare'
import audioUnlock from '../lib/audioUnlock'
import { useRoute } from 'vue-router'

interface DrumSequencer {
  kick: boolean[]
  hihat: boolean[]
  snare: boolean[]
  tomL: boolean[]
  tomM: boolean[]
  tomH: boolean[]
}

const route = useRoute()
const { bpm = '120' } = route.query as { bpm?: string }

const defaultSequencer = reactive({
  drum: {
    kick: Array(16).fill(false) as boolean[],
    hihat: Array(16).fill(false) as boolean[],
    snare: Array(16).fill(false) as boolean[],
    tomL: Array(16).fill(false) as boolean[],
    tomM: Array(16).fill(false) as boolean[],
    tomH: Array(16).fill(false) as boolean[]
  },
  lead: Array.from({ length: 7 }, () => Array(16).fill(false) as boolean[])
})

const sequencer = reactive({
  drum: JSON.parse(JSON.stringify(defaultSequencer.drum)) as DrumSequencer,
  lead: JSON.parse(JSON.stringify(defaultSequencer.lead)) as boolean[][]
})

const tab = ref(0)
const isPlaying = ref(false)
const isDraging = ref(false)
const touchTarget = ref('')
const index = ref(-1)

const kick = new Tone.MembraneSynth({}).toDestination()
const tomL = new Tone.MembraneSynth({ octaves: 1 }).toDestination()
const tomM = new Tone.MembraneSynth({ octaves: 1 }).toDestination()
const tomH = new Tone.MembraneSynth({ octaves: 1 }).toDestination()
const hihat = new Tone.NoiseSynth({}).toDestination()
const snare = new Snare({ volume: -6 }).toDestination()
const poly = new Tone.PolySynth(Tone.Synth, {}).toDestination()
poly.maxPolyphony = 8

kick.volume.value = 6
hihat.volume.value = -2
tomL.volume.value = 0
tomM.volume.value = 0
tomH.volume.value = 0
poly.set({ volume: 2 })

const BPM = ref(Number(bpm) || 120)
Tone.getTransport().bpm.value = BPM.value
Tone.getTransport().scheduleRepeat(time => {
  index.value = (index.value + 1) % 16
  if (sequencer.drum.kick[index.value]) kick.triggerAttackRelease('C1', '8n', time)
  if (sequencer.drum.hihat[index.value]) hihat.triggerAttackRelease('16n', time)
  if (sequencer.drum.snare[index.value]) snare.trigger(time)
  if (sequencer.drum.tomL[index.value]) tomL.triggerAttackRelease('G1', '8n', time)
  if (sequencer.drum.tomM[index.value]) tomM.triggerAttackRelease('C2', '8n', time)
  if (sequencer.drum.tomH[index.value]) tomH.triggerAttackRelease('E2', '8n', time)
  const leadNotes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'C5']
  leadNotes.forEach((note, i) => {
    if (sequencer.lead[i][index.value]) poly.triggerAttackRelease(note, '16n', time)
  })
}, '16n')

function playHandler() {
  if (isPlaying.value) {
    stop()
  } else {
    play()
  }
}

function tabHandler() {
  tab.value = (tab.value + 1) % 2
}

function clickHandler(arr: boolean[], i: number) {
  arr[i] = !arr[i]
}

function reset() {
  if (tab.value === 0) {
    sequencer.drum = JSON.parse(JSON.stringify(defaultSequencer.drum))
  } else if (tab.value === 1) {
    sequencer.lead = JSON.parse(JSON.stringify(defaultSequencer.lead))
  }
}

function random() {
  if (tab.value === 0) {
    sequencer.drum = {
      kick: getRandomArray(),
      hihat: getRandomArray(),
      snare: getRandomArray(),
      tomL: getRandomArray(),
      tomM: getRandomArray(),
      tomH: getRandomArray()
    }
  } else if (tab.value === 1) {
    sequencer.lead = Array.from({ length: 7 }, getRandomArray)
  }
}

function getRandomArray(length = 16): boolean[] {
  return Array.from({ length }, () => Math.random() > 0.8)
}

function play() {
  isPlaying.value = true
  Tone.getTransport().start()
}

function stop() {
  isPlaying.value = false
  Tone.getTransport().stop()
  index.value = -1
}

function scrollTop() {
  setTimeout(() => window.scrollTo(0, 1), 10)
}

function mousedown() {
  isDraging.value = true
}

function mouseenter(arr: boolean[], i: number) {
  if (!isDraging.value) return
  clickHandler(arr, i)
}

function mouseup() {
  isDraging.value = false
}

function touchstart(e: TouchEvent) {
  isDraging.value = true
  touchTarget.value = (e.target as HTMLElement).getAttribute('name') || ''
}

function touchmove(e: TouchEvent) {
  if (!isDraging.value) return
  const { clientX, clientY } = e.targetTouches[0]
  const elem = document.elementFromPoint(clientX, clientY)
  const name = elem?.getAttribute('name')
  if (name) {
    if (name !== touchTarget.value) {
      touchTarget.value = name
      const tmpArr = name.split('_')
      if (tmpArr[0] === 'lead') {
        clickHandler(sequencer.lead[parseInt(tmpArr[1])], parseInt(tmpArr[2]))
      } else {
        clickHandler(sequencer.drum[tmpArr[0] as keyof DrumSequencer], parseInt(tmpArr[1]))
      }
    }
  }
  e.preventDefault()
}

function touchend() {
  isDraging.value = false
  touchTarget.value = ''
}

onMounted(() => {
  audioUnlock(Tone.getContext() as unknown as AudioContext)
  const menuTrigger = document.querySelector('#menuTrigger') as HTMLElement | null
  if (menuTrigger) menuTrigger.style.display = 'none'
  window.addEventListener('load', scrollTop)
})

onBeforeUnmount(() => {
  const menuTrigger = document.querySelector('#menuTrigger') as HTMLElement | null
  if (menuTrigger) menuTrigger.style.display = ''
  Tone.getTransport().stop()
  window.removeEventListener('load', scrollTop)
})
</script>

<style lang="scss" scoped>
$white: #e9e9e9;
$black: #222222;

#sequencer {
  background-color: $black;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  #config {
    margin: 10px auto;
    display: inline-flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-content: center;
    width: 100%;
    #bpm {
      line-height: 100%;
      font-size: 3vw;
      > input {
        width: 6vw;
        cursor: unset;
        user-select: none;
        background-color: unset;
        color: $white;
        border: 0;
        padding: 0;
        text-align: center;
      }
      > span {
        color: $white;
        font-size: 50%;
        margin-right: 5px;
      }
    }
    button {
      padding: 0;
      text-align: center;
      color: #222;
      line-height: 100%;
      font-size: 3vw;
      width: 6vw;
      height: 6vw;
      background-color: #f9f9f9;
      border: 0;
      border-radius: 10%;
      margin: 1px;
      cursor: pointer;
    }
    &.drum > button {
      background: rgb(255, 209, 195);
      background: linear-gradient(
        135deg,
        rgba(255, 209, 195, 1) 0%,
        rgba(240, 241, 31, 1) 100%
      );
    }
    &.lead > button {
      background: rgb(78, 190, 186);
      background: linear-gradient(
        135deg,
        rgba(78, 190, 186, 1) 0%,
        rgba(45, 161, 253, 1) 100%
      );
    }
  }
  #pad {
    #timeLine {
      display: inline-flex;
      flex-flow: row nowrap;
      justify-content: space-around;
      align-content: center;
      align-items: center;
      width: 100%;
      height: 10px;
      .time {
        width: 6%;
        height: 5px;
        background-color: #ff5733;
        opacity: 0.2;
        margin: 5px 0;
        border-radius: 5px;
        transition: all 0.1s;
      }
      & .active {
        height: 10px;
        opacity: 1;
      }
    }
    .set {
      margin: 5px 0;
      &#drum {
        background: rgb(255, 209, 195);
        background: linear-gradient(
          135deg,
          rgba(255, 209, 195, 1) 0%,
          rgba(240, 241, 31, 1) 100%
        );
      }
      &#lead {
        background: rgb(78, 190, 186);
        background: linear-gradient(
          135deg,
          rgba(78, 190, 186, 1) 0%,
          rgba(45, 199, 253, 1) 100%
        );
      }
      > ul {
        display: flex;
        justify-content: space-around;
        padding-inline-start: 0;
        margin-block-start: 0;
        margin-block-end: 0;
        li {
          display: block;
          width: 100%;
          position: relative;
          box-sizing: border-box;
          background-color: #444444;
          border:1px solid $black;
        }
        li:before {
          content: '';
          border: 2px solid $black;
          position: absolute;
          top: -2px;
          left: -2px;
          width: 100%;
          height: 100%;
          z-index: 2;
          border-radius: 6px;
        }
        li:after {
          content: '';
          position: relative;
          display: block;
          width: 100%;
          padding-top: 100%;
          cursor: pointer;
        }
        & .active {
          background-color: rgba($color: #000000, $alpha: 0);
        }
      }
    }
  }
}

</style>
