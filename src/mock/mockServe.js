//通过mockjs插件实现模拟数据
import Mock from 'mockjs'
//webpack默认对外暴露的有  图片 json文件格式 不需要exprort
import banner from './banner.json'
import floor from './floor.json'
import address from './address'


//mock数据
Mock.mock('/mock/banner',{code:200,data:banner})

Mock.mock('/mock/floor',{code:200,data:floor})

Mock.mock('/mock/address',{code:200,data:address})
