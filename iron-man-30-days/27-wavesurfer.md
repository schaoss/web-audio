# 27. Wavesurfer.js

第 27 篇了，旅程也到達了尾聲。
最後我們來玩玩一些音樂視覺化的套件吧～

### 這是什麼？

[Wavesurfer.js](https://github.com/katspaugh/wavesurfer.js) 是一個建構在 Wab Audio API 之上，將音檔的視覺化的套件。由於其簡單、易用的特性，如果有做音檔播放並顯示在網頁上的需求，非常推薦使用 Wavesurfer。

![Wavesurfer](https://i.imgur.com/Cp57STC.png)

### 為什麼要玩這個？

Wavesurfer.js 包裝了 Web Audio API，將複雜的底層操作包裝在簡單的方法中，極大的減少了創作者的負擔。並且提供了開發用的 API，讓創作者可以創作、加入自定義的 Plugins，開發上的彈性也很大。

> 目前官網提供的 Plugins 可以參照 [這裡](https://wavesurfer-js.org/plugins/)

### 功能有哪些？

從名字也不難猜到，Wavesurfer.js 會透過 Web Audio API 把音檔的振幅計算出來後，畫在 canvas 上，並提供基本的播放功能，可以取代原生 Player。另外也擁有一些包裝好的功能，讓使用者在撥放音樂的同時，擁有視覺的饗宴，以及更優良的操作體驗。

> 可以參考官網的 [範例](https://wavesurfer-js.org/examples/)

![plugin](https://i.imgur.com/5PSPvZu.png)

### 怎麼用啊？

首先當然是安裝套件：

```cs
npm i wavesurfer.js

or

yarn add wavesurfer.js
```

在欲使用的頁面宣告，並給予參數：

```javascript=
import WaveSurfer from 'wavesurfer.js'

const wavesurfer = WaveSurfer.create({
  container: '#waveform',
  waveColor: 'violet',
  progressColor: 'purple'
})
```

接著是要欲撥放的音檔：

```javascript=
wavesurfer.load('audio.wav')
```

並註冊讀取完成的事件監聽器，並呼叫 `play()` 進行播放：

```javascript=
wavesurfer.on('ready', function() {
  wavesurfer.play()
})
```

這樣就完成最簡單的範例囉！

如果想要使用官網提供的 Plugins，目前版本的 Wavesurfer.js 會將 Plugins 一併打包進主套件中，需要透過：

```javascript=
import TimelinePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js'
import MinimapPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.minimap.min.js'
```

這樣的方式宣告物件，並在宣告 Wavesurfer 時一併傳入：

```javascript=
const wavesurfer = WaveSurfer.create({
  container: '#waveform',
  waveColor: 'violet',
  progressColor: 'purple'
  plugins: [
    TimelinePlugin.create({
      container: '#wave-timeline'
    }),
    MinimapPlugin.create()
  ]
})
```

### Demo

那麼就來簡單實作看看吧！

```javascript=
this.wavesurfer = WaveSurfer.create({
  container: '#waveform',
  waveColor: 'violet',
  progressColor: 'purple'
})

this.wavesurfer.load(require('../static/Epic_Sax_Gay.mp3'))

this.wavesurfer.on('ready', () => {
  this.isReady = true
})
```

程式的部分非常簡單，就不多做說明了。唯一要注意的地方是，音檔的相對路徑及檔案名稱，在經過 Webpack 打包之後會跑掉。這邊透過 `require()` 抓到打包後的路徑位置。

[Live Demo](https://schaoss.github.io/web-audio/#/wave-surfer)

![result](https://i.imgur.com/oTI812C.gif)

那麼今天就這樣囉～

> ### 筆者
>
> ## Gary
>
> 半路出家網站工程師；半生熟的前端加上一點點的後端。
> 喜歡音樂，喜歡學習、分享，也喜歡當個遊戲宅。
>
> 相信一切安排都是最好的路。
