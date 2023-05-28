import { getlist, reqGetBanner,reqfloorList } from '@/request/index'

const state = {
  categorylist: [],
  getbannerlist:[],
  getFloorlist:[]
}

const mutations = {
  CATECORYLIST (state, categorylist) {
    state.categorylist = categorylist
  },
  GETBANNER(state,getbannerlist){
     state.getbannerlist=getbannerlist
  },
  GETFLOOR(state,getFloorlist){
    state.getFloorlist=getFloorlist
  }
}

const actions = {
  // acions里面不能修改内容
  async categorylist ({ commit }) {
    let result = await getlist()
    if (result.code == 200) {
      commit('CATECORYLIST', result.data)
    }
  },
  async getbannerList({commit}){
    let result1 =await reqGetBanner()
    if(result1.code==200){
      console.log(result1.data);
      commit('GETBANNER',result1.data)
    }
  },

  async getFloorlist({commit}){
    let result2 =await reqfloorList()
    console.log(result2.data);
    if(result2.code==200){
      commit('GETFLOOR',result2.data)
    }
  }
 
}

export default {
  state,
  actions,
  mutations
}
