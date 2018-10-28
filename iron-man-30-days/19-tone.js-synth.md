# 19. Tone.js - 合成器

今天就來探索 Tone.js 的核心功能 - 合成器

回顧一下這幾天一直使用的範例：

```javascript=
const synth = new Tone.Synth().toMaster()
```

這邊就是宣告一個合成器，並把他連接到播放裝置上，後續只要透過特別的方法例如：

```javascript=
synth.triggerAttackRelease('C4', '8n')
```

就可以播放指定的音高了。

### Attack、Decay、Sustain、Release

在合成器音效裡，可以透過 **Attack、Decay、Sustain、Release** 這四個參數，來指定聲音的振幅變化；藉由這些參數造成的變化，創作者可以更容易的模仿、創造想要的聲響效果。

![ADSR](https://i.imgur.com/tfok6De.png)

> 有興趣的讀者，可以參閱 [wiki](https://en.wikipedia.org/wiki/Synthesizer)。

參考上圖，縱軸是音波的震幅，而橫軸是時間。ADSR 四個參數分別代表了 ADR 三階段的持續時間，以及 S 階段的振幅比率。

如果我們想要指定 ADSR 的參數給 Tone.js 的合成器，可以透過例如：

```javascript=
const synth = new Tone.Synth({
  oscillator: {
    type: 'fmsquare',
    modulationType: 'sawtooth',
    modulationIndex: 3,
    harmonicity: 3.4
  },
  envelope: {
    attack: 0.001,
    decay: 0.1,
    sustain: 0.1,
    release: 0.1
  }
})
```

提供一個參數物件的方式塞入設定。

如果在程式執行階段，想要改變設定，則要透過`synth.set()` 來變更原先的設定。

Synth 預設的設參數如下：

```json=
{
  "oscillator": {
    "type": triangle
  },
  "envelope": {
    "attack": 0.005,
    "decay": 0.1,
    "sustain": 0.3,
    "release": 1
  }
}
```

在前述的例子，我們透過 `triggerAttackRelease()` 來播放指定的音高與音長。而如果是未知長度的音長，我們也可以透過呼叫 `triggerAttack()`，讓聲音經過 Attack、Decay 延續在 Sustain 的階段，再透過程式呼叫 `triggerRelease()`，讓聲音進入 Release 階段釋放。

在 Tone.js 中，也提供了數個包裝設定好的合成樂器供開發者使用。例如 `MetalSynth` 可以發出金屬質感的聲響，`MembraneSynth` 則可以做出如大鼓、[tom-tom](https://zh.wikipedia.org/wiki/%E7%AD%92%E9%BC%93) 之類的打擊樂聲。

### 取樣機

如果有特定樂器、部分音高的現成音檔，也可以透過 `Sampler()` 來將其作成合成樂器。

```javascript=
const sampler = new Tone.Sampler({
	"C3" : "path/to/C3.mp3",
	"D#3" : "path/to/Dsharp3.mp3",
	"F#3" : "path/to/Fsharp3.mp3",
	"A3" : "path/to/A3.mp3",
}, onLoadFunc, 'baseUrl')

...

sampler.triggerAttackRelease("D3")
```

取樣機會自動從提供的音檔計算出指定音高的聲音

### 複音

但一般的合成樂器，同一時間都只能發出一個聲音，如果有需求要同時播放多個單音，可以透過`PolySynth()` 來快速複製設定好的合成器，並一次播放數個音符。例如：

```javascript=
const synth = new Tone.Synth({
  ...
})
const polySynth = new Tone.PolySynth(6, synth).toMaster()
polySynth.triggerAttackRelease(["C4", "E4", "G4"], "4n")
```

這樣就可以播放出一個 C 和弦啦～

> `PolySynth()` 的第一參數是最多同時播放的數量，第二參數則接收一個合成器。

![](https://i.imgur.com/KXe4v0u.png)

那麼，今天關於 Tone.js 合成器的介紹就到這邊啦。可以看到 Tone.js 已經幫我們將音源、處理節點做好了包裝，讓創作者、開發者只需要專注在揮灑創意上，真的很方便！

明天我們會接著介紹另一項 Tone.js 的核心功能 - 排程，敬請期待！

> ### 筆者
>
> ## Gary
>
> 半路出家網站工程師；半生熟的前端加上一點點的後端。
> 喜歡音樂，喜歡學習、分享，也喜歡當個遊戲宅。
>
> 相信一切安排都是最好的路。
