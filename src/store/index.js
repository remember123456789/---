import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import home from '@/store/home'
import search from '@/store/search'
import detail from '@/store/detail/index'
import shopcart from './shopcart'
import user from '@/store/user/index'
import trade from './trade'

// 暴露  
export default new Vuex.Store({
  modules:{
     home,
     search,
     detail,
     shopcart,
     user,
     trade
  }
})
