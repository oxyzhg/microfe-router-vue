<template>
  <div id="app">
    <ul>
      <li><router-link to="/plugins/app1">Home</router-link></li>
      <li><router-link to="/plugins/app1/about">About</router-link></li>
    </ul>
    <router-view/>
  </div>
</template>

<style lang="scss" scope>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
