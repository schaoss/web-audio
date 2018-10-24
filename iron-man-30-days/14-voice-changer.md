# 14. 變聲器

接續昨天的話題，今天我們要透過 ScriptProcessorNode 來實作變聲器。

如果讀者您不知道什麼是變聲器的話，可以參考：

[![conan](https://i.imgur.com/UiujE9N.png)](https://www.youtube.com/watch?v=soFcNR1hTsg)

這篇會涉及訊號處理的部分演算法實作，可能會比較硬喔 XD

> 筆者對訊號處理領域涉獵不深，僅略懂皮毛，歡迎各路大神不吝賜教

### 原理

變聲器其實就是調整聲音的音高，也就是調整頻率。

假想一個某頻率的聲音如下圖：

![sine](https://i.imgur.com/YBsVpDk.png)

如果我們希望音高提高八度，那頻率就要變成現在的兩倍：

![sine-2](https://i.imgur.com/FgtTXaj.png)

所以我們只要將收到的資料加速播放，並重複資料填補時間空隙，就可以做到提高音高的效果了！

反之亦同。如果想要降低音高，只要將資料減速播放，並利用內插法計算出採樣之間的資料數值，這樣就沒問題啦～

### 處理失真

可是如同前一篇所述，當聲音經過採樣變成數位資料時，往往會產生失真的問題。

![sine-3](https://i.imgur.com/fVqwxOY.png)

如果採樣的時間區間不是週期的倍數，那麼在加速播放重複資料時，就會造成聲音訊號的不連續；如果採樣的密度相對於訊號頻率不夠高，可能會無法正確反映出訊號的真實變化；還有雜訊對訊號的影響、轉化成數位資料時的量化誤差等等，諸多因素都可能會導致失真。

失真既然是無可避免的，那我們該如何處理它呢？

#### 窗函數

最常見的方法就是透過 [**窗函數**](https://zh.wikipedia.org/wiki/%E7%AA%97%E5%87%BD%E6%95%B0) 來對訊號做加權。窗函數是一種除了特定區間以外取值均為 0 的函數，將訊號乘上窗函數，也就相當於透過窗函數有值的範圍觀測我們的收到的資料。

![window func.](https://i.imgur.com/sKrkN4w.png)

只要透過能夠將訊號頭尾削弱的窗函數 (e.g. Hann window)，便可以把聲波週期對取樣造成的失真降低，但同時也代表會犧牲掉每組訊號的頭尾資料，這樣就需要透過訊號重疊來解決

#### 訊號重疊

我們可以將通過窗函數的資料，前後稍微重疊，除了可以解決前述的問題外，也可以藉由重疊將雜訊相對的削弱。

![overlapping](https://i.imgur.com/al3bS4N.png)

雖然透過訊號重疊可以解決許多問題，但要付出的代價就是重疊率越高，花在計算上的效能消耗也就越多。

> 有興趣更深入的讀者可以參考 [這裡](https://dsp.stackexchange.com/questions/36509/why-is-each-window-frame-overlapping)

### Demo

那麼開始實作吧。

為了達到變聲器的效果，在 ScriptProcessorNode 中我們總共需要做三件事情：

- 窗函數過濾
- 調整頻率
- 重疊

![ScriptProcessorNode](https://i.imgur.com/Yc85hq3.png)

因為是變聲器，音源就繼續沿用先前範例的麥克風收音，這邊就不贅述了。

在得到使用者授權，接取到麥克風資料後，我們先建立 ScriptProcessorNode：

```javascript=
const processor = this.audioCtx.createScriptProcessor(this.bufferSize, 1, 1)
```

接著在 onaudioprocess 事件處理函式內，實作主要的邏輯：

```javascript=
 processor.onaudioprocess = (e) => {
  const input = e.inputBuffer.getChannelData(0);
  const output = e.outputBuffer.getChannelData(0);
  ...
}
```

第一步，是建立 [Hann 窗](https://zh.wikipedia.org/wiki/%E7%AA%97%E5%87%BD%E6%95%B0#Hann%E7%AA%97)

```javascript=
hannWindow(length) {
  const window = new Float32Array(length)
  for (var i = 0; i < length; i++) {
      window[i] = 0.5 * (1 - Math.cos(2 * Math.PI * i / (length - 1)))
  }
  return window;
},
```

隨後將訊號通過它：

```javascript=
for (i = 0; i < input.length; i++) {
  input[i] *= hannWindow[i]
}
```

接著是調整頻率：

```javascript=
const grainData = new Float32Array(this.bufferSize)
for (
  let i = 0, j = 0.0;
  i < this.bufferSize;
  i++, j += parseFloat(this.pitchRatio)
) {
  let index = Math.floor(j) % this.bufferSize
  let a = input[index]
  let b = input[(index + 1) % this.bufferSize]

  grainData[i] += this.linearInterpolation(a, b, j % 1.0) * hannWindow[i]
}
```

這邊利用線性插值，塞入取樣間可能的數值，並讓數據更平滑。

最後是重疊：

```javascript=
const buffer = new Float32Array(this.bufferSize * 2)
...
for (let i = 0; i < this.bufferSize; i += Math.round(this.bufferSize * (this.overlapRatio))) {
  for (let j = 0; j <= this.bufferSize; j++) {
      buffer[i + j] += grainData[j]
  }
}
```

`bufferSize * 2` 的原因，是因為要留下一份重疊後的資料供下組採樣做重疊時使用。
因此在最一開始要將 buffer 後半的數值搬移至前半準備重疊，並清空後半。

```javascript=
for (let i = 0; i < input.length; i++) {
  buffer[i] = buffer[i + this.bufferSize]
  buffer[i + this.bufferSize] = 0.0
}
```

將程式整理乾淨，就大功告成啦～

[Live Demo](https://schaoss.github.io/web-audio/#/voice-changer)

那麼這次的變聲器實作就到這邊，明天就是 Web Audio API 這部分的總結囉！

> 本次的變聲器演算法，是筆者參考了 [Pitch shifter](https://github.com/urtzurd/html-audio) 並理解後的重新實作。如有不清楚的地方，歡迎與我聯繫討論；當然，如果有筆者我理解錯誤的地方，也煩請讀者您不吝告知。

&nbsp;

> ### 筆者
>
> ## Gary
>
> 半路出家網站工程師；半生熟的前端加上一點點的後端。
> 喜歡音樂，喜歡學習、分享，也喜歡當個遊戲宅。
>
> 相信一切安排都是最好的路。
