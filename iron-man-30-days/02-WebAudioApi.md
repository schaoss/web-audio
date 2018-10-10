# 02. Web Audio API

今天先來介紹 Web Audio API。

不囉嗦，直接上個 [**範例**](https://www.google.com/logos/doodles/2017/fischinger/fischinger17.9.html)，還不錯玩對吧～


## 這是什麼？

[Web Audio API](https://webaudio.github.io/web-audio-api/) 是由 W3C 規範的網站音頻 API，主要應用在 **網頁音樂的撥放、處理、編輯**，在 Github 上，也可以找到大量依賴 Web Audio API 的音樂相關套件；其實這不是一項非常新的技術，第一版至今 (2011 - 2018) 也已經發展了 7 年，也所幸如此，目前主流瀏覽器皆有支援：

![can i use](https://i.imgur.com/uc2cyKj.jpg)

~~IE11表示：什麼支援？~~


## 為什麼要玩這個？

如果只是要在網頁上簡單的撥放音樂，現在Html5的`<audio>`標籤已經可以做到這件事情。
e.g.：
```htmlmixed=
<audio controls>
  <source src="horse.ogg" type="audio/ogg">
  <source src="horse.mp3" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>
```

但如果想要在網頁上編輯、分析、甚至創造音樂，那接觸一下 Web Audio API 就是必須的了。


## 功能有哪些？

如同前述，Web Audio API 可以做到：
* 創造
    * 建立音源
    * 讀取音源
* 編輯
    * 音量控制
    * 各式效果器
    * 3D 音源定位計算
* 分析
    * 頻譜分析
* 播放
    * 模組化串接


## 怎麼用啊？

那就先來玩玩看基本的範例吧：

首先，先建立`Context`，也就是 Web Audio Api 的容器：
```javascript=11
const AudioContext = window.AudioContext || window.webkitAudioContext // 跨瀏覽器
const audioCtx = new AudioContext()
```
接著來利用振盪器，建立出音源
```javascript=13
const oscillator = audioCtx.createOscillator() 
```
以及增益節點，也就是控制音量的地方
```javascript=14
const gainNode = audioCtx.createGain() 
```
設定聲音的參數：
```javascript=15
oscillator.type = 'sine' // 正弦波
oscillator.frequency.value = 440 // A4 頻率
oscillator.detune.value = 0 // 解諧
gainNode.gain.value = 1 // 音量  
```
最後把他們接在一起，可以想像成是 樂器 -> PA 台 -> 音響 那樣，
```javascript=38
this.oscillator.connect(this.gainNode)
this.oscillator.start() // 啟動音源
```
基本上設定好囉，最後是寫個點擊事件的函式，觸發聲音撥放 & 暫停：
```htmlmixed=4
<button @click="clickHandler"> Play / Pause </button>
```
```javascript=
clickHandler(){
  if (this.isPlaying) {
    this.gainNode.disconnect(this.audioCtx.destination)
  } else {
    this.gainNode.connect(this.audioCtx.destination)
  }
  this.isPlaying = !this.isPlaying
}
```

![day2 result](https://i.imgur.com/7Raddk9.jpg)
以上，就是最基本的 Web Audio API 使用範例囉。
