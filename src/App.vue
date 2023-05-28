<template>
  <div id="app">
    <Header></Header>
    <!-- 路由模块 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>


<script>
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'

export default {
  components: {
    Header,
    Footer
  },
  mounted(){
    //派发一个action
    this.$store.dispatch('categorylist')
  }
}
</script>

<style lang="less">
</style>
