<template>
  <div id="app">
    <Nav></Nav>
    <div id="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav';
export default {
  name: 'App',
  components: {
    Nav,
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
  display: grid;
  grid-template-columns: 200px auto;
  height: 100vh;
}
#content {
  max-height: 100vh;
}
</style>
