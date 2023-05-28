import { reqGetSearchinfo } from '@/request/index'

const state = {
  searList: {}
}

const mutations = {
  SEARCH(state,searList){
    state.searList=searList
  }
}

const actions = {
  async getSearchList ({commit},params={}) {
    let result=await reqGetSearchinfo(params)
    console.log(result.data);
    if(result.code==200){
      commit('SEARCH',result.data)
    }
  }
}

const getters = {
  attrsList:(state)=>state.searList.attrsList||undefined,
  goodsList:(state)=>state.searList.goodsList||undefined,
  trademarkList:(state)=>state.searList.trademarkList  ||undefined
}

export default {
  state,
  mutations,
  actions,
  getters
}
