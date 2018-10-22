<template>
  <div id="app">
    <div id="menu" v-if="isShow">
      <Nav></Nav>
    </div>
    <div id="content">
      <div id="menuTrigger" @click="isShow = !isShow">{{isShow ? '\
        <' : '\>' }}</div> <router-view />
      </div>
    </div>
</template>

<script>
import Nav from '@/components/Nav';
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
  overflow: hidden;
  #menuTrigger {
    position: absolute;
    width: 25px;
    height: 25px;
    line-height: 25px;
    font-size: 25px;
    background-color: #3692be;
    color: #f9f9f9;
    border-radius: 50%;
    margin: 10px;
    user-select: none;
  }
}
#menu {
  width: 250px;
  height: 100vh;
}
</style>
