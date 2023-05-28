//使用路由懒加载
// 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
// 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。
export default [
  // 路由重定向
  {
    path: '/', redirect: '/home',
  },
  //购物车结算
  {
    path: '/shopcart', component: ()=>import('@/page/ShopCart/index.vue')
  },
  //购物
  {
    path: '/addcartsuccess', component: ()=>import('@/page/AddCartSuccess/index.vue'),
    name: 'addcartsuccess'
  },
  //购物车最后结算
  {
    path: '/trade', component: ()=>import('@/page/Trade/index.vue'),
    meta: { show: true },
    //必须从购物车去交易页
    beforeEnter: (to, from, next) => {
      if (from.path == '/shopcart') {
        next()
      } else {
        next(false)
      }
    }
  },
  //支付成功页面
  {
    path: '/paysuccess',
    component: ()=>import('@/page/Paysuccess/index.vue')
  },
  //支付页面
  {
    path: '/pay', component: ()=>import('@/page/Pay/index.vue'),
    meta: { show: true },
    beforeEnter: (to, from, next) => {
      if (from.path == '/trade') {
        next()
      } else {
        next(false)
      }
    }
  },
  //产看订单 个人中心
  {
    path: '/center', component: ()=>import('@/page/Center/index.vue'),
    children: [
      { path: '/center', redirect: '/center/myorder' },
      { path: 'grouporder', component: ()=>import('@/page/Center/groupOrder/index.vue') },
      { path: 'myorder', component: ()=>import('@/page/Center/myOrder/index.vue') }
    ]
  },
  {
    path: '/home', component: ()=>import('@/page/home/home.vue'),
    // 控制footer在哪个页面显示或隐藏
    meta: { show: true }
  },
  //登录
  {
    path: '/login', component: ()=>import('@/page/login/index.vue'),
    meta: { show: false }
  },
  //注册
  {
    path: '/register', component: ()=>import('../page/Register/Register.vue'),
    meta: { show: false }
  },
  {
    path: '/find:keyword?', component: ()=>import('../page/search/index.vue'),
    meta: { show: true },
    name: 'find',
    props: ($route) => {
      return { keywords: $route.params.keyword, k: $route.query.k }
    }
  },
  {
    // 占位符  商品详情
    path: '/detail/:id', component: ()=>import('@/page/Detail/index.vue'),
    meta: { show: true }
  }

]
