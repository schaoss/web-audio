# 08. Web Audio API - 音源

音效處理節點玩了不少，今天就來看看一直忽略的音源部分能玩出什麼變化吧！

### 振盪器 Oscillator

到目前為止，前面所有的範例，音源都是透過
```javascript
const oscillator = audioCtx.createOscillator()
```
這樣的方式建立出振盪器作為音源；而振盪器的功用，就是建立週期性、可選擇波形的訊號。如正弦波、方波、三角波等。

![waveform](https://i.imgur.com/T592Gso.png)

>圖中橫軸是時間，縱軸是能量高低。

由於是週期性、固定波形的訊號，參數固定的情況下，聲音聽起來就略顯單調了。如果在實際應用的場合不想使用振盪器，我們還有別的選擇，例如可以用現有的音檔。

### 載入音源 MediaElementSource

我們可以透過 html 的 `<audio>`tag，將音樂載至瀏覽器內，需要的話也可以透過內建的撥放器撥放：
```htmlmixed
<audio id="player" controls src="path/to/your/audio/file"></audio>
```
> 也可以透過 Javascript 載入音檔，不過就需要自行透過 `createBufferSource`、`decodeAudioData` 實作接收檔案 Buffer、解碼等部分；有興趣的讀者歡迎參閱 **[這裡](https://developer.mozilla.org/zh-CN/docs/Web/API/AudioContext/decodeAudioData)** 玩玩看。
 
再將 `audio` 內的音檔，透過 `createMediaElementSource()` 轉交給 Web Audio API 當作音源：

```javascript
const audio = document.querySelector('#player');
const source = audioCtx.createMediaElementSource(audio);
```

之後就可以把它當成一般的 AudioNode，和其他節點互相 `connect` 囉。但這樣還是不夠方便對吧？來嘗試看看串接麥克風即時收音吧！

### 麥克風收音

收音也不是我們網站想收就能收的，要先透過 `navigator.mediaDevices` 的 [`getUserMedia`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) 這個方法，來取得使用者授權。
```javascript
navigator.mediaDevices.getUserMedia({ audio: true, video: false })
```
由於這個方法會回傳一個 Promise，可以用鏈式的函示，定義取得授權成功與失敗的 callback function

```javascript=
navigator.mediaDevices.getUserMedia(constraints)
.then(stream => {
  ...
})
.catch(e => {
  ...
});
```
> 如果使用者拒絕授權，網站就無法再次主動要求授權；而需要由使用者手動開啟。
> 若想優化這部分的 UX，可以透過 Permission API 確認各權限是否已經被使用者授權。

取得授權之後，可以在 callback 函式中，將麥克風收進來的音訊串流透過 `createMediaStreamSource` 轉成音源節點，就能對其做出想要的處理囉～

```javascript=
navigator.mediaDevices.getUserMedia(constraints)
.then(stream => {
  const source = context.createMediaStreamSource(stream)
  ...
})
```

今天大致介紹了幾種音源，其中最有趣也最有玩樂價值的，個人認為應該是麥克風收音吧？接下來幾天，我們就來透過麥克風收音，練習做出幾種應用囉～

![lisenter](https://i.imgur.com/7aZ1eJN.png)