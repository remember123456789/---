import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
// 全局组件
import TypeNav from '../src/page/home/TypeNav/typenav.vue'
import Pageation from './components/pageation/index.vue'
import store from '@/store/index'
import '@/mock/mockServe'

import * as API from '@/request/index'
Vue.component(TypeNav.name, TypeNav)
Vue.component(Pageation.name, Pageation)
//图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)

import atm from './assets/images/icons.png'
Vue.use(VueLazyload, {
  loading: atm,
})

Vue.config.productionTip = false
// 引入swiper样式
import "swiper/css/swiper.css";


new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate () {
    Vue.prototype.$bus = this,
      Vue.prototype.$API = API
  }
}).$mount('#app')
