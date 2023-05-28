// 创建路由模块
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import routes from './routes'


// 重写push方法
const originpush = VueRouter.prototype.push
const originreplace = VueRouter.prototype.replace
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originpush.call(this, location, resolve, reject)
  } else {
    originpush.call(this, location, () => { }, () => { })
  }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originreplace.call(this, location, resolve, reject)
  } else {
    originreplace.call(this, location, () => { }, () => { })
  }
}

let router = new VueRouter({
  routes,
  scrollBehavior (to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 }
  },
})

import store from '@/store'
let name = store.state.user.userinfo.name

router.beforeEach((to, from, next) => {
  //如果登录了获取token
  if (store.state.user.token) {
    //  如果在login页面跳转到home页面
    if (to.path == '/login') {
      next('/home')
    } else {
      //登录了如果在其他页面  需要判断页面中有没有userinfo 如果没有需要进行派发 不然用户一刷新token就没了 就需要从新登录
      if (name) {
        next()
      } else {
        try {
          //没有userinfo进行派发获取用户数据
          store.dispatch('getUserInfo')
          next()
        } catch (error) {
          // token过期
          //  派发退出登录的接口
          store.dispatch('UserLogout')
        }
      }
    }
  } else {
    //如果没登陆 有一些页面不能去  没有登录不能交易页，也不能去支付相关的pay paysuccess ， 不能去个人中心
    let toPath=to.path
    if(toPath.indexOf('/trade')!=-1 || to.path.indexOf('/pay')!=-1 ||to.path.indexOf('/paysuccess')!=-1 ||to.path.indexOf('/center/myorder')!=-1){
      //把未登录的时候而没有去成的地址 存储在地址栏中
      next('/login?redirect='+toPath)
    }else{
      next()
    }
  }
})


export default router