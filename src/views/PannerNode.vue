  <template>
  <div id="panner-node">
    <h1 class="text-3xl font-bold text-center my-8 dark:text-white">2D Panner Node</h1>
    <div class="text-center my-4">
      <button class="btn" @click="clickHandler"> Play / Pause </button>
      <button class="btn" @click="reset"> Reset </button>
    </div>
    <div id="config">
      <div class="audio-note">
        <h3><span>音源</span></h3>
        <div class="item">
          <label for="frequency">frequency : <span>{{frequency}}</span> </label>
          <input type="range" min="0" max="1960" step="1" id="frequencyRange" v-model="frequency" @input="changeHandler" class="accent-primary">
        </div>
      </div>
      <div class="audio-note">
        <h3><span>增益節點</span></h3>
        <div class="item">
          <label for="volume">volume : <span>{{volume}}</span> </label>
          <input type="range" min="0" max="5" step="0.1" id="volumeRange" v-model="volume" @input="changeHandler" class="accent-primary">
        </div>
      </div>
    </div>
    <div id="drag-area" data-role="drag-drop-container" v-on="dragEvent">
      <div id="listener" :style="{left: dragData.listener.x + 'px', top: dragData.listener.y + 'px'}"> 聽者 </div>
      <div id="source" :style="{left: dragData.source.x + 'px', top: dragData.source.y + 'px'}"> 音源 </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted, onBeforeUnmount } from 'vue'
import audioUnlock from '../lib/audioUnlock'

const AudioContextClass = window.AudioContext || window.webkitAudioContext
const audioCtx = new AudioContextClass()
const oscillator = audioCtx.createOscillator()
const gainNode = audioCtx.createGain()
const panner = audioCtx.createPanner()
const listener = audioCtx.listener

const isPlaying = ref(false)
const waveType = ref<OscillatorType>('triangle')
const frequency = ref(440)
const detune = ref(0)
const volume = ref(1)

const draggingElem = ref('')
const dragData = reactive({
  listener: { x: 0, y: 0 },
  source: { x: 0, y: 0 }
})

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
  frequency.value = 440
  volume.value = 1
  dragData.listener.x = window.innerWidth / 2 + 20
  dragData.listener.y = window.innerHeight / 2 - 50
  dragData.source.x = window.innerWidth / 2 - 20
  dragData.source.y = window.innerHeight / 2 + 50
  setNoteConfig()
}

function play() {
  panner.connect(audioCtx.destination)
}

function stop() {
  panner.disconnect(audioCtx.destination)
}

function setNoteConfig() {
  oscillator.type = waveType.value
  oscillator.frequency.value = frequency.value
  oscillator.detune.value = detune.value
  gainNode.gain.value = volume.value
  panner.setPosition(dragData.source.x, dragData.source.y, 1)
  listener.setPosition(dragData.listener.x, dragData.listener.y, 0)
}

const dragEvent = computed(() => ({
  mousedown: (e: MouseEvent) => {
    const id = (e.target as HTMLElement).id
    if (id === 'source' || id === 'listener') draggingElem.value = id
  },
  mousemove: (e: MouseEvent) => {
    if (!draggingElem.value) return
    const key = draggingElem.value as 'source' | 'listener'
    dragData[key].x = e.clientX - 25
    dragData[key].y = e.clientY - 25
    setNoteConfig()
    e.preventDefault()
  },
  mouseup: () => { draggingElem.value = '' },
  touchstart: (e: TouchEvent) => {
    const id = (e.target as HTMLElement).id
    if (id === 'source' || id === 'listener') draggingElem.value = id
  },
  touchmove: (e: TouchEvent) => {
    if (!draggingElem.value) return
    const key = draggingElem.value as 'source' | 'listener'
    dragData[key].x = e.touches[0].pageX - 25
    dragData[key].y = e.touches[0].pageY - 25
    setNoteConfig()
    e.preventDefault()
  },
  touchend: () => { draggingElem.value = '' }
}))

onMounted(() => {
  audioUnlock(audioCtx)
  reset()
  setNoteConfig()
  panner.rolloffFactor = 0.1
  oscillator.connect(gainNode)
  gainNode.connect(panner)
  oscillator.start()
})

  onBeforeUnmount(() => {
    if (isPlaying.value) {
      panner.disconnect(audioCtx.destination)
      isPlaying.value = false
    }
  })
</script>
<style lang="scss" scoped>
#panner-node {
  max-height: 100vh;
  > button {
    margin: 10px;
  }
  #config {
    display: flex;
    justify-content: center;
    flex-direction: row;
    margin: auto;
    max-width: 50vw;
    min-width: 300px;
    > .audio-note {
      flex: 1;
      box-sizing: border-box;
      margin: 15px auto;
      border: solid 1px #d9d9d9;
      > h3 {
        text-align: center;
        margin: 10px;
        color: #1e293b;
        > span {
          display: inline-block;
        }
      }
      > .item {
        display: flex;
        width: 100%;
        margin: 5px auto;
        padding: 10px;
        color: #1e293b;
        > label {
          display: inline-block;
          min-width: 50px;
          text-align: right;
          > span {
            font-weight: 600;
            display: inline-block;
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
  #drag-area {
    width: 50vw;
    min-width: 300px;
    height: 400px;
    border: solid 1px #d9d9d9;
    margin: auto;
    overflow: hidden;
  }
  #listener {
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    position: absolute;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: #3692be;
    color: white;
    font-size: 16px;
    font-weight: 500;
  }
  #source {
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    position: absolute;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background-color: #bf8f36;
    color: white;
    font-size: 16px;
    font-weight: 500;
  }
}

html.dark #panner-node {
  #config .audio-note {
    border-color: #475569;
    > h3, > .item {
      color: #e2e8f0;
    }
  }
  #drag-area {
    border-color: #475569;
  }
}
</style>
