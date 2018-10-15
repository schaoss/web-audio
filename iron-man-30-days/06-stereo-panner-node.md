# 06. Web Audio API - 立體音效

今天要來介紹 Web Audio API 裡的 StereoPannerNode。由於是立體音效，內文中的範例及程式 Demo，都建議佩戴耳機聆聽，效果比較好喔！

### 立體音效

為什麼當我們聽到聲音時，能夠知道聲音的來向呢？因為音源到兩耳的距離不同，收到的音量、頻率不同，大腦就能夠藉由這些微小的差異，推測出聲音的來向了；反過來說，我們也可以利用刻意製造出的這些不同，讓聲音聽起來有立體沉浸感。

這邊提供一個環繞音效測試影片的範例：

[![youtube](https://img.youtube.com/vi/PvnlpPWAcZc/0.jpg)](https://www.youtube.com/watch?v=PvnlpPWAcZc)

那麼，在 Web Audio API 中，要如何製作這樣的效果呢？

### 雙聲道效果：StereoPannerNode

StereoPannerNode 是個功能相對簡單的節點，只有一個參數 `pan`，用來調整左右聲道音量平衡。
就直接來用用看吧。

跟其他的 AudioNode 一樣，先建立一個 stereoPanner 實體：

```javascript=52
const stereoPanner = audioCtx.createStereoPanner() // 雙聲道節點
```

透過 `connect` 方法與其他節點連接：

```javascript=102
this.oscillator.connect(this.gainNode)
this.gainNode.connect(this.stereoPanner)
```

```javascript=86
play() {
  this.stereoPanner.connect(this.audioCtx.destination)
},
stop() {
  this.stereoPanner.disconnect(this.audioCtx.destination)
},
```

然後，刻一個控制數值的介面，並在改變數值時，將數值設定回節點上：

```htmlmixed=
<div class="audio-note">
  <h3><span>雙聲道節點</span></h3>
  <div class="item">
    <label for="pan">pan : <span>{{pan}}</span> </label>
    <input type="range" min="-1" max="1" step="0.01" id="pan" v-model="pan" @input="changeHandler">
  </div>
</div>
```

```javascript=97
this.stereoPanner.pan.value = this.pan
```

可以來試驗雙聲道效果囉～

[Live Demo](https://schaoss.github.io/web-audio/#/stereo-panner-node)

![result](https://i.imgur.com/8INAXQP.png)

有了左右聲道的調整，就可以做出一些好玩的東西了吧？但現實中，聲音並不是只有單方向的移動，只有這樣的設定，應用上也很受侷限。那麼我們還需要另一個節點來做到更多事情。

### 3D 空間音源計算：PannerNode

PannerNode 的參數就多得多了，可以設定音源位置、指向、移動速度、最大傳遞距離、衰減演算法等等，可以參考 **[這裡](https://webaudio.github.io/web-audio-api/#pannernode)**

既然可以指定音源的座標，那聆聽者的座標也就變成必備資訊了；可以透過 `context.listener` 來取得 AudioListener，進而設定位置、移動方向、速度等資訊。

今天先到這邊，明天我們來玩玩看 PannerNode 及 AudioListener 的各種設定吧～
