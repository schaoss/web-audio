# 16. Javascript 音樂漫遊 - tonal

昨天結束了 [Web Audio API](DAY15待補) 的部分，那麼我們的旅程又是全新的開始啦～

Javascript 的音樂相關套件其實不少，Github 上數千顆星星的比比皆是，但許多套件以及後續的實作，或多或少都需要今天要介紹給讀者您的套件 - [tonal](https://github.com/danigb/tonal)

### 這是什麼？

tonal 是一個專注在 **樂理** 的套件，它提供了各種音樂相關的計算函數；包含計算音程、計算半音編號、查詢和弦組成、查詢調式音階等等。

線上展示可以到他們的 [網站](https://danigb.github.io/tonal-app) 看看。

![tonal](https://i.imgur.com/wq2AzPP.png)

### 為什麼要玩這個？

因為樂理的計算稍嫌麻煩。例如我們先前自行實作的計算半音編號、計算頻率、計算音程差等等，已經有套件幫我們做好所有的計算，供你任意查詢使用，是不是很方便呢～

另外，一些音樂套件的實作，都會依賴類似 tonal 的樂理套件，將文字解析後再加以變化運用。所以在這邊先稍微熟悉一下 tonal 的樂理描述方式，以利後續其他套件的使用。

### 功能有哪些？

可以參考 [官方文件](http://danigb.github.io/tonal/api/index.html)，如同前面所述，全部都是簡單的 Function，要用什麼功能也都很直觀。

基本的例如 半音編號轉音高、音高轉半音編號，複雜一點的例如 組成音查詢和弦名稱、查詢某音符上升特定距離後的音高、查詢某調性順階和弦 等等，基本上想得到的樂理查詢計算大都備齊了。

### 怎麼用啊？

首先是在專案內安裝套件：

```cs
yarn add tonal
```

接著在要使用的地方引用需要的模組：

```javascript=
import { transpose, Scale, Key } from 'tonal'

transpose('d4', '3M')
// 'F#4'

Scale.notes('Bb lydian')
// [ 'Bb', 'C', 'D', 'E', 'F', 'G', 'A']

Key.chords('A major')
// ["AMaj7", "Bm7", "C#m7", "DMaj7", ...]
```

就這麼簡單，簡單到筆者有點心虛。

### Demo

由於這個套件比較抽象，提供的功能都是樂理上的查詢與計算，使用上可以搭配其他套件一同使用。

筆者在蒐集資料時，找到了這個完整的[應用範例](https://jonathangjertsen.github.io/songwriting_tools/)，是 tonal 與 Tone.js 的結合，對互動音樂有興趣的讀者們可以參考看看：

[![songwriting_tools](https://i.imgur.com/FVE4Aod.png)](https://jonathangjertsen.github.io/songwriting_tools/)

那麼今天就先這樣囉～

> ### 筆者
>
> ## Gary
>
> 半路出家網站工程師；半生熟的前端加上一點點的後端。
> 喜歡音樂，喜歡學習、分享，也喜歡當個遊戲宅。
>
> 相信一切安排都是最好的路。
