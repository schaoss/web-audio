# 24. Scribbletune

結束了連續三天的音序機之旅，是否覺得互動式音樂非常有趣呢？接下來讓我們玩玩另一個有趣的音樂套件 - Scribbletune。

### 這是什麼？

[Scribbletune](https://scribbletune.com/) 是一個幫助創作者生出創意靈感的 Javascript 套件。使用者可以使用字串跟陣列，描述大致的音型，接著就交給 Scribbletune 幫你隨機生成！生成後的結果可以匯出成 MIDI 檔，或是直接在網頁上使用，非常方便。

作者在 SFNode 實際應用並 Live Coding 的影片：

[![youtube](https://img.youtube.com/vi/iwuZzp_ZnLo/0.jpg)](https://www.youtube.com/watch?v=iwuZzp_ZnLo)

### 為什麼要玩這個？

因為方便又好玩啊！

Scribbletune 可以用簡短的指令，直接隨機生出 MIDI 檔，創作者可以再自行做其他應用。網頁上的版本更結合了我們才介紹完的 Tone.js 及 tonal，使用上必能輕鬆上手～

另外，身為半調子不專業樂手，有個能隨機生成旋律的小套件，還是挺方便的啦 XD

### 功能有哪些？

承上所述，**Scribbletune 包裝了 Tone.js 及 tonal**，在網頁使用時，可以透過 tonal 提供的強大樂理計算功能，快速做出需要的音型，再將其交給 Tone.js 做依序或亂數撥放，使用上非常有彈性。

透過三個字元即可快速定義出的節奏模式，簡短的指令就能做出音檔或尋找靈感，是不是很方便呢～

> 可以參考 [官網首頁的範例音檔連結](https://soundcloud.com/scribbletune/chords#t=0:00)

[![scribbletune](https://i.imgur.com/o42oZ2a.png)
](https://soundcloud.com/scribbletune/chords#t=0:00)

### 怎麼用啊？

新套件，當然是先安裝囉：

```cs
npm i scribbletune

or

yarn add scribbletune
```

接著是在欲使用的地方載入它：

```javascript=
import Tone from 'tone'
import Scribbletune from 'scribbletune'
```

由於 Scribbletune 的網頁撥放依賴 Tone.js，要記得連 Tone.js 一併引用，並透過：

```javascript=
window.Tone = Tone
```

將 Tone.js 指定成全域物件，Scribbletune 才能正確使用喔！

接著就來製作官網範例的音檔吧～

```javascript=
Scribbletune.clip({
  synth: 'PolySynth',
  notes: 'F#m C#m DM Bm EM AM DM C#m AM',
  pattern: '[xx][x-]'.repeat(8)
}).start()

Tone.Transport.start()
```

這樣就完成囉。

設定很簡單吧！Scribbletune 就是這麼簡單卻威力強大的套件！
那麼今天就先這樣，大家明天見～

> ### 筆者
>
> ## Gary
>
> 半路出家網站工程師；半生熟的前端加上一點點的後端。
> 喜歡音樂，喜歡學習、分享，也喜歡當個遊戲宅。
>
> 相信一切安排都是最好的路。
