/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
  export default component
}

declare module '*.mp3' {
  const src: string
  export default src
}

interface Window {
  webkitAudioContext: typeof AudioContext
}
