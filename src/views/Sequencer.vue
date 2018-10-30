<template>
  <div id="sequencer">
    <div id="config">
      <button @click="clickHandler"> Play / Pause</button>
    </div>
    <div id="pad">
      <div id="timeLine">
        <div v-for="i in 16" :key="`time_${i}`" :class="{'time': true, 'active': index === i-1 }" />
      </div>
      <div id="drum" class="set">
        <div class="kick">
          <div v-for="i in 16" :key="`kick_${i}`" :class="{'item': true, 'active': !!sequencer.drum.kick[i-1] }" @click="$set(sequencer.drum.kick, i-1, !sequencer.drum.kick[i-1])" />
        </div>
        <div class="hihat">
          <div v-for="i in 16" :key="`hihat_${i}`" :class="{'item': true, 'active': !!sequencer.drum.hihat[i-1] }" @click="$set(sequencer.drum.hihat, i-1, !sequencer.drum.hihat[i-1])" />
        </div>
        <div class="snare">
          <div v-for="i in 16" :key="`snare_${i}`" :class="{'item': true, 'active': !!sequencer.drum.snare[i-1] }" @click="$set(sequencer.drum.snare, i-1, !sequencer.drum.snare[i-1])" />
        </div>
        <div class="tomL">
          <div v-for="i in 16" :key="`tomL_${i}`" :class="{'item': true, 'active': !!sequencer.drum.tomL[i-1] }" @click="$set(sequencer.drum.tomL, i-1, !sequencer.drum.tomL[i-1])" />
        </div>
        <div class="tomH">
          <div v-for="i in 16" :key="`tomH_${i}`" :class="{'item': true, 'active': !!sequencer.drum.tomH[i-1] }" @click="$set(sequencer.drum.tomH, i-1, !sequencer.drum.tomH[i-1])" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tone from 'tone'
import Snare from '../lib/snare.js'
import audioUnlock from '../lib/audioUnlock'
export default {
  name: 'sequencer',
  data() {
    const kick = new Tone.MembraneSynth({
      octaves: 3,
      envelope  : {
        sustain: 0.1,
      }
    }).toMaster()
    const tomL = new Tone.MembraneSynth({
      octaves: 1
    }).toMaster()
    const tomH = new Tone.MembraneSynth({
      octaves: 1
    }).toMaster()
    const hihat = new Tone.NoiseSynth({
      playbackRate: 2,
      envelope  : {
        sustain  : 0.0001,
      }
    }).toMaster()
    const snare = new Snare({volume: -6})
    
    kick.volume.value = 6
    hihat.volume.value = -2
    tomL.volume.value = 0
    tomH.volume.value = 0

    Tone.Transport.scheduleRepeat((time) => {
      let i = Math.round((this.Tone.Transport.getSecondsAtTime() * (this.BPM / 15)) % 16)
      this.index = i
      const { drum: { kick, tomL, tomH, snare, hihat } } = this.sequencer
      if(kick[i]) this.kick.triggerAttackRelease("C2", "4n", time)
      if(hihat[i]) this.hihat.triggerAttackRelease("16n", time)
      if(snare[i]) this.snare.trigger(time)
      if(tomL[i]) this.tomL.triggerAttackRelease("G2", "4n", time)
      if(tomH[i]) this.tomH.triggerAttackRelease("G#2", "4n", time)
    }, "16n")
    const defaultItem = {
        drum: {
          kick: new Array(16),
          hihat: new Array(16),
          snare: new Array(16),
          tomL: new Array(16),
          tomH: new Array(16),
        },
        lead: {
          mono: [],
          metal: []
        },
        bass: {
          mono: []
        }
      }
    const sequencer = localStorage.getItem("sequencer") ? JSON.parse(localStorage.getItem("sequencer")) : defaultItem

    return {
      Tone,
      kick,
      hihat,
      snare,
      tomL,
      tomH,
      isPlaying: false,
      BPM: 120,
      index: -1,
      sequencer,
    }
  },
  methods: {
    clickHandler() {
      if (this.isPlaying) {
        this.stop()
      } else {
        this.play()
      }
      this.isPlaying = !(this.isPlaying)
    },
    play() {
      this.Tone.Transport.start()
    },
    stop() {
      this.Tone.Transport.stop()
      this.index = 0
    }
  },
  computed: {},
  mounted() {
    audioUnlock(this.Tone.context)
  },
  updated() {
    localStorage.setItem("sequencer", JSON.stringify(this.sequencer))
  },
  beforeDestroy() {
    this.Tone.Transport.stop()
  }
}
</script>

<style lang="scss" scoped>
#sequencer {
  max-height: 100vh;
  overflow: auto;
  #config {
    margin: 20px auto;
  }
  #pad {
    #timeLine {
      display: inline-flex;
      flex-flow: row nowrap;
      justify-content: space-around;
      align-content: center;
      width: 100%;
      .time {
        width: 6%;
        height: 5px;
        background-color: #e9e9e9;
        margin: 5px 0;
        border-radius: 2px;
      }
      & .active {
        background-color: #ff5733;
      }
    }
    .set {
      > div {
        display: inline-flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        align-content: center;
        width: 100%;
        .item {
          width: 6%;
          height: 0;
          padding-top: 6%;
          background-color: #e9e9e9;
          border-radius: 10%;
        }
        & .active {
          background-color: #efd915;
        }
      }
    }
  }
}
</style>
