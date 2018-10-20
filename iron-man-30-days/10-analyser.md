# 10. Web Audio API - Analyser

第十天，本系列文關於 Web Audio API 的部分也逐漸邁向尾聲。今天要介紹的是做頻譜分析、音檔視覺化必要的 AnalyserNode。

### Analyser

顧名思義，當然就是要玩音頻分析時用的，可以參照 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode) 的示意圖：

![analyser](https://i.imgur.com/Oadcgkb.png)

當訊號經過 Analyser 時，可以透過 API 內的函數取得 FFT 資料。FFT 指的是 [**快速傅立葉轉換** (Fast Fourier Transform)](https://zh.wikipedia.org/wiki/%E5%BF%AB%E9%80%9F%E5%82%85%E9%87%8C%E5%8F%B6%E5%8F%98%E6%8D%A2)，用途是讓資料在 時域與頻域 之相互轉換。

> 筆者想起以前電機系的回憶了 (泣

這邊時域與頻率的轉換，指的是將複雜的訊號，換算成數個不同頻率、不同振幅的弦波的互相疊加，如圖所示：
![FFT](https://i.imgur.com/LEzlfhQ.png)

透過 Analyser，我們可以簡單快速的取得 FFT 轉換後的資料；若將這些資料做些簡單的圖像呈現，也就成為大家熟悉的 頻譜分析圖囉。

那麼，今天的範例就來玩玩看 2D 的頻譜分析圖吧～

### Demo

昨天的範例，已經把麥克風收音的授權、串流處理函式等部分完成了；今天的重點就是 AnalyserNode 的實際應用。

一如往常，首先還是先建立 AnalyserNode 實例：

```javascript=
const analyser = audioCtx.createAnalyser()
```

並指定 analyser 一個 Frame (樣本群) 的大小：

```javascript=
analyser.fftSize = 1024
```

所謂樣本群，指的是在聲音轉成數位訊號的過程中，由於電腦無法真正的紀錄連續訊號，需要先經過 **採樣** 的過程，將連續訊號轉成離散訊號。一個 Frame 的大小，也就是設定一個樣本群要有幾個取樣結果。可以參考下圖：

![FFT](https://i.imgur.com/JNHpKrY.png)

> 圖片摘自 [演算法筆記](http://www.csie.ntnu.edu.tw/~u91029/Audio.html)

在串流處理函式內，將麥克風與 AnalyserNode 透過 `connect` 連接：

```javascript=
getUserMic(stream) {
  this.micStream = stream
  this.source = this.audioCtx.createMediaStreamSource(stream)
  this.source.connect(this.analyser)
},
```

當使用者按下 Play 時，透過 `windows.requestAnimationFrame`，反覆呼叫 analyser 取得 FFT 後的資料：

```javascript=
play() {
  this.isPlaying = true
  this.gainNode.connect(this.audioCtx.destination)
  requestAnimationFrame(this.getFFTData)
},
```

```javascript=
getFFTData(){
  this.fftArray = new Uint8Array(this.analyser.fftSize)
  this.analyser.getByteFrequencyData(this.fftArray)
  if (this.isPlaying) requestAnimationFrame(this.getFFTData)
}
```

這邊宣告了一組 `Uint8Array`，用來承接 `analyser.getByteFrequencyData`後的資料。

到這邊就取得資料啦！接著要把資料呈現出來。
先很直觀的透過迴圈做一堆 `div`，並透過資料綁定來設定元素高度：

```html
<div class="result">
  <div class="fftData" v-for="n in 512"
    :key="n"
    :style="{'height': fftArray[(n-1)]+2 + 'px'}"
  />
</div>
```

最後是排版一下，調成喜歡的樣子，就完成啦～

[Live Demo](https://schaoss.github.io/web-audio/#/source)

![result](https://i.imgur.com/WAv7DZf.gif)

看到成品真的好感動啊！透過 Web Audio API，就可以簡單快速的做出頻譜分析，真的是成就感滿滿！

今天就先這樣囉～

> ### 筆者
>
> ## Gary
>
> 半路出家網站工程師；半生熟的前端加上一點點的後端。
> 喜歡音樂，喜歡學習、分享，也喜歡當個遊戲宅。
>
> 相信一切安排都是最好的路。
