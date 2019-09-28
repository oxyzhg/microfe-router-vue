<template>
  <div style="text-align:center;">
    <p>This is the container page.</p>
    <div id="module-wrap">AAA-BBB-CCC-DDD</div>
    <router-view></router-view>
  </div>
</template>

<script>
import { getMountedApps, getAppNames } from 'single-spa';
export default {
  name: 'parcel',
  data() {
    return {};
  },
  updated() {
    // console.log('registed app', getAppNames())
    // console.log('mounted app', getMountedApps())
    // console.log('route', this.$route);
  },
  watch: {
    $route(val) {
      console.log(val)
    }
  },
  methods: {
    adaptMenuUrl(url, entry = '') {
      if (!url) return null;
      let path = entry.spilt('?').shift();
      
      if (path.includes('/#/')) {
        return `${url}${entry}`;
      }
      return `${url}/${entry}`;
    }
  }
}
</script>
