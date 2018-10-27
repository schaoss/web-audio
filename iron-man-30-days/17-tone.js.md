# 17. Tone.js

昨天我們認識了一個專注在樂理上的套件，並在最後展示了一個互動音樂的範例。

該範例是 tonal 與 Tone.js 的結合，那麼今天就接著來介紹 Tone.js 吧～

### 這是什麼？

[Tone.js](https://github.com/Tonejs/Tone.js) 是一個 Web 音樂框架，建構在 Web Audio API 之上。除了包裝並 Web Audio API 原生的功能、簡化使用方式之外，還提供了許多原生的特色功能，例如可直接載入 MIDI 音檔，再將其製作成取樣機，或對其做其他音效處理等等，是網頁互動音樂的知名框架之一。

放上一個筆者我非常喜歡的使用範例。這是一個 Tone.js 與 Three.js 結合的 3D 互動式音樂：

[![yume](https://i.imgur.com/qCbzjGp.png)
](http://www.unseen-music.com/yume/)

> Three.js 是一個 3D 動畫框架，對其有興趣的讀者，可以參考 [這裡](https://ithelp.ithome.com.tw/users/20107572/ironman/1782)

### 為什麼要玩這個？

因為用起來方便啊。

Web Audio API 的功能使用上有些稍嫌繁瑣，在實際使用情境上，就更顯得麻煩。

例如說，開發者想要播放一個特定音高的單音；在只使用 Web Audio API 的情況下，我們需要建立 AudioContext 實體、建立震盪器、計算頻率、最後連接到 AudioContext 的 destination，十分繁複。但透過 Tone.js ，使用其包裝好的方法，只需要一行指令就可以直接達成前述的目標。

### 功能有哪些？

Web Audio API 的功能如本系列文介紹過的音源、效果、分析節點等等全都一應俱全，並將其重新包裝，我們能透過更精簡的設定，使用一樣甚至更多的功能，達到更好的效果。

其他的原生功能，有著非常方便的排程播放、迴圈設定等，另外還提供了聲音視覺化的 API 接口，讓開發者可以更輕鬆的做出引人入勝的視覺、聽覺特效。

![example-1](https://i.imgur.com/tCCHBbJ.png)

> 可以參考他們的 [官方範例](https://tonejs.github.io/examples/#mixer)

### 怎麼用啊？

首先，當然是安裝套件：

```cs
npm install tone

or

yarn add tone
```

接著在欲使用的地方載入套件：

```javascript=
import Tone from 'tone'
```

並使用它：

```javascript=
const synth = new Tone.Synth().toMaster()

synth.triggerAttackRelease('C4', '8n')
```

這樣子就可以播放一個 C4 音高的八分音符。

> 預設的拍號為 4/4，bpm 為 120。

接下來的幾天，筆者預計會介紹 Tone.js 的部分功能，並在最後做成一個類似 [官方範例](https://tonejs.github.io/examples/#stepSequencer) 的小作品，請各位讀者敬請期待！

![example-2](https://i.imgur.com/E1bb5vF.png)

那麼就先到這邊囉～

> ### 筆者
>
> ## Gary
>
> 半路出家網站工程師；半生熟的前端加上一點點的後端。
> 喜歡音樂，喜歡學習、分享，也喜歡當個遊戲宅。
>
> 相信一切安排都是最好的路。
