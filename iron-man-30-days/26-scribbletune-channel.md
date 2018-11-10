# 26. Scribbletune - 音軌處理

今天我們將會繼續介紹 Scribbletune 中獨有的特色功能 - Session 及 Channel。

### Channel

昨天我們講到了 Clip，也就是音樂的片段，我們可以利用 Scribbletune 標示節奏、旋律的方式，將某樂器同樣節奏、旋律的地方做成一個 Clip，再將多個 Clip 組成一個 Channel。

Channel 的概念其實就是數位錄音時的一個音軌，只是透過程式的方式表達。

![GarageBand](https://i.imgur.com/oQTdtmw.png)

> 用 iOS / Mac 的讀者們，可以打開你的 GarageBand 玩玩看 XD

使用的方法也很簡單，首先要先宣告 Session：

```javascript=
const session = scribble.session()
```

再透過 Session 的方法 `createChannel()` 建立 Channel：

```javascript=
const kickChannel = session.createChannel({
  sample: 'https://scribbletune.com/sounds/kick.wav',
  clips: [
    { pattern: 'x' },
    { pattern: 'xxx[xx]' },
    { pattern: 'x' },
    { pattern: 'xxx[-x]' }
  ]
})
```

由於 Channel 是同一個樂器的音軌，會使用同一個音色，這邊將 `sample` 設定在 Channel 中，Clip 就不用再設定了。

> 若沒有現成的音檔，可以像之前的範例那樣用 synth 代替 sample

這樣就準備完成囉～當想要播放時則是要使用：

```javascript=
kickChannel.startClip(2)
```

如果要動態新增，Scribbletune 也預留了方法：

```javascript=
const params = { pattern: 'xx[xx]' }
kickChannel.addClip(params, 4) // index
```

當然，記得要先讓 Tone.js 的 Transport 開始運作，Scribbletune 的播放事件才會被觸發喔！

```javascript=
Tone.Transport.start()
```

### Session

反應快的讀者應該猜到了，剛剛在介紹 Channel 時，我們宣告了 Session，再從 Session 建立 Channel。沒錯 Session 就是 Channel 的集合。

使用時，我們同樣需要先宣告 session：

```javascript=
const session = scribble.session()
```

並透過 session 建立 channel：

```javascript=
const kickChannel = session.createChannel({
  sample: 'https://scribbletune.com/sounds/kick.wav',
  clips: [
    { pattern: 'x' },
    { pattern: 'xxx[xx]' },
    { pattern: 'x' },
    { pattern: 'xxx[-x]' }
  ]
})
const bassChannel = session.createChannel({
  sample: 'https://scribbletune.com/sounds/bass.wav',
  clips: [
    { pattern: '[-x]' },
    { pattern: '[--xx]' },
    { pattern: '[-xxx]' },
    { pattern: 'xxx' }
  ]
})
```

這邊我們建立了兩個 Channel；Session 提供的方法 `startRow(i)` 可以讓我們指定所有 Channel 一起執行 `startClip(i)`

```javascript=
session.startRow(1)
```

是不是非常便利呢？

Scribbletune 的作者 [Walmik Deshpande](https://github.com/walmik) 表示，這些音軌處理的功能，是他想要在 Scribbletune 中簡易的實現 [Ableton Live](https://www.ableton.com/en/trial/)。對數位音樂、DJ 混音、現場音軌處理有興趣的讀者也可以參考看看～

[![Ableton Live](https://i.imgur.com/K3xYZMc.png)](https://www.ableton.com/en/trial/)

那麼 Scribbletune 就介紹到這邊，我們明天見！

> ### 筆者
>
> ## Gary
>
> 半路出家網站工程師；半生熟的前端加上一點點的後端。
> 喜歡音樂，喜歡學習、分享，也喜歡當個遊戲宅。
>
> 相信一切安排都是最好的路。
