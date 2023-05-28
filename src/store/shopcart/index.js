import { reqCartList, reqDelCart, reqGetChecked } from '@/request/index'
const state = {
  cartList: []
}
const mutations = {
  GETCART (state, cartList) {
    state.cartList = cartList
  }
}

const actions = {
  async getCartList ({ commit }) {
    let result = await reqCartList()

    if (result.code == 200) {
      commit('GETCART', result.data)
    }
  },

  //商品删除
  async DelCartList ({ commit }, skuId) {
    let result = await reqDelCart(skuId)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },

  //切换按钮
  async getCheckedupdate ({ commit }, { skuId, isChecked }) {
    let result = await reqGetChecked(skuId, isChecked)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },

  // 商品选中删除
  DelectAllChecked ({ dispatch, getters }) {
    //获取购物车中全部的产品
    let PromiseAll = []
    getters.cartList.cartInfoList.forEach(item => {
      // 只能删除勾选的按钮
      let Promise = item.isChecked == 1 ? dispatch('DelCartList', item.skuId) : '';
      PromiseAll.push(Promise)
    });
    return Promise.all(PromiseAll)
  },

  //商品全部删除
  updateCheckAll ({ dispatch, state }, check) {
    let PromiseAll = []
    state.cartList[0].cartInfoList.forEach(item => {
      let Promise = dispatch('getCheckedupdate', { skuId: item.skuId, isChecked: check })
      PromiseAll.push(Promise)
    })
    return Promise.all(PromiseAll)
  }
}

const getters = {
  cartList (state) {
    return state.cartList[0]
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}