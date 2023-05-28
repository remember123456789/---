import axios from "axios";

const request = axios.create({
  baseURL: '/mock',
  timeout: 5000
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  return config;
})

// 响应拦截器
request.interceptors.response.use((res) => {
   return res.data
},(err)=>{
   return new Promise(reject(new Error('faile')))
})

export default request;
