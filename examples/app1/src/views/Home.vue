<template>
  <div class="home">
    <h1>This is the vue application home page.</h1>
    <p class="tag-msg">{{ msg }}</p>
    <p class="tag-date bgcolor-blue">{{ Date.now() }}</p>
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data() {
    return {
      msg: 'Welcome to vue.js app'
    }
  },
  computed: {
    presentYear() {
      return new Date().getFullYear();
    }
  }
}
</script>

<style scoped>
@import './style.scss';
.tag-msg {
  color: rebeccapurple;
}
.tag-date {
  color: royalblue;
}
</style>
