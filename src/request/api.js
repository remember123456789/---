// 对axios进行二次封装
// 首先安装axios  npm install --save axios
const axios = require('axios');
// const { reject } = require('lodash');
// 进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'
// 创建axios实例
const requests = axios.create({
  // 基础配置
  baseURL: '/api',
  timeout: 5000
})
// 请求拦截器  在发送请求前拦截
requests.interceptors.request.use(function (config) {

  if (store.state.detail.uuid_token) {
    //请求头添加一共字段（userTempId） 和后台老师商量好了  不能写错
    config.headers.userTempId = store.state.detail.uuid_token
  }
  //  需要携带token给服务器
  if(store.state.user.token){
    // config.headers.token=store.state.user.token
    config.headers.token=localStorage.getItem('TOKEN')

  }
  nprogress.start()
  return config;
})
//响应拦截器 
// 两个函数 一个是请求成功 一个是请求失败
requests.interceptors.response.use((res) => {
  nprogress.done()
  return res.data
}, (err) => {
  return new Promise(reject(new Error('falie')))
})

export default requests
