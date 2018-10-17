馬上要開始介紹 Web Audio API 了，總要有個網站來呈現各種內容吧；既然要學東西，那就順便把不熟的 Vue 架起來玩一玩囉！

### 開始之前

筆者預期讀者您已經準備好 [Node.js](https://nodejs.org) 及 套件管理工具 (npm / yarn)，並能理解 [ES6](https://eyesofkids.gitbooks.io/javascript-start-from-es6) 的語法。而 [Vue](https://vuejs.org/) 相關的語法，由於本文主軸不在這邊，且大部分不太影響閱讀，筆者不會刻意介紹。

### Vue

前陣子 Vue Cli 3 推出了，增加了 UI 介面，讓不熟悉命令列的開發者可以透過 UI 勾勾選選快速建置專案，真的非常方便！不過這邊不會使用 UI 介面，而是使用傳統的 cli 指令完成

![Vue](https://i.imgur.com/cbkcFe1.png)

#### 安裝

首先是安裝 Vue Cli。在安裝前，先確認你的電腦已經有安裝好 `node` & `npm`/`yarn`，隨後在終端機輸入：

```cs
yarn global add @vue/cli
```

接著是開啟專案，只要輸入：

```cs
vue create web-audio
```

並依著提示勾選需要的功能，這樣專案就建好囉！

#### 執行

來確認一下專案是否能順利啟動吧：

```cs
yarn

yarn run serve
```

等待服務啟動。當啟動完成時，應該會看到終端機的提示如下：
![terminal](https://i.imgur.com/hv0M5jO.jpg)

服務開在 `localhost:8080`，應該會看到這樣的畫面：
![localhost](https://i.imgur.com/EMvZ30j.jpg)

確認服務正確啟動後，再來簡單做一下頁面切換吧。
利用 Vue Router 的特性，導覽頁籤一下就完工囉：

![nav](https://i.imgur.com/3AEty2G.jpg)

做到這，也就大致完成基礎建設啦～
如果對於 Vue.js 有興趣，想要找更詳細的教學，這邊推薦我們團隊成員的 Vue 系列文章：

- Adam：[網頁設計靠 Vue.js 轉前端 ](https://ithelp.ithome.com.tw/users/20111956/ironman/1784)
- Alex：[Vue.js 手牽手，一起嗑光全家桶](https://ithelp.ithome.com.tw/users/20111576/ironman/1787)

也可以來看看我們 **[浪流連九程式匠自然產生的佛系碼農專區](https://ithelp.ithome.com.tw/ironman/signup/team/41)** 中，有沒有其他讀者感興趣的主題，歡迎一併訂閱追蹤喔！

第一天就先這樣，明天就要進入正題囉！

> ### 筆者
>
> ## Gary
>
> 半路出家網站工程師；半生熟的前端加上一點點的後端。
> 喜歡音樂，喜歡學習、分享，也喜歡當個遊戲宅。
>
> 相信一切安排都是最好的路。
