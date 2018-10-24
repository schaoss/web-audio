# 11. 吉他調音器 Part.1

上周我們用振盪器當音源，並用那時候玩到的的東西，做出了可以設定基準音，可以調整定弦法，可以單獨撥放各弦單音的吉他定音器。

現在學會了怎麼取得麥克風音訊，我們來挑戰一下做出吉他調音器吧！

在吉他定音器的實作，我們聊到了如何從已知的吉他定弦音名出發，計算出 MIDI 半音編號，以及如何由半音計算回頻率，並將對應的頻率播放出來。現在則是要將整個流程反過來：由麥克風收音，取得頻率，換算成 MIDI 半音編號，最後將半音換算回音名。

![flow](https://i.imgur.com/Szp0uAs.png)

由聲音取得頻率的這一步，可以說是最困難的。由於音波的特性，當音源震動發出聲音時，除了 [基音](https://zh.wikipedia.org/wiki/%E5%9F%BA%E6%9C%AC%E9%A0%BB%E7%8E%87) 外，還有一系列的 [泛音](https://zh.wikipedia.org/wiki/%E6%B3%9B%E9%9F%B3) 會同時產生，且彼此之間會相互疊加、干涉，加上聲音取樣時往往會同時取到背景雜訊。更別說在複音、和弦等複雜音源的情況時，要正確取得音高就更加艱難了。

> 參照 [wiki 的基音檢測算法](https://zh.wikipedia.org/wiki/%E5%9F%BA%E9%9F%B3%E6%AA%A2%E6%B8%AC%E7%AE%97%E6%B3%95)。

不過以吉他調音器這樣的需求來說，應該只需要針對單一音源做抓取音高，在相對簡單的環境條件之下，還是有辦法成功判斷音高的！

### 抓取音高

我們可以假想一個某頻率的音波，大概會長這樣：

![sin-0](https://i.imgur.com/r2KBOPs.png)

在一秒寬的時間區間內，進行採樣：

![sin-1](https://i.imgur.com/XKQp3rh.png)

接著對採樣遍盡所有可能的波長，將最可能的波長換算成頻率，就能找出最接近的基音為何。

![sin-2](https://i.imgur.com/yab4f61.png)

要怎麼找到最可能的波長呢？

先考慮找到正確的波長時會發生什麼事情：

![sin-3](https://i.imgur.com/ZMi1i5M.png)

如上圖，當 offset 恰好為波長時，兩者的數值會相等，相減為零。

但實際情況很難真的為零。由於需考慮到在聲音由類比轉數位訊號時，採樣的不連續性，即使採樣頻率再高，都還是可能會造成些微的誤差。因此我們需要用這組 offset 對整個採樣區間重複測試，計算差值的總和再平均，找出各種 offset 情況下最小的均差和，就是可能的波長了。

整理成步驟大概如下：

0. 假設相鄰兩採樣點的寬度計為 w，第幾次進行計算計為 n，總採樣次數為 M。
1. 取相距 n \* w 的兩採樣點的數值，相減後取絕對值，知道兩者之間的數值差 d。
1. 不斷重複，直到計算完整個採樣區間。
1. 將數值差加總，除以總採樣次數，得到波長為 w 時的誤差值 D。
1. 重複 1 ~ 3，在 n > M/2 之前找到最小的 D，該組即為最可能的波長 L。
1. 將總採樣次數 M 除以波長 L，就能得到頻率了。

那麼，來實作看看吧！

### Demo

首先是取得資料。
一樣要透過 analyser 抓取，但不同於昨天的是。要使用 時域 的資料。

```javascript=
getMicData(){
  this.timeArray = new Float32Array(this.analyser.fftSize)
  this.analyser.getFloatTimeDomainData(this.timeArray)
  if (this.isPlaying) requestAnimationFrame(this.getMicData)
},
```

接著，定義最大間隔，以及滿意的相關係數：

```javascript=
const MAX_SAMPLES = this.timeArray.length / 2
const GOOD_ENOUGH_CORRELATION = 0.9
```

由於需要重複測試才能判斷正確波長，故只能做到資料長度的一半。

考慮可能只收到背景雜訊，當訊號總量太少時忽略計算：

```javascript=
if (this.timeArray.reduce((rms, d) => (rms += d ** 2), 0) < 0.01) return -1
```

開始迴圈遍盡，找出可能的波長：

```javascript=
for (let offset = 0; offset < MAX_SAMPLES; offset++) {
  let correlation = 0

  for (let n = 0; n < MAX_SAMPLES; n++) {
    correlation += Math.abs(this.timeArray[n] - this.timeArray[n + offset])
  }

  correlation = 1 - correlation / MAX_SAMPLES // 相關係數
  correlations[offset] = correlation

  // 當找到可接受的結果的時
  if (correlation > GOOD_ENOUGH_CORRELATION && correlation > last_correlation) {
    foundGoodCorrelation = true
    if (correlation > best_correlation) {
      best_correlation = correlation
      best_offset = offset
    }
  } else if (foundGoodCorrelation) {
    // 前一組為足夠好的結果，而當前的不夠好時，透過內插法，估算更精準的 offset
    const shift =
      (correlations[best_offset + 1] - correlations[best_offset - 1]) /
      correlations[best_offset]
    return Math.round(this.audioCtx.sampleRate / (best_offset + 8 * shift))
  }
  // 不接受的結果
  last_correlation = correlation
}
```

完整的函式如下：

```javascript=
getInputFrequency() {
  const MAX_SAMPLES = this.timeArray.length / 2
  const GOOD_ENOUGH_CORRELATION = 0.9
  const correlations = new Array(MAX_SAMPLES)
  let best_offset = -1
  let best_correlation = 0
  let last_correlation = 1
  let foundGoodCorrelation  = false // 旗標 紀錄找到好的結果沒

  if(this.timeArray.reduce((rms, d) => rms += d ** 2, 0) < 0.01) return -1

  for(let offset = 0; offset < MAX_SAMPLES; offset++) {
    let correlation = 0
    for(let n = 0; n < MAX_SAMPLES; n++) {
      correlation += Math.abs((this.timeArray[n])-(this.timeArray[n + offset]))
    }
    correlation = 1 - (correlation / MAX_SAMPLES) // 相關係數
    correlations[offset] = correlation

    if ((correlation > GOOD_ENOUGH_CORRELATION) && (correlation > last_correlation)) {
      // 當找到足夠好的結果的時候
      foundGoodCorrelation = true
      if (correlation > best_correlation) {
        best_correlation = correlation
        best_offset = offset
      }
    } else if (foundGoodCorrelation) {
      // 前一組為足夠好的結果，且當前的不夠好時
      const shift = (correlations[best_offset + 1] - correlations[best_offset - 1]) / correlations[best_offset];
      return Math.round(this.audioCtx.sampleRate / (best_offset + (8 * shift)))
    }
    // 不好的結果
    last_correlation = correlation
  }
  if (best_correlation > 0.01) {
    return Math.round(this.audioCtx.sampleRate / best_offset)
  }
  return -1;
},
```

看看結果～

![result](https://i.imgur.com/OUHbD8U.gif)

明天就接著今天的進度，把其他的部分也實作出來吧！

> 今天的抓取音高演算法，是筆者參考了 [PitchDetect](https://github.com/cwilso/PitchDetect) 並理解後的重新實作。如有不清楚，歡迎與我聯繫提問；當然，如果有筆者我理解錯誤的地方，也煩請讀者您不吝告知。

&nbsp;

> ### 筆者
>
> ## Gary
>
> 半路出家網站工程師；半生熟的前端加上一點點的後端。
> 喜歡音樂，喜歡學習、分享，也喜歡當個遊戲宅。
>
> 相信一切安排都是最好的路。
