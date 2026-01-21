<template>
  <nav class="h-full flex flex-col bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
    <!-- Header -->
    <div class="p-6 border-b border-slate-200 dark:border-slate-700">
      <h1 class="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
        Web Audio
      </h1>
      <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">JavaScript 音樂漫遊</p>
    </div>

    <!-- Navigation links -->
    <div class="flex-1 overflow-y-auto py-4">
      <router-link to="/" class="nav-link">
        <span class="flex items-center gap-3">
          <i class="fas fa-home w-5 text-center opacity-60" />
          Main
        </span>
      </router-link>

      <div class="px-4 py-2 mt-4">
        <span class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Web Audio API</span>
      </div>

      <router-link to="web-audio-api" class="nav-link">
        <span class="flex items-center gap-3">
          <i class="fas fa-wave-square w-5 text-center opacity-60" />
          Web Audio Api
        </span>
      </router-link>

      <router-link to="guitar-tuner" class="nav-link">
        <span class="flex items-center gap-3">
          <i class="fas fa-guitar w-5 text-center opacity-60" />
          Guitar Tuner
        </span>
      </router-link>

      <router-link to="stereo-panner-node" class="nav-link">
        <span class="flex items-center gap-3">
          <i class="fas fa-headphones w-5 text-center opacity-60" />
          Stereo Panner
        </span>
      </router-link>

       <router-link to="panner-node" class="nav-link">
        <span class="flex items-center gap-3">
          <i class="fas fa-cube w-5 text-center opacity-60" />
          2D Panner
        </span>
      </router-link>

      <router-link to="source" class="nav-link">
        <span class="flex items-center gap-3">
          <i class="fas fa-file-audio w-5 text-center opacity-60" />
          Source
        </span>
      </router-link>

      <router-link to="analyser" class="nav-link">
        <span class="flex items-center gap-3">
          <i class="fas fa-chart-bar w-5 text-center opacity-60" />
          Analyser
        </span>
      </router-link>

      <router-link to="guitar-tuner-2.0" class="nav-link">
        <span class="flex items-center gap-3">
          <i class="fas fa-guitar w-5 text-center opacity-60" />
          Guitar Tuner 2.0
        </span>
      </router-link>

      <router-link to="voice-changer" class="nav-link">
        <span class="flex items-center gap-3">
          <i class="fas fa-microphone w-5 text-center opacity-60" />
          Voice Changer
        </span>
      </router-link>

      <div class="px-4 py-2 mt-4">
        <span class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Libraries</span>
      </div>

      <router-link to="tone" class="nav-link">
        <span class="flex items-center gap-3">
          <i class="fas fa-music w-5 text-center opacity-60" />
          Tone.js
        </span>
      </router-link>

      <router-link to="sequencer" class="nav-link">
        <span class="flex items-center gap-3">
          <i class="fas fa-drum w-5 text-center opacity-60" />
          Sequencer
        </span>
      </router-link>

      <router-link to="wave-surfer" class="nav-link">
        <span class="flex items-center gap-3">
          <i class="fas fa-water w-5 text-center opacity-60" />
          WaveSurfer
        </span>
      </router-link>
    </div>

    <!-- Footer -->
    <div class="p-4 border-t border-slate-200 dark:border-slate-700 text-center flex items-center justify-center gap-3">
      <!-- Dark mode toggle -->
      <button
        @click="toggleTheme"
        class="flex-1 px-4 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 text-sm font-medium"
        aria-label="Toggle dark mode"
      >
        <i class="fas" :class="isDark ? 'fa-sun' : 'fa-moon'" />
        <span>{{ isDark ? 'Light' : 'Dark' }}</span>
      </button>
      <!-- Github link -->
      <a
        href="https://github.com/schaoss/web-audio"
        target="_blank"
        class="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-300 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-200"
        aria-label="View on GitHub"
      >
        <i class="fab fa-github text-lg" />
      </a>
    </div>
    </nav>
  </template>

  <script setup lang="ts">
  import { useTheme } from '@/composables/useTheme'

  const { isDark, toggleDark } = useTheme()

  function toggleTheme() {
    toggleDark()
  }
  </script>
