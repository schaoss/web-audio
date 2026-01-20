import { defineConfig, presetUno, presetAttributify, presetIcons } from 'unocss'
import type { Variant } from 'unocss'

const routerActiveVariant: Variant = {
  name: 'router-link-active',
  match(matcher) {
    if (!matcher.startsWith('active:')) return matcher
    return {
      matcher: matcher.slice(7),
      selector: s => `${s}.router-link-exact-active, ${s}.router-link-active`,
    }
  },
}

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      cdn: 'https://esm.sh/',
    }),
  ],
  variants: [routerActiveVariant],
  shortcuts: {
    'btn': 'px-4 py-2 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50',
    'icon-btn': 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100',
    'nav-link': 'block px-4 py-3 text-slate-600 font-medium no-underline transition-all duration-200 border-l-3 border-transparent hover:bg-slate-100 hover:text-slate-900 hover:border-l-primary active:bg-white active:text-primary active:border-l-primary active:font-semibold',
    'menu-trigger': 'fixed top-4 left-4 z-50 w-10 h-10 flex items-center justify-center bg-slate-800 text-white rounded-lg shadow-lg cursor-pointer transition-all duration-300 hover:bg-slate-700 hover:scale-105',
  },
  theme: {
    colors: {
      primary: '#3692be',
      'slate-dark': '#2c3e50',
    },
  },
  safelist: [
    'fas', 'fab', 'fa-bars', 'fa-times', 'fa-play', 'fa-pause',
    'fa-drum', 'fa-music', 'fa-random', 'fa-minus', 'fa-plus', 'fa-trash-alt',
    'fa-home', 'fa-wave-square', 'fa-guitar', 'fa-headphones', 'fa-cube',
    'fa-file-audio', 'fa-chart-bar', 'fa-microphone', 'fa-water', 'fa-github',
  ],
})
