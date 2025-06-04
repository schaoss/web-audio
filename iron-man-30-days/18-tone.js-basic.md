# 18. Tone.js - 基本功能

昨天我們一起認識了 Tone.js，並用最簡單的範例讓它發出聲音；今天就接著介紹 Tone.js 的幾項重點觀念或功能吧！

### 節點關係

各種效果器。Tone.js 是建構在 Web Audio API 之上的套件，因此在使用方式上，也很有 Web Audio API 的影子。

例如在昨天的例子中，我們透過

```javascript=
const synth = new Tone.Synth().toDestination()
```

來宣告一個合成器，其中的 `.toDestination()` 的用途，就如同先前在 Web Audio API 中透過 `.connect(audioCtx.destination)` 做的事，將音源連接到播放裝置上。

如果要新增音效處理節點，也是同樣的透過 `connect()` 方法，將節點連接。例如將合成器連結到 [wah wah](<https://en.wikipedia.org/wiki/Wah-wah_(music)>) 上：

```javascript=
const autoWah = new Tone.AutoWah(300, 6, -30).toDestination()
const synth = new Tone.Synth().connect(autoWah)
```

相信前面旅程有一起參與的讀者，對於這樣的串接模式肯定是很熟悉了 XD

![wah wah](https://i.imgur.com/2hJRUQS.jpg)

> 一般常見的 wah wah 就是他腳下那顆效果器。

### 時間單位

同樣的，回顧一下昨天的範例：

```javascript=
const synth = new Tone.Synth().toDestination()

synth.triggerAttackRelease('C4', '8n')
```

我們宣告了一個合成器，指定它的音高與音長。在 Tone.js 裡，時間單位可以是 拍長（預設為 4/4 拍 / 120 bpm）或是秒數，例如：

```javascript=
synth.triggerAttackRelease('C4', '1')
```

就會變成播放 1 秒。

`triggerAttackRelease()` 這個方法還可以帶第三個參數 - 延遲時間；例如：

```javascript=
synth.triggerAttackRelease('C4', '8n', 2)
```

我們指定的音符就會在 2 秒後播放。

時間也可以互相加減，只要透過 `Tone.Time()` 來換算成時間長度。例如：

```javascript=
synth.triggerAttackRelease('C4', '8t', Tone.Time('4n') + Tone.Time('8t'))
```

> 8n 為 8 分音符的長度、4t 為 三連音 4 分音符的長度，更多時間表示方式可以參考 [這裡](https://github.com/Tonejs/Tone.js/wiki/Time)。

### 音源

音源的部分，Tone.js 將 Web Audio API 的振盪器包裝成了數種常用的模組。例如 `PWMOscillator` 會在振盪出聲的同時，週期性的些微改變音色，`Noise` 可以製造出[白噪音](https://zh.wikipedia.org/wiki/%E7%99%BD%E9%9B%9C%E8%A8%8A)、[粉紅噪音](https://zh.wikipedia.org/wiki/%E7%B2%89%E7%BA%A2%E5%99%AA%E5%A3%B0)、[布朗噪音](https://zh.wikipedia.org/wiki/%E5%B8%83%E6%9C%97%E5%99%AA%E5%A3%B0)共三種噪音。

```javascript=
// type: 'white', 'pink', 'brown'
const noise = new Tone.Noise('pink').start()
```

> 可能有讀者會好奇，為什麼要製造「噪音」。
> 噪音在經過處理後，可以做成例如 [hi-hat](https://ithelp.ithome.com.tw/articles/10195126) 的打擊樂器

當然，Tone.js 對其他類型音源如音檔、麥克風等，也提供了接口，可以參閱 [官方文件](https://tonejs.github.io/docs/r12/UserMedia)

最後分享一個有趣的範例，是將 Tone.js 的各項功能做成可任意拖拉、連結、擺放的各色方塊，透過這些方塊做出獨具特色的音樂片段。大家可以來玩玩看：

[![BlokDust](https://i.imgur.com/2m6DL2p.png)
](https://blokdust.com/)

> [GitHub](https://github.com/BlokDust/BlokDust)

今天就到這邊啦，明天筆者預計會繼續介紹 Tone.js 的其他重點特色，大家明天見～

> ### 筆者
>
> ## Gary
>
> 半路出家網站工程師；半生熟的前端加上一點點的後端。
> 喜歡音樂，喜歡學習、分享，也喜歡當個遊戲宅。
>
> 相信一切安排都是最好的路。
