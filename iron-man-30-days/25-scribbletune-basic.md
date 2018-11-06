# 25. Scribbletune - 功能介紹

[昨天](day24待補) 我們一起認識了 Scribbletune 這個有趣的套件，如果你還沒看過昨天的文章，可以先去看完再回來喔～

參考一下昨天最後使用的範例：

```javascript=
Scribbletune.clip({
  synth: 'PolySynth',
  notes: 'F#m C#m DM Bm EM AM DM C#m AM',
  pattern: '[xx][x-]'
}).start()

Tone.Transport.start()
```

我們就透過這個範例來仔細端詳一下 Scribbletune 吧～

### Clip

Clip 是 Scribbletune 中的基本單位，我們可以像上例那樣的透過`clip({ option })` 去建立它。

#### synth

有好好跟著旅程一路走到這的讀者們一定不陌生，沒錯這就是 Tone.js 的合成器。

可以參考 Scribbletune 的 [原始碼](https://github.com/scribbletune/scribbletune/blob/060484793c6c8d139fdc8a588c11a87093554098/src/browserClip.js#L123)：

```javascript=
...
if (params.synth) {
  // This implies, the synth is probably being hand created by the user with an available Tone synth
  params.instrument = new Tone[params.synth]();
}
...
```

可以接受的屬性值就是 Tone.js 提供已經包裝好的各式合成器。

#### notes

notes 這個屬性是用來指定一組準備要用來播放的音名或和弦名；它接受一個字串或一組陣列。

由於 Scribbletune 內包裹了 tonal 的強大計算功能，notes 的設定也就充滿著彈性：

例如最簡單的指定音名：

```javascript=
notes: 'c4 d4 e4 f4 g4 a4 b4 c5'
```

特定的調式音階：

```javascript=
notes: Scribbletune.scale('c4 ionian')
```

或是像前述範例那樣，給予和弦名稱：

```javascript=
notes: 'F#m C#m DM Bm EM AM DM C#m AM'
```

甚至給予指定調的級數和弦：

```javascript=
notes: Scribbletune.progression.getChords('C4 major', 'I IV V ii')
```

是不是很方便啊～

#### pattern

Scribbletune 中定義了一組超簡單的節奏標記方式，利用三種符號：

- x：播放
- \_：延長前一次撥放
- \-：暫停

以及利用中括號（[ ]）表示拍值減半，這樣就能標記出各式節奏囉！

例如官網範例的：

```javascript=
x__-x__-x__-x__-
```

就會得到如圖所示的節奏型態：
![pattern](https://i.imgur.com/zl7Ma7V.png)

而昨天的範例：

```javascript=
notes: 'F#m C#m DM Bm EM AM DM C#m AM'
pattern: '[xx][x-]'
```

將 notes 及 pattern 結合起來，表達出的就會是

> || F#m C#m D --- || Bm E A --- || D C#m A --- ||

是不是很簡單啊～

那麼來做個小練習吧～

```javascript=
Scribbletune.clip({
  synth: 'PolySynth',
  notes: Scribbletune.progression.getChords('D major', 'I V vi iii IV I ii V'),
  pattern: 'x---'
}).start()

Tone.Transport.start()
```

這樣就會循環撥放卡農順階和弦囉 XD

[![youtube](https://img.youtube.com/vi/DRgl-2EOyTI/0.jpg)](https://www.youtube.com/watch?v=DRgl-2EOyTI)

> 如果你不知道卡農是什麼，點圖片或 [這裡](https://www.youtube.com/watch?v=DRgl-2EOyTI) 來聽聽看。

那麼今天的介紹就到這邊，大家先聽個卡農，我們明天見～

> ### 筆者
>
> ## Gary
>
> 半路出家網站工程師；半生熟的前端加上一點點的後端。
> 喜歡音樂，喜歡學習、分享，也喜歡當個遊戲宅。
>
> 相信一切安排都是最好的路。
