# 21. 音序機

昨天我們聊到的 Tone.js 的強力功能 - 排程播放，那麼就來玩玩看許多高手前輩都做過的 音序機 吧～

### Sequencer

音序機，顧名思義，就是能夠把聲音依照使用者想要的順序，依序播放出來的機器。在這趟旅程 [第二天](https://ithelp.ithome.com.tw/articles/10202670) 的 [Google Doodle 範例](https://www.google.com/logos/doodles/2017/fischinger/fischinger17.9.html)，我們就已經看過音序機囉～在 [Tone.js 的範例 Demo](https://tonejs.github.io/demos) 中，也非常多這類的創作應用。另外，[去年的鐵人 **vibertthio**](https://ithelp.ithome.com.tw/users/20107828/ironman/1552) 也製作過相當精彩的作品 - [Beact](https://beact.herokuapp.com/)，大家也不仿嘗試看看。

![Beact](https://i.imgur.com/W2wN8ee.png)

透過 Tone.js 的排序，音序機的程式絕對不會是難以達成的；就讓我們跟著高手前輩們的腳步，一起挑戰看看吧！

### Demo

第一步，當然是製作樂器；今天我們先專注在 鼓機，也就是節奏樂器上。

節奏樂器，當然不能缺少了大鼓 & Hi-Hat：

```javascript=
const kick = new Tone.MembraneSynth({
  octaves: 3,
  envelope: {
    sustain: 0.2
  }
}).toDestination()

const hihat = new Tone.NoiseSynth({
  playbackRate: 5,
  envelope: {
    sustain: 0.0001
  }
}).toDestination()
```

透過 Tone.js 已經封裝好的 `MembraneSynth` 及 `NoiseSynth` 兩種合成器，我們只需要逐步調整欲設定的參數，就能夠慢慢製作出想要的聲響啦。

比較困難的是小鼓。由於小鼓的構造是由 鼓膜 及 響弦 構成，敲擊時的聲響是多質感的聲波相互疊加而成的。

![](https://i.imgur.com/0rD04F0.jpg)

筆者參考了 [**vibertthio** 去年的實作](https://gist.github.com/vibertthio/9c815b7edeee2aab3aec35de7dfa57bb)，再稍作修改而成。

```javascript=
// Class: Snare
const noise = new NoiseSynth({
  volume: volume,
  noise: {
    type: 'pink',
    playbackRate: 3
  },
  envelope: {
    attack: 0.001,
    decay: 0.15,
    sustain: 0.0001,
    release: 0.05
  }
}).connect(lowPass)

const poly = new PolySynth(6, Synth, {
  volume: volume + 6,
  oscillator: {
    partials: [0, 2, 3, 4]
  },
  envelope: {
    attack: 0.001,
    decay: 0.17,
    sustain: 0.0001,
    release: 0.08,
    releaseCurve: 'exponential'
  }
}).toDestination()

trigger(time) {
  this.noise.triggerAttack(time)
  this.poly.triggerAttackRelease(['C2', 'D#2', 'G2'], '16n', time)
}

...

// Usage
const snare = new Snare().toDestination()
```

由於要做出綜合的質感，必須同時觸發兩種聲響。

再稍微調整一下各樂器的音量平衡，這部分就完成囉！接著是設計資料結構。

```javascript=
const defaultSequencer = {
  drum: {
    kick: new Array(16),
    hihat: new Array(16),
    snare: new Array(16),
    tomL: new Array(16),
    tomM: new Array(16),
    tomH: new Array(16),
  }
  ...
}
```

這邊是想要做每種樂器一個陣列，顯示時再分別對陣列做綁定。

> 筆者在調大鼓音色的過程中順手做了幾顆 Tom-Tom，就一併放上去了 XD

資料綁定的部分：

```html
...
<div class="hihat">
  <div v-for="i in 16" :key="`hihat_${i}`"
      class="item" :class="{'active': !!sequencer.drum.hihat[i-1] }"
      @click="$set(sequencer.drum.hihat, i-1, !sequencer.drum.hihat[i-1])" />
</div>
...
```

在使用 Vue 實作時要注意，設定陣列的資料時必須透過 `$set()`，才可以讓 Vue 觀測到資料變動喔！

最後就是讓資料驅動各個樂器在拍點上發出聲響：

```javascript=
Tone.getTransport().scheduleRepeat(time => {
  let i = Math.round((Tone.getTransport().getSecondsAtTime() * (this.BPM / 60)) % 16)
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

  if (kick[i]) this.kick.triggerAttackRelease('C2', '4n', time)
  if (hihat[i]) this.hihat.triggerAttackRelease('8n', time)
  if (snare[i]) this.snare.trigger(time)
  if (tomL[i]) this.tomL.triggerAttackRelease('E2', '4n', time)
  if (tomM[i]) this.tomM.triggerAttackRelease('G2', '4n', time)
  if (tomH[i]) this.tomH.triggerAttackRelease('A#2', '4n', time)
}, '4n')
```

> 這邊是每一 tick 為四分音符，如果想要將拍點切得更細，需要將 BPM 做相對應的調整。

最後就是畫面的優化，稍微配色、排版一下，就完成鼓機的部分啦！

[Live Demo](https://schaoss.github.io/web-audio/#/sequencer)

![result](https://i.imgur.com/4SZ0fMw.png)

其實做到後來自己就玩開了，難怪各位高手前輩都稍有著墨過音序機，這個真的很有趣 XD

那麼今天的音序機第一階段就到這邊啦，明天繼續～

> ### 筆者
>
> ## Gary
>
> 半路出家網站工程師；半生熟的前端加上一點點的後端。
> 喜歡音樂，喜歡學習、分享，也喜歡當個遊戲宅。
>
> 相信一切安排都是最好的路。
