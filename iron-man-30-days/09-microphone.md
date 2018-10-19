# 09 Web Audio API - 音源 Part.2

延續昨天的話題，今天要來玩玩看麥克風收音！

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

### Demo

同昨天的範例，先加上音源選單，方便後續的切換：

```html
<select @change="sourceType=$event.target.value">
  <option value="0">振盪器</option>
  <option value="1">Audio Tag</option>
  <option value="2">麥克風</option>
</select>
```

以及在 watch 加上麥克風：

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
        else if(p === "2") this.micStream.getAudioTracks()[0].stop()
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
        case "2":
          navigator.mediaDevices.getUserMedia({ audio: true, video: false })
          .then(this.getUserMic)
          .catch(e => console.log(e))
          break
      }
    },
    immediate: true
  }
},
```

當取得使用者授權，得到麥克風權限後，觸發 `getUserMic`：

```javascript=
getUserMic(stream) {
  this.micStream = stream
  this.source = this.audioCtx.createMediaStreamSource(stream)
  const processor = this.audioCtx.createScriptProcessor(1024, 1, 1)
  processor.onaudioprocess = (e) => {
    const input = e.inputBuffer.getChannelData(0);
    const output = e.outputBuffer.getChannelData(0);
    for (var i = 0; i < input.length; i++) {
      output[i] = input[i]
    }
    this.micOutput = output
  }
  this.source.connect(processor)
  processor.connect(this.gainNode)
}
```

> `createScriptProcessor` 的第一參數為 buffer 大小

這邊額外串接了一個 `processor`，將接收到的音訊串流，透過 buffer 暫存，並顯示在畫面上：

```html
<div v-show="sourceType ==='2'">
  <div class="item">{{micOutput}}</div>
</div>
```

如果有正確接上，畫面上應該會顯示音訊內容的數字陣列：

![result](https://i.imgur.com/ax23ZMn.png)

最後，在 Vue 元件生命週期結束時也要記得將麥克風關閉，不然在畫面重整前麥克風會永遠開著 XD

```javascript=
beforeDestroy() {
  if(this.micStream) this.micStream.getAudioTracks()[0].stop()
}
```

最後來看看成品囉

[Live Demo](https://schaoss.github.io/web-audio/#/source)

實作時可能需要注意的地方：

- 在接收麥克風音訊串流的函式內，須將 stream 暫存，後續才能做麥克風的「關閉」。
- 麥克風的關閉，需選到串流內的曲目才能關閉，相當不直觀 XD
  > stream.getAudioTracks()[0].stop()

&nbsp;

這兩天大致介紹了幾種音源，其各自也都有一些眉眉角角，使用時還請讀者小心、細心，不要像筆者一樣找問題找到半夜，結果是筆電麥克風根本沒開...

那麼今天就先到這邊囉～

![lisenter](https://i.imgur.com/7aZ1eJN.png)

> ### 筆者
>
> ## Gary
>
> 半路出家網站工程師；半生熟的前端加上一點點的後端。
> 喜歡音樂，喜歡學習、分享，也喜歡當個遊戲宅。
>
> 相信一切安排都是最好的路。
