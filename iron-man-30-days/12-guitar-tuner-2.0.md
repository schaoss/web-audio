# 12. 吉他調音器 Part.2

經過演算法的腦力轟炸，剩下的部分就顯得相對簡單了。我們來一鼓作氣完成它！

先複習一下調音器預計要實作的流程

![flow](https://i.imgur.com/Szp0uAs.png)

昨天解決了最麻煩的 **聲音 -> 頻率** 這一段，接下來的今天就是數學時間啦～

### 從頻率到音高

先複習一下先前製作定音器時，半音轉頻率所用到的算法：

```javascript=
getFrequency(semitone) {
  return this.standardA4 * Math.pow(2, (semitone - 69)/12)
},
```

有式子就簡單啦～數字交叉相乘稍微換個位置，並把標準 A4 固定在 440 帶入，就能得到：

```javascript=
getSemitone(f) {
  return Math.round(12 * (Math.log(f / 440) / Math.log(2) )) + 69
},
```

> 由於輸入的頻率可能不是準確的音，故需要再套一層 `Math.round()`

到這邊就得到 MIDI 半音編號囉。

接著要取得半音編號的音名，一樣先參考先前音名轉半音的算法：

```javascript=
getSemitone(note) {
  const noteList = {
    'C': 0,
    'C#': 1,
    'Db': 1,
    'D': 2,
    'D#': 3,
    'Eb': 3,
    'E': 4,
    'F': 5,
    'F#': 6,
    'Gb': 6,
    'G': 7,
    'G#': 8,
    'Ab': 8,
    'A': 9,
    'A#': 10,
    'Bb': 10,
    'B': 11
  }
  return noteList[note.slice(0,-1)] + 12 * (1 + parseInt(note.slice(-1)))
},
```

比照之前的，建立一個對應關係物件。由於不需要考慮異名同音，可以簡單的用陣列實作。

然後就將半音編號取 12 的餘數，就知道音高囉。

```javascript=
getNoteStr() {
  const noteStr = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  return this.semiTone ? noteStr[this.semiTone % 12] : '-'
},
```

到這邊就完成了...嗎？ 還沒結束喔！

既然是調音器，使用者必須知道目前的音，距離相鄰的標準音有多遠才能用啊～

我們可以透過收到的音與半音編號回推的最近標準音，計算出他們的差距。但在半音之間的某個音，要怎麼描述它的距離呢？

### 音分 cent

一個八度音程，我們會將其切成 12 個半音，是樂理內慣用的最小距離單位。但當我們需要描述聲音在半音之間時，我們可以使用音分。

![cent_0](https://i.imgur.com/ZQAk4T3.png)

音分其實就是把半音再切成 100 份，刻度越小，越能精準的描述聲音的位置。當然，與半音相同都是對數單位，也能推算出每一音分是![](https://i.imgur.com/qHzRhXf.png)

![cent_1](https://i.imgur.com/9oOlIrY.png)

知道定義後，就能寫成算式啦。

```javascript=
getCentsOffFromPitch(f, note) {
  return Math.floor(1200 * Math.log(f / this.getFrequencyFromSemitone(note)) / Math.log(2))
}
```

### Demo

主要的算式，在上面也已經介紹到了。剩下的是一些顯示的小細節。例如：

```javascript=
getCentsOffStr() {
  return this.centsOff < 0
  ? Math.abs(this.centsOff) + ' b'
  : this.centsOff > 0
    ? Math.abs(this.centsOff) + ' #'
    : '-'
}
```

由於收到的音可能比標準音略高或略低，音分計算出來也可能會是正數或負數，在顯示時就需要注意。

其他部分就不贅述了，就直接來看結果吧～

[Live Demo](https://schaoss.github.io/web-audio/#/guitar-tuner-2.0)

![result](https://i.imgur.com/IsHo6Fh.png)

終於完成啦，歡迎讀者您也實際體驗看喔！

那麼今天就到這邊，大家明天見～

> ### 筆者
>
> ## Gary
>
> 半路出家網站工程師；半生熟的前端加上一點點的後端。
> 喜歡音樂，喜歡學習、分享，也喜歡當個遊戲宅。
>
> 相信一切安排都是最好的路。
