# 13. Web Audio API - 處理結點

不知不覺來到第十三天，在這段時間我們一起認識了許多 Web Audio API 的特色功能，也在過程中做出不少小玩具。如果目前玩過的功能都無法滿足讀者您，那最後這個就是你需要的。

### ScriptProcessor

跟它的名字一樣，就是讓使用者可以透過 Javascript 對音樂訊號做進一步處理的節點。

使用上也很簡單，先來認識它的建構式：

```javascript=
const processor = audioCtx.createScriptProcessor(bufferSize, input, ouput)
```

建構式可接受三個參數：

- bufferSize：處理節點內的 Buffer 大小
- input：可輸入的頻道數
- ouput：輸出的頻道數
  建構出來的實例只有一個監聽事件的方法：

```javascript=
processor.onaudioprocess = e => {
  const input = e.inputBuffer.getChannelData(0);
  const output = e.outputBuffer.getChannelData(0);
  ...
}
```

在方法內可以從事件拿到輸入及輸出的資料陣列，並可以在 `getChannelData(i)` 內指定要哪一頻道的資料。

![ScriptProcessor](https://i.imgur.com/mQKRYmU.png)

> [MDN ScriptProcessorNode](https://developer.mozilla.org/en-US/docs/Web/API/ScriptProcessorNode)

如上圖，在 ScriptProcessorNode 內，預設不會把 input 倒到 output 去，因此使用時至少需要將陣列資料複製進去，如下例：

```javascript=
processor.onaudioprocess = e => {
  const input = e.inputBuffer.getChannelData(0)
  const output = e.outputBuffer.getChannelData(0)

  for (var i = 0; i < input.length; i++) {
    output[i] = input[i]
  }
  this.micOutput = output
}
```

這邊是從 [音源]() 那篇截出來的範例，筆者還有額外將 output 資料複製到 Vue 的 Data 內，讓畫面上可以同步顯示資料內容。

![source](https://i.imgur.com/Uzpa4JI.png)

另外，從 input 取得的是 時域 的資料，需要用 `Float32Array(bufferSize)` 來承接，使用上要特別小心。

到這邊，就可以從 Web Audio API 取回資料接手處理了。但聲音的資料可以做什麼處理呢？

### 聲音的資料

從 Buffer 中收到的資料陣列內，裝的是每一次對聲音取樣所得到的數值（能量高低）。

例如我們對虛線內的某波函數採樣，得到這些紅點。

![sine-4](https://i.imgur.com/6ajbMZk.png)

但由於採樣的密度可能不夠，且採樣的時間區間通常也不會剛好是週期的倍數，就會造成所謂的 **失真**。

![sine-5](https://i.imgur.com/fVqwxOY.png)

也就會造成許多衍生的問題，例如 [訊號洩漏](https://mp.weixin.qq.com/s?__biz=MzI5NTM0MTQwNA==&mid=2247484164&idx=1&sn=fdaf2164306a9ca4166c2aa8713cacc5)；也因此在訊號處理上，處理失真就是重要的一環。

有興趣的讀者，可以參考 [失真](https://zh.wikipedia.org/wiki/%E5%A4%B1%E7%9C%9F)、[窗函數](https://zh.wikipedia.org/wiki/%E7%AA%97%E5%87%BD%E6%95%B0)

> 筆者對訊號處理僅略懂皮毛，歡迎各路大神賜教 Orz

今天就先到這邊，~~因為筆者某個在開直播的同事，一直敲碗說需要變聲器~~，明天我們就來挑戰透過 ScriptProcessorNode 實作變聲器吧～

> ### 筆者
>
> ## Gary
>
> 半路出家網站工程師；半生熟的前端加上一點點的後端。
> 喜歡音樂，喜歡學習、分享，也喜歡當個遊戲宅。
>
> 相信一切安排都是最好的路。
