# 20. Tone.js - 排程

旅程走到這邊，也逐漸認識 Tone.js 這個音樂框架了，是不是有種相見恨晚的感覺啊 XD

但也是因為我們先在 Web Audio API 上走過一圈，熟悉了模組化串接的概念，現在才能進展的比較快喔～

好啦，那來進入今天的正題 - 排程吧！

### getTransport()

Tone.js 提供了 `getTransport()` 這個時間管理介面，我們可以將播放聲音的事件，註冊在 getTransport() 的特定時間點上，當時間到了，聲音自己就會播出來了。~~就跟我們的 [團隊](https://ithelp.ithome.com.tw/ironman/signup/team/41) 一樣呢！時間到了文章自然就會產出來了 XD~~

使用上也還算簡單好懂：

```javascript=
Tone.getTransport().schedule(function(time){
  polySynth.triggerAttackRelease('C4', "8n")
}, 0)

...

Tone.getTransport().start() // 令 getTransport() 開始計時
```

這樣就會把 播放指定內容的事件，註冊在 getTransport() 開始的時候。

如果是週期性的事件，可以換成使用 `scheduleRepeat` 來自動排程播放

```javascript=
Tone.getTransport().scheduleRepeat(
  function(time) {
    polySynth.triggerAttackRelease('C4', '8n')
  },
  '4n',
  '2m'
)
```

這樣會從第二小節結束後開始，每四分音符就播放一次指定的內容。

前幾天有稍微提到，預設的速度是 120 BPM，拍號則是 4/4 拍。如果需要更改設定，可以透過：

```javascript=
Tone.getTransport().bpm.value = 80
Tone.getTransport().timeSignature = 3
```

這樣來調整。

> 要注意的是，Tone.js 裡的 timeSignature 只標註了一小節有幾拍，其餘的需要創作者在使用時自行換算。

### Loop

Tone.js 裡，也將自己的 getTransport() 在包裝成幾種更高階的 API，使用上也更加方便。`Loop` 就是其中一個：

```javascript=
const loop = new Tone.Loop(function(time) {
  synth.triggerAttackRelease('C2', '8n', time)
}, '4n')

loop.start('1m').stop('4m')

Tone.getTransport().start()
```

上面的例子中，Loop 會自動在第一小節結束時開始播放，在第四小節停止。使用時要記得，Loop 是 getTransport() 包裝過的方法，因此還是依賴在 getTransport() 的時間軸上，要記得呼叫 `Tone.getTransport().start()`，才會開始播放喔！

### Pattern

另一個很好用的是 `Pattern`，從 [官方文件](https://tonejs.github.io/docs/r12/Pattern) 可以看到是繼承自 Loop，除了 Loop 的功能外，還多了設定音高陣列的參數，在有特定音形需要重複播放時非常方便。

```javascript=
const pattern = new Tone.Pattern(
  function(time, note) {
    //the order of the notes passed in depends on the pattern
  },
  ['C2', 'D4', 'E5', 'A6'],
  'upDown'
)

pattern.start()
Tone.getTransport().start()
```

pattern 接受三個變數，callback function、音高陣列、播放的模式。前兩個應該都可以顧名思義，最後一個的播放模式指的是音高陣列的使用順序；例如由高到低、由低到高、高到低到高，甚至是亂數播放，全看創作者的創意發揮。

### Demo

好幾天沒有作範例程式了，主要是因為 Tone.js 就是 Web Audio API 包裝後的框架，做出來的東西跟先前的範例實在太像，就沒有放上來了。

今天想要實際玩一下 Pattern 的設定。

```javascript=
const noteArr = [
  'C3',
  'D3',
  'E3',
  'F3',
  'G3',
  'A4',
  'C4',
  'D4',
  'E4',
  'F4',
  'G4',
  'C5'
]
const polySynth = new Tone.PolySynth({ maxPolyphony: 6 }, Tone.Synth).toDestination()
const pattern = new Tone.Pattern(
  (time, note) => {
    polySynth.triggerAttackRelease(note, '1n')
    this.note = note
  },
  noteArr,
  'randomOnce'
)
```

筆者先定義了一組音高陣列，內容是從 C3 到 C5 的自然音階，並定義了最多同時播放 6 個單音的 polySynth，利用 Pattern 隨機播放音長為全音符的聲音。

> randomOnce 指的是隨機撥放，且在陣列內容都被選過前不會重複。

由於我們每個單音長度都是全音符，即最多同時會有四個音符正在被播放，那麼就來算一下現在是什麼和弦吧！

先前介紹過的 `tonal` 就有提供換算和弦的方法：

```javascript=
import { chord } from "tonal-detect"
...
chord(this.notes)
```

這樣就搞定啦！其他部分就是 Vue 的點擊事件綁定，觸發播放、暫停。要注意的同樣就是要記得透過 `Tone.getTransport().start()` 讓 getTransport() 的計時器開始執行，才會開始運作喔～

來看結果吧～

[Live Demo](https://schaoss.github.io/web-audio/#/tone)

![result](https://i.imgur.com/zant7Zr.gif)

實作起來非常簡單，短短幾行程式就可以做到複雜的聲音排程播放，文件也算非常完整，還提供了大量的範例供開發者學習，對網站音效有興趣的讀者千萬不能錯過 Tone.js！

那麼今天就這樣啦～

> ### 筆者
>
> ## Gary
>
> 半路出家網站工程師；半生熟的前端加上一點點的後端。
> 喜歡音樂，喜歡學習、分享，也喜歡當個遊戲宅。
>
> 相信一切安排都是最好的路。
