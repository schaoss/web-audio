<template>
  <div id="sequencer">
    <div id="config" :class="{'drum': tab === 0, 'lead': tab === 1}">
      <button @click="tabHandler"><i :class="{'fas': true,  'fa-drum': tab === 0, 'fa-music': tab === 1}"></i></button>
      <button @click="random"><i class="fas fa-random"></i></button>
      <div id="play">
        <button @click="clickHandler"><i :class="{'fas': true, 'fa-play': !isPlaying, 'fa-pause': isPlaying}"></i></button>
      </div>
      <div id="bpm">
        <button @click="BPM -= 5"><i class="fas fa-minus"></i></button>
        <input type="text" :value="BPM" readonly /><span>bpm</span>
        <button @click="BPM += 5"><i class="fas fa-plus"></i></button>
      </div>
      <button @click="reset"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div id="pad">
      <div id="timeLine">
        <div v-for="i in 16" :key="`time_${i}`" :class="{'time': true, 'active': index === i-1 }" />
      </div>
      <div id="drum" class="set" v-show="tab === 0">
        <ul class="kick">
          <li v-for="i in 16" :key="`kick_${i}`" :class="{'item': true, 'active': !!sequencer.drum.kick[i-1] }" @click="$set(sequencer.drum.kick, i-1, !sequencer.drum.kick[i-1])" />
        </ul>
        <ul class="hihat">
          <li v-for="i in 16" :key="`hihat_${i}`" :class="{'item': true, 'active': !!sequencer.drum.hihat[i-1] }" @click="$set(sequencer.drum.hihat, i-1, !sequencer.drum.hihat[i-1])" />
        </ul>
        <ul class="snare">
          <li v-for="i in 16" :key="`snare_${i}`" :class="{'item': true, 'active': !!sequencer.drum.snare[i-1] }" @click="$set(sequencer.drum.snare, i-1, !sequencer.drum.snare[i-1])" />
        </ul>
        <ul class="tomL">
          <li v-for="i in 16" :key="`tomL_${i}`" :class="{'item': true, 'active': !!sequencer.drum.tomL[i-1] }" @click="$set(sequencer.drum.tomL, i-1, !sequencer.drum.tomL[i-1])" />
        </ul>
        <ul class="tomM">
          <li v-for="i in 16" :key="`tomM_${i}`" :class="{'item': true, 'active': !!sequencer.drum.tomM[i-1] }" @click="$set(sequencer.drum.tomM, i-1, !sequencer.drum.tomM[i-1])" />
        </ul>
        <ul class="tomH">
          <li v-for="i in 16" :key="`tomH_${i}`" :class="{'item': true, 'active': !!sequencer.drum.tomH[i-1] }" @click="$set(sequencer.drum.tomH, i-1, !sequencer.drum.tomH[i-1])" />
        </ul>
      </div>
      <div id="lead" class="set" v-show="tab === 1">
        <ul v-for="(row, i) in sequencer.lead" :key="`lead_${i}`">
          <li v-for="j in 16" :key="`lead_${i}_${j}`" :class="{'item': true, 'active': !!sequencer.lead[i][j-1] }" @click="$set(sequencer.lead[i], j-1, !sequencer.lead[i][j-1])" />
        </ul>
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
    //取得前一次的狀態
    const { bpm = 120, d = '', l = '' } = this.$route.query
    const sequencer = (() => {
      //鼓機
      const dArr = d.split(/-/)
      const drum = {
          kick: this.getInitQueryData(dArr[0]),
          hihat: this.getInitQueryData(dArr[1]),
          snare: this.getInitQueryData(dArr[2]),
          tomL: this.getInitQueryData(dArr[3]),
          tomM: this.getInitQueryData(dArr[4]),
          tomH: this.getInitQueryData(dArr[5]),
      }

      //旋律
      const lArr = l.split(/-/)
      const lead = [
        this.getInitQueryData(lArr[0]),
        this.getInitQueryData(lArr[1]),
        this.getInitQueryData(lArr[2]),
        this.getInitQueryData(lArr[3]),
        this.getInitQueryData(lArr[4]),
        this.getInitQueryData(lArr[5]),
        this.getInitQueryData(lArr[6]),
      ]

      return {
        drum,
        lead,
        bass: {
          mono: []
        }
      }
    })()
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
    const snare = new Snare({volume: -6}).toMaster()

    const poly = new Tone.PolySynth(8, Tone.Synth, {
      oscillator: {
        type: 'triangle'
      },
      envelope: {
        attack: 0.001,
        decay: 0.1,
        sustain: 0.3,
        release: 0.02
      }
    }).toMaster()

    // 音量
    kick.volume.value = 6
    hihat.volume.value = -2
    tomL.volume.value = 0
    tomM.volume.value = 0
    tomH.volume.value = 0
    poly.set("volume", 2);

    // 循環撥放設定
    const BPM = parseInt(bpm)
    
    Tone.Transport.bpm.value = BPM
    Tone.Transport.scheduleRepeat((time) => {
      this.index = ++this.index % 16
      const i = this.index
      const { 
        drum: { 
          kick = this.getEmptyArray(16),
          tomL = this.getEmptyArray(16),
          tomM = this.getEmptyArray(16),
          tomH = this.getEmptyArray(16),
          snare = this.getEmptyArray(16),
          hihat = this.getEmptyArray(16),
        },
        lead
      } = this.sequencer

      if(kick[i]) this.kick.triggerAttackRelease("C2", "4n", time)
      if(hihat[i]) this.hihat.triggerAttackRelease("8n", time)
      if(snare[i]) this.snare.trigger(time)
      if(tomL[i]) this.tomL.triggerAttackRelease("E2", "4n", time)
      if(tomM[i]) this.tomM.triggerAttackRelease("G2", "4n", time)
      if(tomH[i]) this.tomH.triggerAttackRelease("A#2", "4n", time)

      if(lead[0][i]) this.poly.triggerAttackRelease("C4", "16n", time)
      if(lead[1][i]) this.poly.triggerAttackRelease("D4", "16n", time)
      if(lead[2][i]) this.poly.triggerAttackRelease("E4", "16n", time)
      if(lead[3][i]) this.poly.triggerAttackRelease("F4", "16n", time)
      if(lead[4][i]) this.poly.triggerAttackRelease("G4", "16n", time)
      if(lead[5][i]) this.poly.triggerAttackRelease("A4", "16n", time)
      if(lead[6][i]) this.poly.triggerAttackRelease("C5", "16n", time)
    }, "16n")

    // 空資料 for reset
    const defaultSequencer = {
        drum: {
          kick: this.getEmptyArray(16),
          hihat: this.getEmptyArray(16),
          snare: this.getEmptyArray(16),
          tomL: this.getEmptyArray(16),
          tomM: this.getEmptyArray(16),
          tomH: this.getEmptyArray(16),
        },
        lead: [
          this.getEmptyArray(16),
          this.getEmptyArray(16),
          this.getEmptyArray(16),
          this.getEmptyArray(16),
          this.getEmptyArray(16),
          this.getEmptyArray(16),
          this.getEmptyArray(16),
        ],
        bass: {
          mono: []
        }
      }

    return {
      sequencer,
      defaultSequencer,
      BPM,
      kick,
      hihat,
      snare,
      tomL,
      tomM,
      tomH,
      poly,
      isPlaying: false,
      index: -1,
      tab: 0,
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
    tabHandler() {
      this.tab = (this.tab + 1) % 2
    },
    reset() {
      if(this.tab === 0) {
        this.sequencer.drum = JSON.parse(JSON.stringify(this.defaultSequencer.drum))
      } else if( this.tab === 1 ) {
        this.sequencer.lead = JSON.parse(JSON.stringify(this.defaultSequencer.lead))
      }
    },
    random() {
      if(this.tab === 0) {
        this.sequencer.drum = {
          kick: this.getRandomArray(16),
          hihat: this.getRandomArray(16),
          snare: this.getRandomArray(16),
          tomL: this.getRandomArray(16),
          tomM: this.getRandomArray(16),
          tomH: this.getRandomArray(16),
        }
      } else if(this.tab === 1) {
        this.sequencer.lead = [
          this.getRandomArray(16),
          this.getRandomArray(16),
          this.getRandomArray(16),
          this.getRandomArray(16),
          this.getRandomArray(16),
          this.getRandomArray(16),
          this.getRandomArray(16),
        ]
      }
    },
    getEmptyArray(length) {
      return new Array(length).fill(0)
    },
    getRandomArray(length) {
      return this.getEmptyArray(length).map(() => Math.random() > 0.80)
    },
    getHexQueryString(arr) {
      return Number.parseInt(arr.map(i => ~~i).join(''), 2).toString(16).padStart(4, 0)
    },
    getInitQueryData(hexStr) {
      return hexStr ? Number.parseInt(hexStr, 16).toString(2).padStart(16).split('').map(i => ~~i) : this.getEmptyArray(16)
    },
    play() {
      this.isPlaying = true
      Tone.Transport.start()
    },
    stop() {
      this.isPlaying = false
      Tone.Transport.stop()
      this.index = -1
    }
  },
  computed: {},
  watch: {
    BPM: {
      handler(bpm) {
        if(bpm > 180) bpm = 180
        else if(bpm < 60) bpm = 60
        this.BPM = bpm
        Tone.Transport.bpm.value = bpm
        const { d, l } = this.$route.query
        this.$router.replace({path: '/sequencer', query: { bpm, d, l }})
      }
    },
    sequencer: {
      handler(v) {
        const { drum, lead, bass } = v
        const d = [
          this.getHexQueryString(drum.kick),
          this.getHexQueryString(drum.hihat),
          this.getHexQueryString(drum.snare),
          this.getHexQueryString(drum.tomL),
          this.getHexQueryString(drum.tomM),
          this.getHexQueryString(drum.tomH),
        ].join('-')
        const l = lead.map(row => 
          this.getHexQueryString(row)
        ).join('-')
        const { bpm = 120 } = this.$route.query
        this.$router.replace({path: '/sequencer', query: { bpm, d, l }})
      },
      deep: true
    }
  },
  mounted() {
    document.querySelector('#menuTrigger').style.display = 'none'
    audioUnlock(Tone.context)
    // screen.lockOrientationUniversal = screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation || screen.orientation.lock;
    // screen.lockOrientationUniversal("landscape-primary").then((res) => {
    //   alert(res)
    // })
    window.addEventListener("load",function() { 
      setTimeout(function(){
      window.scrollTo(0, 1); }, 10);
    });
  },
  beforeDestroy() {
    Tone.Transport.cancel().stop()
    window.removeEventListener("load")
    // screen.unlockOrientation()
  }
}
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
      color: $black;
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
          border: 1px solid $black;
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
