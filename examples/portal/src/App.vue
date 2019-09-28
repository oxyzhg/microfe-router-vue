<template>
  <div id="page">
    <el-menu :default-active="activeIndex" mode="horizontal" router>
      <el-menu-item
        v-for="menu in menus"
        :key="menu.path"
        :index="menu.path"
      >
        {{ menu.label }}
      </el-menu-item>
    </el-menu>

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      menus: [
        {
          path: '/',
          label: 'Home'
        },
        {
          path: '/about',
          label: 'About'
        },
        {
          path: '/plugins/app1',
          label: 'App1'
        },
        {
          path: '/plugins/app1/about',
          label: 'App1/About'
        },
        {
          path: '/plugins',
          label: 'Portal'
        },
        {
          path: '/aaa',
          label: 'AddRoute'
        }
      ]
    }
  },
  computed: {
    activeIndex() {
      return this.$route.path;
    }
  }
}
</script>
