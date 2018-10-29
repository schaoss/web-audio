<template>
  <div id="sequencer">
    <h1> Sequencer </h1>
    <div class="content">
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

import audioUnlock from '../lib/audioUnlock'
export default {
  name: 'sequencer',
  data() {
    const kick = new Tone.MembraneSynth({
      octaves: 3
    }).toMaster()
    const tom = new Tone.MembraneSynth({
      octaves: 1
    }).toMaster()
    const hihat = new Tone.NoiseSynth({
      envelope  : {
        sustain  : 0.0001
      }
    }).toMaster()
    Tone.Transport.scheduleRepeat((time) => {
      let i = Math.round((this.Tone.Transport.getSecondsAtTime() * (this.BPM / 30)) % 16)
      this.index = i
      const { drum: { kick, tomL, tomH, hihat } } = this.sequencer
      if(kick[i]) this.kick.triggerAttackRelease("C2", "4n", time)
      if(hihat[i]) this.hihat.triggerAttackRelease("8n", time)
      if(tomL[i]) this.tom.triggerAttackRelease("A2", "4n", time)
      if(tomH[i]) this.tom.triggerAttackRelease("E3", "4n", time)
    }, "8n")
    const defaultItem = {
        drum: {
          kick: new Array(16),
          tomL: new Array(16),
          tomH: new Array(16),
          hihat: new Array(16)
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
      tom,
      hihat,
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
  beforeDestroy() {
    localStorage.setItem("sequencer", JSON.stringify(this.sequencer))
    this.Tone.Transport.stop()
  }
}
</script>

<style lang="scss" scoped>
#sequencer {
  max-height: 100vh;
  overflow: auto;
  .content {
    max-width: 50vw;
    margin: 40px auto;
  }
  #pad {
    #timeLine {
      display: inline-flex;
      flex-flow: row nowrap;
      justify-content: space-around;
      align-content: center;
      width: 100vw;
      .time {
        width: 50px;
        height: 5px;
        background-color: #e9e9e9;
        margin: 5px;
      }
      & .active {
        background-color: #efd915;
      }
    }
    .set {
      > div {
        display: inline-flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        align-content: center;
        width: 100vw;
        .item {
          width: 25px;
          height: 25px;
          background-color: #e9e9e9;
          margin: 5px;
          border-radius: 25%;
        }
        & .active {
          background-color: #efd915;
        }
      }
    }
  }
}
</style>
