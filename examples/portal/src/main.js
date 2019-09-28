import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store';
import setup from './setup';

Vue.use(ElementUI);
Vue.config.productionTip = false;

setup();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#root');
