<template>
  <div>
    <!-- 全局组件不需要再引入 -->
    <TypeNav />
    <list />
    <Rank />
    <like />
    <!-- v-for可以在自定义标签上使用 -->
    <Floor v-for="item in getfloorlist" :key="item.id" :list="item" />
    <Brand />
  </div>
</template>

<script>
import list from '@/page/home/listContainer/list.vue'
import Rank from '@/page/home/Rank/rank.vue'
import like from '@/page/home/like/like.vue'
import Floor from '@/page/home/Floor/floor.vue'
import Brand from '../Brand/brand.vue'

import { mapState } from 'vuex'

export default {
  components: {
    list,
    Rank,
    like,
    Floor,
    Brand
  },
  computed: {
    ...mapState({
      getfloorlist: (state) => {
        return state.home.getFloorlist
      }
    })
  },
  mounted () {
    this.$store.dispatch('getFloorlist')
    this.$store.dispatch('getUserInfo')
  },
  methods: {
    add () {
      this.$store.dispatch('add')
    }
  },
}
</script>

<style>
</style>