# 03. Web Audio API - 節點關係

經過昨天的簡易小範例，應該對於 Web Audio API 大致的使用方法就不陌生了吧？今天就接著來介紹 Web Audio API 的節點關係。

### 節點關係

![routing system](https://i.imgur.com/qalUCVi.png)

如圖所示，在 Web Audio API 的 `AudioContext` 中，我們可以對輸入的 **音源** 做一系列的 **音效處理**，再將結果 **輸出**。其中，`AudioContext` 可以理解成聲音的容器，如同 `canvans` 的 `context` 那般；而音源，可以是由 Web Audio API 自行生成，或是從麥克風收音、播放現成音檔等，全看使用情境來自由設計、運用。

最重要的是，聲音節點 (AudioNode) 可以透過 `connect()` 方法互相連接，這樣的的特性，可以讓設計開發者先設計好各種音效處理節點，再依使用情境套用，輕鬆做到　**模組化** 的音效處理。

可以參考 W3C 規範文件中的較複雜的範例圖：

![complex example](https://i.imgur.com/JJ2T6FS.png)

那麼，今天的練習就來玩玩看音效處理的 **濾波器** 吧～

### Demo

先把昨天 Code 裡用到的資料參數化，並抽出各種方法如：

```javascript=118
play() {
  this.gainNode.connect(this.audioCtx.destination)
},
stop() {
  this.gainNode.disconnect(this.audioCtx.destination)
},
setNoteConfig() {
  this.waveType = this.waveType
  this.oscillator.frequency.value = this.frequency
  this.oscillator.detune.value = this.detune
  this.gainNode.gain.value = this.volume
},
...
```

宣告濾波器，並加上濾波器需要的參數：

```javascript=72
const filter = audioCtx.createBiquadFilter() // 濾波器
```

```javascript=83
filterType: 'allpass', // lowpass, highpass, bandpass, etc
filterF: '350', // 濾波的判斷頻率
filterQ: '1', // 品質參數
filterGain: '0' // 過濾出的頻率的通過音量
```

以及調整節點連接的方式：

> 音源 -> 音量節點 -> 濾波器節點 -> 輸出

```javascript=133
this.oscillator.connect(this.gainNode)
this.gainNode.connect(this.filter)
this.filter.connect(this.audioCtx.destination)
```

最後，稍微簡單的切個版，讓畫面不要太誇張醜 XD
![result](https://i.imgur.com/JbXfleL.jpg)

[Live Demo](https://schaoss.github.io/web-audio/#/web-audio-api)

以上就是今天的節點關係介紹～

> ### 筆者
>
> ## Gary Chu
>
> 半路出家網站工程師；半生熟的前端加上一點點的後端。
> 喜歡學習、分享、當個遊戲宅。
>
> 相信一切安排都是最好的路。
