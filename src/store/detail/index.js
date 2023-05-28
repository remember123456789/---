import { reqgoodinfo,reqaddadaptShop } from '@/request/index'
//封装游客身份模块uuid--->生成一个随机字符串（不能在变了）
import {getUUID} from '@/utils/uuid_token'

const state = {
  goodInfo: {},
  //游客临时身份
  uuid_token:getUUID()
}

const mutations = {
  GETGOODINFO (state, goodInfo) {
    state.goodInfo = goodInfo
  }
}

const actions = {
  // 用户派发
  async getGoodinfo ({ commit }, skuId) {
    let result = await reqgoodinfo(skuId)
    if (result.code == 200) {
      commit('GETGOODINFO', result.data)
    }
  },
  // 将产品添加到购物车中
  async  addorderUpdateShopcat ({commit},{skuId,skuNum}) {
     //进行解构
     //加入购物车以后（发请求），前台将参数带给服务器
     //服务器写入数据成功，并没有返回其他数据，只是返回code=200，代表这次操作成功
     //因为服务器没有返回其余数据，因此不需要三连环存储数据
    let result=await reqaddadaptShop(skuId,skuNum)
    if(result.code==200){
      return 'ok'
    }else{
      //加入购物车失败
      return Promise.reject(new Error('出错了'))
    }
  }
}

// 简化数据
const getters = {
  categoryView (state) {
    // 如果服务器的数据没有拿到 会报错 至少返回一个空对象
    return state.goodInfo.categoryView || {};
  },
  spuSaleAttrList (state) {
    return state.goodInfo.spuSaleAttrList||{}
  },
  skuInfo (state) {
    return state.goodInfo.skuInfo || {}
  },
  spuSaleAttrList (state) {
    return state.goodInfo.spuSaleAttrList || []
  }
}


export default {
  state,
  mutations,
  actions,
  getters
}
