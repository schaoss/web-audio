<template>
  <div id="index">
    <h1> Web Audio </h1>
    <div class="content">
      <div>
        <p>如同一道好料理需要具備色、香、味，一個好網站除了好內容之外，也需要透過互動性更高的視覺、聽覺，來與內容相輔相成。</p>
        <p>本系列將從 Web Audio API 出發，以說明搭配範例，從實作中逐步認識 API 規格；並挑選數個主流、有趣的 Audio 相關套件，透過 JavaScript，玩轉聲音於程式的字裡行間。</p>
        <p>歡迎您與我一同踏上這趟旅程，讓我們於科技與藝術的交會處相逢，一起在音樂中肆意漫遊。</p>
      </div>
      <img src="https://i.imgur.com/5oewowO.png" />
      <p>這個網站會呈現文章內提到的各種範例，讀者您可以參照文章任意賞玩。</p>
      <p>程式碼放在 <a href="https://github.com/schaoss/web-audio">Github</a></p>
      <p>參賽文章在 <a href="https://ithelp.ithome.com.tw/users/20111380/ironman/1783">這裡</a></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
};
</script>

<style lang="scss" scoped>
#index {
  max-height: 100vh;
  overflow: auto;
  .content {
    max-width: 50vw;
    margin: 40px auto;
    > div {
      text-align: left;
      line-height: 1.8;
      white-space: 1;
    }
    img {
      width: 100%;
    }
  }
}
</style>
