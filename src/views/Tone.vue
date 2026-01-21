<template>
  <div id="tone" class="px-4">
    <h1 class="text-3xl font-bold text-center my-8 dark:text-white"> Tone.js </h1>
    <div class="content max-w-2xl mx-auto my-8 p-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg">
      <h2 class="text-2xl font-bold text-center mb-4 dark:text-slate-300">{{getChord}}</h2>
      <h3 class="text-xl text-center mb-6 dark:text-slate-300">{{notes[0]}}, {{notes[1]}}, {{notes[2]}}, {{notes[3]}}</h3>
      <div class="text-center">
        <button class="btn" @click="clickHandler"> Play / Pause</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import * as Tone from 'tone'
import { Chord } from 'tonal'
import audioUnlock from '../lib/audioUnlock'

 const noteArr = [
   'C3', 'D3', 'E3', 'F3', 'G3', 'B3', 'C4', 'D4', 'E4', 'F4', 'G4', 'B4'
 ]

const polySynth = new Tone.PolySynth(Tone.Synth, {}).toDestination()
polySynth.maxPolyphony = 6

const notes = ref<string[]>(['-', '-', '-', '-'])
const isPlaying = ref(false)

const pattern = new Tone.Pattern(
  (time, note) => {
    polySynth.triggerAttackRelease(note, '1n')
    notes.value[Math.floor((time * 2) % 4)] = note
  },
  noteArr,
  'randomOnce'
)

function clickHandler() {
  if (isPlaying.value) {
    pattern.stop()
    notes.value = ['-', '-', '-', '-']
  } else {
    pattern.start()
  }
  isPlaying.value = !isPlaying.value
}

const getChord = computed(() => {
  return notes.value.every(n => n !== '-') ? Chord.detect(notes.value)[0] || '-' : '-'
})

onMounted(() => {
  audioUnlock(Tone.getContext() as unknown as AudioContext)
  Tone.getTransport().bpm.value = 80
  Tone.getTransport().start()
})

 onBeforeUnmount(() => {
  if (isPlaying.value) {
    pattern.stop()
    notes.value = ['-', '-', '-', '-']
    isPlaying.value = false
  }
  pattern.cancel()
  Tone.getTransport().cancel().stop()
})
</script>

<style lang="scss" scoped>
#tone {
  max-height: 100vh;
  overflow: auto;
  .content {
    max-width: 50vw;
    margin: 40px auto;
    > div {
      text-align: left;
      line-height: 1.8;
      white-space: normal;
      word-break: break-word;
    }
    img {
      width: 100%;
    }
  }
}

html.dark #tone {
  .content > div {
    color: #e2e8f0;
  }
}
</style>
