# 28 Rythm.js

最後一個套件，來個歡樂、輕鬆、簡單又有點ㄎㄧㄤ的套件吧 XD

### 這是什麼？

[Rythm.js](https://github.com/Okazari/Rythm.js) 是個可以讓網頁依據指定音檔的高低起伏，隨之舞動的套件，透過特定的 css class 名稱，以及簡單的 Javascript 設定，就可以讓畫面上的各個元素變化，非常好玩 XD

[![Rythm.js](https://i.imgur.com/iE8USA5.gif)](https://okazari.github.io/Rythm.js/)

> 對沒錯，這就是 [他們的文件](https://okazari.github.io/Rythm.js/) XDDD

### 為什麼要玩這個？

透過簡單的設定，就可以畫面跟著董茲董茲，你不覺得很酷嗎～
~~好啦其實只是因為很ㄎㄧㄤ很好笑 XDDD~~

### 功能有哪些？

Rythm.js 提供了數種包裝好的動態效果，使用上可以直接透過 class 綁定至元素上，或是由 Javascript 綁定；另外創作者也可以自行定義動態效果，並給予 class 名稱，使用上方便又富有彈性！

![Neon](https://i.imgur.com/g0q1HpY.gif)

### 怎麼用啊？

首先當然是安裝套件：

```cs
yarn add rythm.js

or

npm i rythm.js
```

接著在欲使用的頁面引用，並宣告它：

```javascript=
import Rythm from 'rythm.js'

const rythm = new Rythm()
rythm.setMusic('path/to/sample.mp3')
rythm.start()
```

當然，記得幫想要跳動的 DOM 元素綁上 class name：

```html=
<div class="rythm-bass"></div>
<div class="rythm-medium"></div>
<div class="rythm-high"></div>
```

> 分別對應到低、中、高三種頻段。

這樣就完成最基本的設定啦～

如果想要更多的動態效果，也可以透過 Javascript 分別設定：

```javascript=
/* Add your own rythm-class
 * @elementClass: Class that you want to link your rythm to
 * @danceType: Use any of the build in effect or give your own function
 * @startValue: The starting frequency of your rythm
 * @nbValue: The number of frequency of your rythm
 * 1024 Frequencies, your rythm will react to the average of your selected frequencies.
 * Examples: bass 0-10 ; medium 150-40 ; high 500-100
 */
rythm.addRythm(elementClass, danceType, startValue, nbValue)
```

> 摘自 [Github 的 API 說明](https://github.com/Okazari/Rythm.js#api-documentation)
>
> danceType 可以參照前述的 [文件](https://okazari.github.io/Rythm.js/)。

這樣就能使用自行定義的效果囉～

以上就是今天的 Rythm.js 介紹啦～

> ### 筆者
>
> ## Gary
>
> 半路出家網站工程師；半生熟的前端加上一點點的後端。
> 喜歡音樂，喜歡學習、分享，也喜歡當個遊戲宅。
>
> 相信一切安排都是最好的路。
