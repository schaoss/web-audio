<template>
  <nav class="h-full flex flex-col bg-gradient-to-b from-slate-50 to-white">
    <!-- Header -->
    <div class="p-6 border-b border-slate-200">
      <h1 class="text-xl font-bold text-slate-800 tracking-tight">
        Web Audio
      </h1>
      <p class="text-xs text-slate-500 mt-1">JavaScript 音樂漫遊</p>
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
        <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Web Audio API</span>
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
          3D Panner
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
        <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Libraries</span>
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
    <div class="p-4 border-t border-slate-200 text-center">
      <a
        href="https://github.com/schaoss/web-audio"
        target="_blank"
        class="text-slate-400 hover:text-slate-600 transition-colors"
      >
        <i class="fab fa-github text-xl" />
      </a>
    </div>
  </nav>
</template>
