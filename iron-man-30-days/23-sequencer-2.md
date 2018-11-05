# 23. 音序機 Part.3

欸對，就是音序機的第三天。
一個不小心玩得太開心，就又長出了一些功能，一起來看看吧～

### 點擊 & 觸碰事件

一格一格點實在太慢了，還是來仿照前人的智慧，寫個點擊拖曳觸發吧～

先前在 [Web Audio API - 3D 音源計算](https://ithelp.ithome.com.tw/articles/10204335) 中，我們也做了一次點擊拖曳事件，不同的是這次要把 function 註冊在 `onMouseEnter` 事件上，當滑鼠移動時才不會連續觸發：

```javascript=
mousedown() {
  this.isDraging = true
},
mouseenter(arr, i) {
  if (!this.isDraging) {
    return
  }
  this.clickHandler(arr, i)
},
mouseup() {
  this.isDraging = false
},
```

觸碰事件則比較麻煩，由於沒有 `onTouchEnter`、`onTouchOut` 等事件，只能監聽 `onTouchMove`，從事件物件中取出當前座標，再尋找該座標的元素：

```javascript=
touchstart(e) {
  this.isDraging = true
  this.touchTarget = e.target.getAttribute('name')
},
touchmove(e) {
  if (!this.isDraging) {
    return
  }
  const { clientX, clientY } = e.targetTouches[0]
  const name = document.elementFromPoint(clientX, clientY).getAttribute('name')
  if (name) {
    if (name !== this.touchTarget) {
      this.touchTarget = name
      const tmpArr = name.split('_')
      if (tmpArr[0] === 'lead') {
        this.clickHandler(this.sequencer.lead[tmpArr[1]], tmpArr[2])
      } else {
        this.clickHandler(this.sequencer.drum[tmpArr[0]], tmpArr[1])
      }
    }
  }
  e.preventDefault()
},
touchend() {
  this.isDraging = false
  this.touchTarget = ''
}
```

這樣就完成點擊 & 觸碰的事件處理囉～

![drag](https://i.imgur.com/3uoH8CV.gif)

### 分享功能

筆者邊寫邊測試，玩著玩著，就覺得自己瞎點出來的節奏也太好聽了吧，好想丟給別人聽喔！於是就寫了分享功能 XDD

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

透過 Vue-Router 自動傳遞的 $route，可以快速地拿到 url 內 query 的資料，在將其解開回陣列就可以啦～

最後，完整的音序機在這裡：

[Live Demo](https://schaoss.github.io/web-audio/#/sequencer?bpm=100&d=0a02-6e66-aaaa-0a02-5145-8028&l=8804-3042-8884-0252-8008-0210-0004)

![result](https://i.imgur.com/n5mT4gQ.png)

讓我玩了一周的音序機，雖然還有很多地方要改進，不過就先到這邊吧，不然可能要一路玩到三十天完賽了 XD

明天又是新的開始囉，大家明天見～

> ### 筆者
>
> ## Gary
>
> 半路出家網站工程師；半生熟的前端加上一點點的後端。
> 喜歡音樂，喜歡學習、分享，也喜歡當個遊戲宅。
>
> 相信一切安排都是最好的路。
