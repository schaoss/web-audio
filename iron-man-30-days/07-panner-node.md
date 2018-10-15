# 07. Web Audio API - 立體音效 2

接著昨天的話題，今天就來玩玩 PannerNode 及 AudioListener，並在最後做出一個可以藉由拖拉控制位置的程式應用範例～
同樣的，由於是立體音效，內文中的程式 Demo，建議佩戴耳機聆聽，效果比較好喔！

### PannerNode

PannerNode 的參數不少，除了指向性、最大傳遞距離、音源衰減速率等較基礎的設定外，也可以指定聲音在 3D 空間的衰減演算法，以及隨距離衰減的函式 (倒數、線性、自然對數)。

比較難理解的部分應該是，音源的內側角度、外側角度以及外側衰減率：

[![inner-cone & outer-cone](https://i.imgur.com/oP6Fv1D.png)](https://www.html5rocks.com/en/tutorials/webaudio/games/)

當聲音有了方向性時，由於聲波在傳遞時會產生 **繞射現象**，因此在主要傳遞方向的外緣，會有著較弱的聲波也在傳遞。內側角度指的是聲音傳播方向的中心角度，在這一區塊內聲音僅會因為距離而衰減。外側角度則是較弱的聲波區塊角度大小，在這一區塊聲音除了因為距離衰減外，也會因為距離內側較遠而衰減。而外側衰減率就是聲波在外側的衰減程度，越大衰減越快。搭配上圖應該就可以理解了。

其他更多的設定，可以參考 [這裡](https://webaudio.github.io/web-audio-api/#pannernode)，

### AudioListener

AudioListener 也就代表了使用者的位置，屬性也相對簡單。可以調整聽者定位、聆聽方向、速度等。
比較特別的是，**聲速** 以及 需不需要考慮 **[都普勒效應](https://zh.wikipedia.org/wiki/%E5%A4%9A%E6%99%AE%E5%8B%92%E6%95%88%E5%BA%94)** 也是在使用者身上設定。

另外，AudioListener 並不是 AudioNode，因此不需要透過 `connect` 方法和其他節點連結。

### Demo

由於 PannerNode 可以調整的部分蠻多的，今天先嘗試一下透過 `setPosition` 來定位，以及調整 `rolloffFactor` 讓聆聽效果明顯一些。AudioListener 則是只藉由拖拉調整定位，並未做其他的設定。

一如往常，先建立處理節點實體，並取得 AudioListener 物件：
```javascript=42
const panner = audioCtx.createPanner()
const listener = audioCtx.listener
```
以及與聽者&音源綁定的位置資料：
```javascript=56
draggingElem: '',
dragData: {
  listener: {
    x: 706,
    y: 428
  },
  source: {
    x: 413,
    y: 250
  }
}
```
接著是寫好拖拉事件的處理函式：
```javascript=92
setNoteConfig() {
  this.oscillator.type = this.waveType
  this.oscillator.frequency.value = this.frequency
  this.oscillator.detune.value = this.detune
  this.gainNode.gain.value = this.volume
  this.panner.setPosition(this.dragData.source.x, this.dragData.source.y, 1)
  this.listener.setPosition(this.dragData.listener.x, this.dragData.listener.y, 0)
},
onMouseDown(e) {
  this.draggingElem = e.target.id
  return
},
onMouseMove(e) {
  if (!this.draggingElem) {
    return
  }
  this.dragData[this.draggingElem].x = e.clientX - 25
  this.dragData[this.draggingElem].y = e.clientY - 25
  this.setNoteConfig()
}, 
onMouseUp() {
  this.draggingElem = ''
},
```
最後簡單設計一下 UI，並綁上資料及事件：
```htmlmixed=22
<div id="drag-area" data-role="drag-drop-container" @mouseleave="onMouseUp">
  <div id="listener"
    @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp" @mouseleave="onMouseUp"
    :style="{left: this.dragData.listener.x + 'px', top: this.dragData.listener.y + 'px'}"
  > 聽者 </div>
  <div id="source"
    @mousedown="onMouseDown" @mousemove="onMouseMove" @mouseup="onMouseUp" @mouseleave="onMouseUp"
    :style="{left: this.dragData.source.x + 'px', top: this.dragData.source.y + 'px'}"
  > 音源 </div>
</div>
```
>筆者寫到這邊時，真的深深感到 Vue 綁事件好方便 XD

其他部分的程式比較簡單就不提了，一路跟著做過來的話應該都可以輕鬆完成。

來看結果囉：

[Live Demo](https://schaoss.github.io/web-audio/#/panner-node)

![result](https://i.imgur.com/RpZSPqW.png)

大家可以玩玩看，感受一下音源 / 聽者移動時的效果吧！