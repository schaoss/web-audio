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
透過 Vue 的資料綁定，可以簡單快速的做到這件事情，就不贅述了 XD

![BPM](https://i.imgur.com/NaMwTmh.png)

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

### 分享功能

筆者邊寫邊測試，玩著玩著，就覺得自己隨機出來的節奏也太好聽了吧，於是就寫了分享功能 XDD

大方向是想把資料組成 url 的 query，方便傳遞。

第一步是轉成 query，這邊透過了 Vue 的 `wacth` 功能，監聽資料陣列：

```javascript=
watch: {
  BPM: {
    handler(bpm) {
      if(bpm > 180) bpm = 180
      else if(bpm < 60) bpm = 60
      this.BPM = bpm
      Tone.Transport.bpm.value = bpm
      const { d, l } = this.$route.query
      this.$router.replace({path: '/sequencer', query: { bpm, d, l }})
    }
  },
  sequencer: {
    handler(v) {
      const { drum, lead, bass } = v
      const d = [
        getHexQueryString(drum.kick),
        getHexQueryString(drum.hihat),
        getHexQueryString(drum.snare),
        getHexQueryString(drum.tomL),
        getHexQueryString(drum.tomM),
        getHexQueryString(drum.tomH),
      ].join('-')
      const l = lead.map(row =>
        getHexQueryString(row)
      ).join('-')
      const { bpm = 120 } = this.$route.query
      this.$router.replace({path: '/sequencer', query: { bpm, d, l }})
    },
    deep: true
  }
},

...

getHexQueryString(arr) {
  return Number.parseInt(arr.map(i => ~~i).join(''), 2).toString(16).padStart(4, 0)
},
```

> 由於一橫排有 16 格，每一格狀態都需要被儲存；為減少 url 長度，這邊把資料轉換成 16 進位的資料。
> e.g.
>
> - bpm = 100
> - d = 0a02-6e66-aaaa-0a02-5145-8028
> - l = 8804-3042-8884-0252-8008-0210-0004

可以把資料用 query 傳遞了，接著是要在程式初始化時接收資料：

```javascript=
const { bpm = 120, d = '', l = '' } = this.$route.query
const sequencer = (() => {
  //鼓機
  const dArr = d.split(/-/)
  const drum = {
      kick: this.getInitQueryData(dArr[0]),
      hihat: this.getInitQueryData(dArr[1]),
      snare: this.getInitQueryData(dArr[2]),
      tomL: this.getInitQueryData(dArr[3]),
      tomM: this.getInitQueryData(dArr[4]),
      tomH: this.getInitQueryData(dArr[5]),
  }

  //旋律
  const lArr = l.split(/-/)
  const lead = [
    this.getInitQueryData(lArr[0]),
    this.getInitQueryData(lArr[1]),
    this.getInitQueryData(lArr[2]),
    this.getInitQueryData(lArr[3]),
    this.getInitQueryData(lArr[4]),
    this.getInitQueryData(lArr[5]),
    this.getInitQueryData(lArr[6]),
  ]

  return {
    drum,
    lead
  }
})()

...

getInitQueryData(hexStr) {
  return hexStr
    ? Number.parseInt(hexStr, 16).toString(2).padStart(16).split('').map(i => ~~i)
    : this.getEmptyArray(16)
},
```

透過 Vue-Router 自動傳遞的 $route，可以快速地拿到 url 內 query 的資料，在將其解開回陣列就可以囉～

最後的結果在這裡：

[Live Demo](https://schaoss.github.io/web-audio/#/sequencer?bpm=100&d=0a02-6e66-aaaa-0a02-5145-8028&l=8804-3042-8884-0252-8008-0210-0004)

![result](https://i.imgur.com/n5mT4gQ.png)

讓我玩了一周的音序機，雖然還有很多地方要改進，不過就先到這邊吧
XD

最後要特別感謝同事 [Adam](https://ithelp.ithome.com.tw/users/20111956/ironman/1784) 大神，他在下班後仍然願意幫忙、協助到十一點多，並成功完成我提的這種腦洞大開的要求，真的非常非常感謝 XD

> 透過兩個偽元素做出假邊框，讓這邊的顯示可以用簡短的 css 語法做到這樣的連續漸層，有興趣的朋友可以稍微看一下點擊區域的 css 喔 XD

那麼今天就先這樣啦，我們明天見～

> ### 筆者
>
> ## Gary
>
> 半路出家網站工程師；半生熟的前端加上一點點的後端。
> 喜歡音樂，喜歡學習、分享，也喜歡當個遊戲宅。
>
> 相信一切安排都是最好的路。
