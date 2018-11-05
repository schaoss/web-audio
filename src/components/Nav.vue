<template>
  <div id="nav">
    <router-link to="/">Main</router-link>
    <router-link to="web-audio-api">Web Audio Api</router-link>
    <router-link to="guitar-tuner">Guitar Tuner</router-link>
    <router-link to="stereo-panner-node">Stereo Panner Node</router-link>
    <router-link to="panner-node">Panner Node</router-link>
    <router-link to="source">Source</router-link>
    <router-link to="analyser">Analyser</router-link>
    <router-link to="guitar-tuner-2.0">Guitar Tuner 2.0</router-link>
    <router-link to="voice-changer">VoiceChanger</router-link>
    <router-link to="tone">Tone</router-link>
    <router-link to="sequencer">Sequencer</router-link>
    <router-link to="scribbletune">Scribbletune</router-link>
  </div>
</template>
<style lang="scss">
#nav {
  background-color: #e9e9e9;
  padding-top: 2px;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  z-index: 5;
  a {
    display: block;
    padding: 10px;
    font-weight: bold;
    color: #2d5377;
    text-decoration: none;
    transition: all 0.3s ease-out;
    &.router-link-exact-active {
      background-color: #ffffff;
      color: #00477d;
      font-weight: 800;
    }
    &:hover {
      background-color: #ffffff;
    }
  }
}
</style>
