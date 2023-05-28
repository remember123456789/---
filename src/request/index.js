
// 导入request
// 写接口
import request from '@/request/api'
import mockRequest from '@/request/mockajax'
import { method } from 'lodash'

export const getlist = () => {
  return request({ url: '/product/getBaseCategoryList', methods: 'get' })
}

export const reqGetBanner = () => {
  return mockRequest.get('/banner')
}

export const reqfloorList = () => {
  return mockRequest.get('/floor')
}
// 商品请求 /api/list  post请求  带参数
export const reqGetSearchinfo = (params) => {
  return request({
    url: '/list',
    method: 'post',
    data: params
  })
}

// 获取商品详情
// /api/item/{ skuId }

export const reqgoodinfo = (skuId) => request.get(`/item/ ${skuId}`)

// /api/cart/addToCart/{ skuId }/{ skuNum } 商品购物车接口
export const reqaddadaptShop = (skuId, skuNum) => {
  return request({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
  })
}

// 商品结算请求
export const reqCartList = () => {
  return request({
    url: '/cart/cartList',
    method: 'get'
  })
}

//商品删除请求
///api/cart/deleteCart/{skuId}
export const reqDelCart = (skuId) => {
  return request({
    url: `/cart/deleteCart/${skuId}`,
    method: 'DELETE'
  })
}

//商品切换选中状态
// /api/cart/checkCart/{skuID}/{isChecked}
export const reqGetChecked = (skuId, isChecked) => {
  return request({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
  })
}

//获取验证码  /api/user/passport/sendCode/{phone}   //get请求
export const reqGetCode = (phone) => {
  return request({
    url: `/user/passport/sendCode/${phone}`,
    method: 'get'
  })
}

//  注册
//  /api/user/passport/register
export const reqRegisterMessage = (data) => {
  return request({
    url: `/user/passport/register`,
    data: data,
    method: 'post'
  })
}

// 登录业务【token】
// /api/user/passport/login
export const reqLogin = (data) => {
  return request({
    url: `/user/passport/login`,
    data: data,
    method: 'post'
  })
}

// 获取用户登录信息
// 添加了token校验获取用户登录信息，用户登录只保存用户的token
// token校验   
// http://182.92.128.115/api/user/passport/auth/getUserInfo

export const reqGetUserInfo = () => {
  return request({
    url: `/user/passport/auth/getUserInfo`,
    method: 'get'
  })
}

//退出登录  /api/user/passport/logout
export const reqLogout = () => {
  return request({
    url: `/user/passport/logout`,
    method: 'get'
  })
}

//  用户请求地址
//  /api/user/userAddress/auth/findUserAddressList

export const reqAddress = () => {
  return request({
     url:`/user/userAddress/auth/findUserAddressList`,
     method:'get'
  })
}


//  获取用户地址信息
//  get
// 获取订单交易页信息
export const reqUserMessage = () => {
  return request({
    url: `/order/auth/trade`,
    method: 'get'
  })
}

// 使用mock获取用户请求地址
export const reqUserAddress = () => {
  return mockRequest.get('/address')
}
//  /api/order/auth/submitOrder?tradeNo={tradeNo} 提交订单

export const reqsubmitOrder = (tradeNo, data) => {
  return request({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method: 'post'
  })
}

// 查看支付订单状态
// /api/payment/weixin/queryPayStatus/{orderId}
export const reqpayment = (orderId) => {
  return request({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'get'
  })
}

// 获取订单列表
// /api/order/auth/{page}/{limit}
export const reqList = (page, limit) => {
  return request({
    url: `/order/auth/${page}/${limit}`,
    method: 'get'
  })
}


