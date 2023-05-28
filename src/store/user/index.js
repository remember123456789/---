import { reqGetCode, reqRegisterMessage, reqLogin, reqGetUserInfo, reqLogout } from '@/request/index'

const state = {
  code: '',
  token: localStorage.getItem('TOKEN'),
  userinfo: {}
}

const mutations = {
  GETCODE (state, code) {
    state.code = code
  },
  USERLOGIN (state, token) {
    state.token = token
  },
  GETUSERINFO (state, userinfo) {
    state.userinfo = userinfo
  },
  CLEAR(state){
    state.token='',
    state.userinfo='',
    localStorage.removeItem('TOKEN')
  }
}

const actions = {
  // 派发验证码
  async getCode ({ commit }, phone) {
    let result = await reqGetCode(phone)
    if (result.code == 200) {
      commit('GETCODE', result.data)
    }
  },
  // 注册账号
  async getUserRegister ({ commit }, data) {
    let result = await reqRegisterMessage(data)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('file'))
    }
  },
  //登录
  async UserLogin ({ commit }, data) {
    let result = await reqLogin(data)
    if (result.code == 200) {
      commit('USERLOGIN', result.data.token)
      localStorage.setItem('TOKEN', result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('账号或密码不正确'))
    }
  },
  //获取用户信息
  //如果有token可以获取用户信息，没有则不能
  async getUserInfo ({ commit }) {
    let result = await reqGetUserInfo();
    if (result.code == 200) {
      // 提交用户信息
      commit('GETUSERINFO', result.data)
    }
  },
  //退出登录
  async UserLogout ({ commit }) {
    let result = await reqLogout()
    if (result.code == 200) {
      commit('CLEAR')
    }else{
      return Promise.reject(new Error('faile'))
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
