# 15. Web Audio API - 總整理

不知不覺這旅程也到一半了，讓我們稍微回顧一下目前我們聊到的東西吧。

[Live Demo](https://schaoss.github.io/web-audio)

![banner](https://i.imgur.com/5oewowO.png)

在開始之前，讀者您需要準備好開發環境，並對 Javascript 的語法、特性有基礎的認識，才能透過 Javascript 對音樂資料做處理。

- [基礎建設](https://ithelp.ithome.com.tw/articles/10202294)

我們介紹了不少 Web Audio API 的功能，從最簡單基礎的使用範例，一路到自訂處理結點的函式。其中我認為最重要的應該是 **節點關係**，清楚了 Web Audio API 的模組化結點觀念，其他的 API 介紹再參考其他篇內容，或是自行 Google、翻文件即可。

- [Web Audio API](https://ithelp.ithome.com.tw/articles/10202670)
- [Web Audio API - 基本介紹](https://ithelp.ithome.com.tw/articles/10202670)
- [Web Audio API - 節點關係](https://ithelp.ithome.com.tw/articles/10203026)
- [Web Audio API - 立體音效](https://ithelp.ithome.com.tw/articles/10204012)
- [Web Audio API - 3D 音源計算](https://ithelp.ithome.com.tw/articles/10204335)
- [Web Audio API - 音源 Part.1](https://ithelp.ithome.com.tw/articles/10204660)
- [Web Audio API - 音源 Part.2](https://ithelp.ithome.com.tw/articles/10204983)
- [Web Audio API - 分析結點](https://ithelp.ithome.com.tw/articles/10205296)
- [Web Audio API - 處理結點](https://ithelp.ithome.com.tw/articles/10206210)

![result](https://i.imgur.com/WAv7DZf.gif)

我們也實作了一些有趣的小功能，透過假想的需求，從實際運用 Web Audio API 的各項功能特性，到深入底層的演算法實作，逐步完成這些功能。

- [吉他定音器 Part.1](https://ithelp.ithome.com.tw/articles/10203302)
- [吉他定音器 Part.2](https://ithelp.ithome.com.tw/articles/10203618)
- [吉他調音器 Part.1](https://ithelp.ithome.com.tw/articles/10205612)
- [吉他調音器 Part.2](https://ithelp.ithome.com.tw/articles/10205911)
- [變聲器](https://ithelp.ithome.com.tw/articles/10206570)

當然，除了這些之外，Web Audio API 還有許多可玩又實用的功能例如：

- DelayNode：製作延遲效果
- ConvolverNode：製作空間感、殘響效果
- PeriodicWave：自訂振盪器使用的波形
- Channel：可以透過 ChannelSplitterNode、ChannelMergerNode 對音訊分割、合併。

但礙於篇幅，且使用方法相對單純，就先不在這邊討論了。

那麼 Web Audio API 的部分就在這邊告一段落啦～

---

明天將會開始本系列文的第二部分：**JavaScript 套件選集**；筆者預計挑選數個有趣的套件與各位分享，並透過這些套件做出實際的應用，敬請期待。

旅程仍會繼續，大家明天見！

> ### 筆者
>
> ## Gary
>
> 半路出家網站工程師；半生熟的前端加上一點點的後端。
> 喜歡音樂，喜歡學習、分享，也喜歡當個遊戲宅。
>
> 相信一切安排都是最好的路。
