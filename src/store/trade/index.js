import { reqAddress, reqUserMessage } from '@/request/index'

const state = {
  address: [],
  orderinfo: {}
}

const mutations = {
  USERADDRESS (state, address) {
    state.address = address
  },
  USERMESSAGE (state, orderinfo) {
    state.orderinfo = orderinfo
  }
}

const actions = {
  //获取地址信息
  async getUserAddress ({ commit }) {
    let result = await reqAddress()
    // console.log(result.data);
    if (result.code == 200) {
      commit('USERADDRESS', result.data)
    }
  },
  //获取交易信息
  async getUserMessage ({ commit }) {
    let result = await reqUserMessage()
    console.log(result);
    if (result.code == 200) {
      commit('USERMESSAGE', result.data)
    }
  }
}

const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters
}
