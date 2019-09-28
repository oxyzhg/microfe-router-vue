import Vue from 'vue';
import Vuex from 'vuex';
import modules from './modules';

Vue.use(Vuex);

let plugins = [];

if (process.env.NODE_ENV !== 'production') {
  const createLogger = require('vuex/dist/logger');
  plugins.push(createLogger());
}

export default new Vuex.Store({
  modules,
  plugins
});
