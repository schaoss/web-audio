# JavaScript 音樂漫遊 - 30 天探索 Web Audio！

如同一道好料理需要具備色、香、味，一個好網站除了好內容之外，也需要透過互動性更高的視覺、聽覺，來與內容相輔相成。

本系列將從 `Web Audio API` 出發，以說明搭配範例，從實作中逐步認識 API 規格；並挑選數個主流、有趣的 Audio 相關套件如：[`Tone.js`](https://github.com/Tonejs/Tone.js)、[`wavesurfer.js`](https://github.com/wavesurfer-js/wavesurfer.js) 等，透過 JavaScript，玩轉聲音於程式的字裡行間。

歡迎您與我一同踏上這趟旅程，讓我們於科技與藝術的交會處相逢，一起在音樂中肆意漫遊。

[Live Demo](https://schaoss.github.io/web-audio/)

![audio image](https://i.imgur.com/5oewowO.png)

## 2019 iT 邦幫忙 鐵人賽

本專案為參加鐵人賽的程式部分；每篇文章皆可搭配當日的 branch 看程式範例。

![iron-man](https://ithelp.ithome.com.tw/images/ironman/10th/kv-bg-content.png)

- 參賽文章在 [這裡](https://ithelp.ithome.com.tw/users/20111380/ironman/1783)
- HackMD 好讀版在 [這裡](https://hackmd.io/c/Hksoyrxhm/%2FZyRVQ2LOQjenkhZG28iVhg)

## 技術棧

| 類別 | 技術 |
|------|------|
| 框架 | Vue 3.5 + TypeScript 5.8 |
| 建置 | Vite 7 |
| 樣式 | UnoCSS 66 + SCSS |
| 測試 | Vitest 3 + happy-dom |
| 音訊 | Web Audio API, Tone.js 15, wavesurfer.js 7 |
| 工具 | ESLint 9 (flat config), vue-tsc |

## 執行專案

需要 Node.js 22 或以上版本，使用 pnpm 作為套件管理器。

```bash
# 安裝依賴
pnpm install

# 開發模式
pnpm run dev

# 型別檢查
pnpm run typecheck

# 程式碼檢查
pnpm run lint

# 執行測試
pnpm run test

# 建置專案
pnpm run build
```

## 專案結構

```
src/
├── components/     # 共用元件
├── lib/           # 工具函式 (audioUnlock, snare)
├── stores/        # Pinia store
├── views/         # 頁面元件
│   ├── Analyser.vue
│   ├── GuitarTuner.vue
│   ├── PannerNode.vue
│   ├── Sequencer.vue
│   ├── Source.vue
│   ├── Tone.vue
│   ├── VoiceChanger.vue
│   ├── WaveSurfer.vue
│   └── WebAudioApi.vue
├── main.ts
├── router.ts
└── store.ts
```

## 範例說明

| 頁面 | 說明 |
|------|------|
| Web Audio API | 基礎 Web Audio API 操作：振盪器、濾波器 |
| Guitar Tuner | 吉他調音器 (麥克風輸入) |
| Stereo Panner | 立體聲左右聲道控制 |
| 3D Panner | 3D 空間音效定位 |
| Source | 音源播放與視覺化 |
| Analyser | 頻譜分析器 |
| Voice Changer | 變聲器效果 |
| Tone.js | Tone.js 合成器範例 |
| Sequencer | 鼓機音序器 |
| WaveSurfer | 波形視覺化播放器 |

## License

MIT
