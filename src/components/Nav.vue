<template>
  <div id="nav">
    <router-link to="/">Main</router-link>
    <router-link to="web-audio-api">Web Audio Api</router-link>
    <router-link to="guitar-tuner">Guitar Tuner</router-link>
  </div>
</template>
<style lang="scss">
#nav {
  background-color: #e9e9e9;
  overflow-y: scroll;
  a {
    display: block;
    padding: 10px;
    font-weight: bold;
    color: #2d5377;
    text-decoration: none;
    transition: all 0.3s ease-out;
    &.router-link-exact-active {
      background-color: #fff;
      color: #00477d;
      font-weight: 800;
    }
    &:hover {
      background-color: #fff;
    }
  }
}
</style>
