# 08. Web Audio API - 音源 Part.1

音效處理節點玩了不少，今天就來看看一直忽的音源部分能玩出什麼變化吧！

### 振盪器 Oscillator

到目前為止，前面所有的範例，音源都是透過

```javascript
const oscillator = audioCtx.createOscillator()
```

這樣的方式建立出振盪器作為音源；而振盪器的功用，就是建立週期性、可選擇波形的訊號。如正弦波、方波、三角波等。

![waveform](https://i.imgur.com/T592Gso.png)

> 圖中橫軸是時間，縱軸是能量高低。

由於是週期性、固定波形的訊號，參數固定的情況下，聲音聽起來就略顯單調了。如果在實際應用的場合不想使用振盪器，我們還有別的選擇，例如可以用現有的音檔。

### 載入音源 MediaElementSource

我們可以透過 html 的 `<audio>`tag，將音樂載至瀏覽器內，需要的話也可以透過內建的撥放器撥放：

```htmlmixed
<audio id="player" controls src="path/to/your/audio/file"></audio>
```

> 也可以透過 Javascript 載入音檔，不過就需要自行透過 `createBufferSource`、`decodeAudioData` 實作接收檔案 Buffer、解碼等部分；有興趣的讀者歡迎參閱 **[這裡](https://developer.mozilla.org/zh-CN/docs/Web/API/AudioContext/decodeAudioData)** 玩玩看。

再將 `audio` 內的音檔，透過 `createMediaElementSource()` 轉交給 Web Audio API 當作音源：

```javascript
const audio = document.querySelector('#player')
const source = audioCtx.createMediaElementSource(audio)
```

之後就可以把它當成一般的 AudioNode，和其他節點互相 `connect` 囉。

接著來實作看看吧～

### Demo

首先，先刻個音源的選單，方便後面的程式做切換：

```html=
<select @change="sourceType=$event.target.value">
  <option value="0">振盪器</option>
  <option value="1">Audio Tag</option>
</select>
```

振盪器的部分可以參考前面幾天的範例，就不介紹了。
Audio Tag 的部分，先建立 html 元素：

```html=
<div v-show="sourceType==='1'">
  <div class="item">
    <audio id="player" controls preload>
      <source src="Rainy_Day_Games.mp3" type="audio/mp3" />
    </audio>
  </div>
</div>
```

接著，利用 Vue 的 [watch](https://vuejs.org/v2/api/#watch)，對 `sourceType` 這個變數做監聽，當改變時便自動觸發：

```javascript=
watch: {
  'sourceType': {
    handler: function(n, p) {
      if (this.isPlaying) {
        this.stop()
      }
      if (this.source) {
        if(p === "0") this.source.stop()
        else if(p === "1") document.querySelector('audio').pause()
      }
      switch(n) {
        default:
        case "0":
          this.source = this.audioCtx.createOscillator()
          this.source.start()
          this.source.connect(this.gainNode)
          break
        case "1":
          const audio = document.querySelector('audio');
          audio.play()
          if(this.audioSource) {
            this.source = this.audioSource
          } else {
            this.source = this.audioCtx.createMediaElementSource(audio);
          }
          this.source.connect(this.gainNode)
          break
      }
    },
    immediate: true
  }
},
```

這邊透過 `immediate` 讓 Watcher 會馬上執行一次，當作初始化。

主要的程式碼大概就這樣，可以看結果啦～

[Live Demo](https://schaoss.github.io/web-audio/#/source)

實作時需要小心的地方有：

- 由於 **audio 元素只能建立一次 MediaElementSource**，所以第一次建立完後，須將它暫存起來，後續重複切換時才不會因無法重複建立 MediaElementSource 而報錯。

- 當 audio 建立成 MediaElementSource 後，其 **播放的控制權即為 AudioContext 所有**。如果已經建立 MediaElementSource，即使 audio 開啟了控制面板，按了撥放，也需要將 MediaElementSource 連接到 destination 才能正確撥放。

實作到這邊，已經可以藉由程式控制 & 撥放`<audio>`的內容了，後續要如何應用，就請讀者們自行發揮創意囉～

明天還要再介紹一種常用的音源 - 麥克風，一起來嘗試玩玩看即時收音吧！

![mic](https://i.imgur.com/8Emhqju.png)

> ### 筆者
>
> ## Gary
>
> 半路出家網站工程師；半生熟的前端加上一點點的後端。
> 喜歡音樂，喜歡學習、分享，也喜歡當個遊戲宅。
>
> 相信一切安排都是最好的路。
