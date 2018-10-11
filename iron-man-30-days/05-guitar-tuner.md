# 05. 吉他定音器 - Part.2

接著，今天就來把定音器完成吧！

依照昨天立定的計畫：

>練習做出 **可調整基準音** + **可設定調弦法** + **分別撥放單弦聲音** 的吉他定音器。

我們還需要一個切換調弦法的功能。

### 吉他常見調弦法

除了昨天有提到的標準調弦外，吉他常見的調弦法還有如下：

* Drop D（第六弦降全音）
* Open E（空弦音為 E 和弦）
* Open D（空弦音為 D 和弦）

那就先把這些調弦法整理成音高吧：
```javascript=126
const noteNameArr = {
    'standard' : ['E2','A2','D3','G3','B3','E4'],
    '1-step-down' : ['D2','G2','C3','F3','A3','D4'],
    'drop-d' : ['D2','A2','D3','G3','B3','E4'],
    'open-e' : ['E2','B2','E3','G#3','B3','E4'],
    'open-d' : ['D2','A2','D3','F#3','A3','D4']
}
```
接著，切出簡單的控制介面，例如調弦法：
```htmlmixed=13
<div class="item">
  <label for="tuning">調弦法 : <span></span></label>
  <select id="tuning" v-model="tuning" @change="changeTuningHandler">
    <option value='standard' selected>標準</option>
    <option value='1-step-down'>降全音</option>
    <option value='drop-d'>Drop D</option>
    <option value='open-e'>Open E</option>
    <option value='open-d'>Open D</option>
  </select>
</div>
```
音符按鈕：
```htmlmixed=29
<div id="notes">
  <div class="note" v-for="n in noteArr" :key="n" 
      @click="changeNoteHandler(n)">
    {{n}}
  </div>
</div>
```

以及相對應的事件處理函式：
```javascript=76
changeNoteHandler(note) {
  this.note = note
  this.frequency = this.getFrequency(this.getSemitone(note))
  this.setNoteConfig()
},
```

就這樣，第一個小範例完成啦～

![result](https://i.imgur.com/CnCZBfq.png)

[Live Demo]()

雖然只是簡單的吉他定音器，不過藉由這樣子的實作來熟悉新技術，多少還是富有樂趣及成就感的吧？那麼先到這邊，明天就繼續介紹其它Web Audio API的其他功能囉～