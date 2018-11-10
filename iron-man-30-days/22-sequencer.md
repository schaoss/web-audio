# 22. 音序機 Part.2

其實，這個音序機在原本的鐵人三十天計畫中，大概只佔了一天的篇幅，但筆者寫著寫著就越寫越開心，不知不覺就玩開了，文章都不寫整天刻網站，啊哈哈哈哈哈。

今天就紀錄一下這個逐步玩開的過程 XD

### 隨機播放

測試時要一格一格按實在太麻煩了，於是就先寫了隨機 XD

```javascript=
random() {
  this.sequencer.drum = {
    kick: this.getRandomArray(16),
    hihat: this.getRandomArray(16),
    snare: this.getRandomArray(16),
    tomL: this.getRandomArray(16),
    tomM: this.getRandomArray(16),
    tomH: this.getRandomArray(16),
  }
}

...

getRandomArray(length) {
  return new Array(length).fill(0).map(() => Math.random() > 0.80)
},
```

簡單的說就是生成一組隨機內容的陣列，塞回原本的資料物件中。

> 這邊踩到一個有趣的 Javascript 雷，分享一下：
> `Array.map()` 在對陣列內每一個物件做遍盡時，會忽略值為 `undefined` 的資料，導致 `map()` 回傳的陣列長度與原始資料的長度不合。
>
> 為了解決這個問題，筆者這邊先將陣列用 `fill(0)` 塞滿，再做後續的處理。若讀者有更優雅的解法，煩請您抽空指點一二！

### BPM 調整

昨天我們完成了有著大鼓、Hi-Hat、小鼓、低中高三顆 Tom-Tom 的鼓機，但只有一種節奏速度怎麼可能滿足的了我們呢？

先前也提過，可以透過：

```javascript=
Tone.Transport.bpm.value = BPM
```

來改變 Transport 的速度。

> [BPM](<https://zh.wikipedia.org/wiki/%E9%80%9F%E5%BA%A6_(%E9%9F%B3%E6%A8%82)#%E9%87%8F%E5%BA%A6%E9%9F%B3%E6%A8%82%E9%80%9F%E5%BA%A6>)，即 beats per minute，每分鐘多少拍。

接著是要做一個可以控制輸入的 BPM 的介面，
透過 Vue 的資料綁定，可以簡單快速的做到這件事情，就不贅述囉～

![BPM](https://i.imgur.com/NaMwTmh.png)

### 當前拍點標示

有了 BPM 調整，當然要提示一下當然進行到哪裡囉。

我們先前在設定 Tone.js 的 Transport 時，已經在程式碼中宣告了 `index`，這邊因應拍號調整的功能，要稍微更換一下實作方式：

```javascript=
Tone.Transport.scheduleRepeat((time) => {
  this.index = ++this.index % 16
  ...
}, "16n")
```

這樣，透過 Vue 的資料綁定，就可以快速做完拍點標示啦！

```html
<div id="timeLine">
  <div v-for="i in 16" :key="`time_${i}`" :class="{'time': true, 'active': index === i-1 }" />
</div>
```

在實作這邊時，我設定當 active 時會更換高度及背景色：

```css
.time {
  width: 6%;
  height: 5px;
  background-color: #ff5733;
  opacity: 0.2;
  margin: 5px 0;
  border-radius: 5px;
  transition: all 0.1s;
}
& .active {
  height: 10px;
  opacity: 1;
}
```

結果在第一拍時會意外的爆版，整個時間軸會一起跳一下...
不過看起來效果也蠻好的，就留下了 XD

![css](https://i.imgur.com/Hwix494.gif)

### 旋律樂器

有了節奏，接著就來加入旋律吧！

這邊利用 Tone.js 的 `PolySynth` 來一次完成一整組音源的建立：

```javascript=
const poly = new Tone.PolySynth(8, Tone.Synth, {
  oscillator: {
    type: 'triangle'
  },
  envelope: {
    attack: 0.001,
    decay: 0.1,
    sustain: 0.3,
    release: 0.02
  }
}).toMaster()
```

同樣透過資料驅動聲音的觸發

```javascript=
...
if(lead[0][i]) this.poly.triggerAttackRelease("C4", "16n", time)
if(lead[1][i]) this.poly.triggerAttackRelease("D4", "16n", time)
if(lead[2][i]) this.poly.triggerAttackRelease("E4", "16n", time)
...
```

接著在畫面上加上切換分頁的按鈕，就完成囉～

最後的程式放在這邊：

[Live Demo](https://schaoss.github.io/web-audio/#/sequencer)

![result](https://i.imgur.com/mvDgJTa.gif)

大家可以上去玩玩看喔～

> 今天要特別感謝同事 [Adam](https://ithelp.ithome.com.tw/users/20111956/ironman/1784) & [Carol](https://ithelp.ithome.com.tw/users/20111500/ironman/1788)，他們在下班後仍然願意幫忙構想漸層的實作，甚至協助到十一點多。在最後也順利完成我提的這種腦洞大開的要求，真的非常非常感謝 XD
>
> 透過兩個偽元素做出假邊框，讓點擊區域可以用簡短的 css 語法做到這樣的連續漸層，有興趣的朋友可以稍微看一下點擊區域的 css 喔 XD

那麼今天就先這樣啦，我們明天見～

> ### 筆者
>
> ## Gary
>
> 半路出家網站工程師；半生熟的前端加上一點點的後端。
> 喜歡音樂，喜歡學習、分享，也喜歡當個遊戲宅。
>
> 相信一切安排都是最好的路。
