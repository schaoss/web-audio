<template>
  <div id="app">
    <div id="mask" :class="{'show': isShow}" @click="isShow = !isShow"></div>
    <div id="menu" :class="{'show': isShow}">
      <Nav @click.native="isShow=false"></Nav>
    </div>
    <div id="content">
      <div id="menuTrigger" @click="isShow = !isShow">
        <i :class="{'fas': true, 'fa-times': isShow, 'fa-bars': !isShow}"></i>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
export default {
  name: 'App',
  components: {
    Nav,
  },
  data() {
    return {
      isShow: false
    }
  }
}
</script>

<style lang="scss">
body,
html {
  max-height: 100vh;
}
#app {
  font-family: Arial, Helvetica, 'Segoe UI Symbol', 'Segoe MDL2 Assets',
    '微軟正黑', 'Microsoft JhengHei', 'Tei TC', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  height: 100vh;
}
#content {
  width: 100%;
  height: 100%;
  overflow: auto;
  #menuTrigger {
    position: absolute;
    width: 25px;
    height: 25px;
    line-height: 25px;
    font-size: 15px;
    background-color: #999999;
    color: #f9f9f9;
    border-radius: 50%;
    margin: 10px;
    user-select: none;
    transition: all 0.5s;
    z-index: 10;
    > i {
      transition: all 0.5s;
    }
  }
}
#menu {
  width: 250px;
  height: 100vh;
  position: absolute;
  left: -250px;
  transition: left 0.5s;
  z-index: 5;
  &.show {
    left: 0;
  }
}
#mask {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(#000000, 0.65);
  opacity: 0;
  transition: opacity 0.5s, z-index 0.5s;
  z-index: -1;
  &.show {
    opacity: 1;
    z-index: 1;
  }
}
</style>
