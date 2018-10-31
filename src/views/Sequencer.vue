<template>
  <div id="sequencer">
    <div id="config">
      <button @click="clickHandler"><i :class="{'fas': true, 'fa-play': !isPlaying, 'fa-pause': isPlaying}"></i></button>
      <button @click="reset"><i class="fas fa-undo"></i></button>
      <button @click="random"><i class="fas fa-random"></i></button>
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
        <div class="tomM">
          <div v-for="i in 16" :key="`tomM_${i}`" :class="{'item': true, 'active': !!sequencer.drum.tomM[i-1] }" @click="$set(sequencer.drum.tomM, i-1, !sequencer.drum.tomM[i-1])" />
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

    //建立樂器
    const kick = new Tone.MembraneSynth({
      octaves: 3,
      envelope  : {
        sustain: 0.2,
      }
    }).toMaster()
    const tomL = new Tone.MembraneSynth({
      octaves: 1
    }).toMaster()
    const tomM = new Tone.MembraneSynth({
      octaves: 1
    }).toMaster()
    const tomH = new Tone.MembraneSynth({
      octaves: 1
    }).toMaster()
    const hihat = new Tone.NoiseSynth({
      playbackRate: 5,
      envelope  : {
        sustain  : 0.0001,
      }
    }).toMaster()
    const snare = new Snare({volume: -6})
    
    kick.volume.value = 6
    hihat.volume.value = -2
    tomL.volume.value = 0
    tomM.volume.value = 0
    tomH.volume.value = 0

    // 循環撥放設定
    Tone.Transport.scheduleRepeat((time) => {
      let i = Math.round((this.Tone.Transport.getSecondsAtTime() * (this.BPM / 15)) % 16)
      this.index = i
      const { 
        drum: { 
          kick = new Array(16),
          tomL = new Array(16),
          tomM = new Array(16),
          tomH = new Array(16),
          snare = new Array(16),
          hihat = new Array(16)
        }
      } = this.sequencer

      if(kick[i]) this.kick.triggerAttackRelease("C2", "4n", time)
      if(hihat[i]) this.hihat.triggerAttackRelease("8n", time)
      if(snare[i]) this.snare.trigger(time)
      if(tomL[i]) this.tomL.triggerAttackRelease("E2", "4n", time)
      if(tomM[i]) this.tomM.triggerAttackRelease("G2", "4n", time)
      if(tomH[i]) this.tomH.triggerAttackRelease("A#2", "4n", time)

    }, "16n")

    // 空資料
    const defaultSequencer = {
        drum: {
          kick: new Array(16),
          hihat: new Array(16),
          snare: new Array(16),
          tomL: new Array(16),
          tomM: new Array(16),
          tomH: new Array(16),
        },
        lead: {
          mono: []
        },
        bass: {
          mono: []
        }
      }
    
    //取得前一次的狀態
    const data = (({ d = '' })=> {
      //鼓機
      const dArr = d.split(/-/)
      const drum = {
          kick: dArr[0] ? Number.parseInt(dArr[0], 16).toString(2).padStart(16).split('').map(i => ~~i) : new Array(16),
          hihat: dArr[1] ? Number.parseInt(dArr[1], 16).toString(2).padStart(16).split('').map(i => ~~i) : new Array(16),
          snare: dArr[2] ? Number.parseInt(dArr[2], 16).toString(2).padStart(16).split('').map(i => ~~i) : new Array(16),
          tomL: dArr[3] ? Number.parseInt(dArr[3], 16).toString(2).padStart(16).split('').map(i => ~~i) : new Array(16),
          tomM: dArr[4] ? Number.parseInt(dArr[4], 16).toString(2).padStart(16).split('').map(i => ~~i) : new Array(16),
          tomH: dArr[5] ? Number.parseInt(dArr[5], 16).toString(2).padStart(16).split('').map(i => ~~i) : new Array(16),
      }
      return {
        drum,
        lead: {
            mono: []
        },
        bass: {
          mono: []
        }
      }
    })(this.$route.query)

    const sequencer = data

    return {
      Tone,
      kick,
      hihat,
      snare,
      tomL,
      tomM,
      tomH,
      isPlaying: false,
      BPM: 120,
      index: -1,
      sequencer,
      defaultSequencer,
    }
  },
  methods: {
    clickHandler() {
      if (this.isPlaying) {
        this.stop()
      } else {
        this.play()
      }
    },
    reset() {
      this.sequencer = JSON.parse(JSON.stringify(this.defaultSequencer))
    },
    random() {
      this.sequencer = {
        drum: {
          kick: this.getRandomArray(16),
          hihat: this.getRandomArray(16),
          snare: this.getRandomArray(16),
          tomL: this.getRandomArray(16),
          tomM: this.getRandomArray(16),
          tomH: this.getRandomArray(16),
        },
        lead: {
          mono: []
        },
        bass: {
          mono: []
        }
      }
    },
    getRandomArray(length) {
      return new Array(length).fill(0).map(() => Math.random() > 0.80)
    },
    play() {
      this.isPlaying = true
      this.Tone.Transport.start()
    },
    stop() {
      this.isPlaying = false
      this.Tone.Transport.stop()
      this.index = -1
    }
  },
  computed: {},
  watch: {
    sequencer: {
      handler(v) {
        const { drum, lead, bass } = v
        const d = [
          Number.parseInt(drum.kick.map(i => ~~i).join(''), 2).toString(16).padStart(4, 0),
          Number.parseInt(drum.hihat.map(i => ~~i).join(''), 2).toString(16).padStart(4, 0),
          Number.parseInt(drum.snare.map(i => ~~i).join(''), 2).toString(16).padStart(4, 0),
          Number.parseInt(drum.tomL.map(i => ~~i).join(''), 2).toString(16).padStart(4, 0),
          Number.parseInt(drum.tomM.map(i => ~~i).join(''), 2).toString(16).padStart(4, 0),
          Number.parseInt(drum.tomH.map(i => ~~i).join(''), 2).toString(16).padStart(4, 0)
        ].join('-')
        this.$router.push({path: '/sequencer', query: { d, }})
      },
      deep: true
    }
  },
  mounted() {
    audioUnlock(this.Tone.context)
  },
  beforeDestroy() {
    this.Tone.Transport.stop()
  }
}
</script>

<style lang="scss" scoped>
#sequencer {
  background-color: #222222;
  height: 100vh;
  overflow: auto;
  #config {
    margin: 20px auto;
    display: inline-flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    align-content: center;
    width: 100%;
    > button {
      padding: 0;
      text-align: center;
      color: #222222;
      line-height: 100%;
      font-size: 3vw;
      width: 6vw;
      height: 6vw;
      background-color: #e9e9e9;
      border: 0;
      border-radius: 10%;
      cursor: pointer;
    }
  }
  #pad {
    #timeLine {
      display: inline-flex;
      flex-flow: row nowrap;
      justify-content: space-around;
      align-content: center;
      width: 100%;
      .time {
        margin: 1px;
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
          margin: 1px;
          width: 6vw;
          height: 6vw;
          background-color: #e9e9e9;
          border-radius: 10%;
          cursor: pointer;
        }
        & .active {
          background-color: #efd915;
          @for $i from 1 through 16 {
            &:nth-child(#{$i}) {
              filter: brightness(0.8 + $i / 10);
            }
          }
        }
      }
    }
  }
}
</style>
