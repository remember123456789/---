<template>
  <div>
    <!-- 商品分类三级类表 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!-- 面包屑 -->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>

          <ul class="fl sui-tag">
            <!-- //分类面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="delbread">×</i>
            </li>
            <!-- 关键子面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="removekeyword">×</i>
            </li>
            <!-- //品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="removeTrademark">×</i>
            </li>
            <!-- 平台售卖属性面包屑 -->
            <li class="with-x" v-for="(arrtValue,index) in searchParams.props" :key="index">
              {{ arrtValue.split(":")[1] }}
              <i @click="removerattr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <!-- 自定义事件 -->
        <SearchSelector @tradmark="tradmark" @attrinfo="attrinfo" />
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:searchParams.order.indexOf('1')!==-1}">
                  <a href="#" @click="changeorder('1')">
                    综合
                    <span v-show="this.searchParams.order.indexOf('1')!==-1" class="iconfont" :class="{'icon-arrdown1':isASC,'icon-arrdown-green-down':isDESC}"></span>
                  </a>
                </li>

                <li :class="{active:searchParams.order.indexOf('2')!==-1}">
                  <a href="#" @click="changeorder('2')">
                    价格
                    <span v-show="this.searchParams.order.indexOf('2')!==-1" class="iconfont" :class="{'icon-arrdown1':isASC,'icon-arrdown-green-down':isDESC}"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- 销售产品列表底部 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img v-lazy="good.defaultImg" />
                    </router-link>
                  </div>
                    
                  <div class="price">
                    <strong>
                      <em>¥&nbsp</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                    
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{ good.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">
                      已有
                      <span>{{ good.id }}</span>人评价
                    </i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <!-- //分页器 -->
          <Pageation :pageNo="this.searchParams.pageNo" :pageSize="this.searchParams.pageSize" :total="total" :continues="5" @pageNo="pageNo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'
import SearchSelector from './SearchSelector/SearchSelector'
export default {
  name: 'Search',
  data () {
    return {
      //传递给服务器的数据 
      searchParams: {
        //产品相应的id
        category1Id: "",
        category2Id: "",
        category3Id: "",
        //产品的名字  用户搜索的名字
        categoryName: "",
        //搜索的关键字
        keyword: "",
        //排序:初始状态应该是综合且降序
        order: "1:desc",
        //第几页
        pageNo: 1,
        //每一页展示条数
        pageSize: 3,
        //平台属性的操作
        props: [],
        //品牌
        trademark: "",
      },
    }
  },
  components: {
    SearchSelector
  },
  beforeMount () {
    // 在发送请求之前需要把参数整理发送给服务器
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted () {
    this.getData()
  },
  computed: {
    ...mapGetters(['goodsList']),
    isASC () {
      //包含升序
      return this.searchParams.order.indexOf('asc') !== -1
    },
    isDESC () {
      //包含降序
      return this.searchParams.order.indexOf('desc') !== -1
    },
    ...mapState({
      total:(state)=>state.search.searList.total
    })
  },
  methods: {
    getData () {
      //派发一个getSearchList 并且把searchParams传递给服务器
      this.$store.dispatch('getSearchList', this.searchParams)
    },
    delbread () {
      this.searchParams.categoryName = undefined
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      this.getData()
      //需要判断是否有params参数  如果路径中出现pararms参数不应该删除 需要带着 params参数在搜索按钮保存
      if (this.$route.params) {
        //地址栏也需要该 清空
        this.$router.push({ name: 'find', params: this.$route.params })
      }
    },
    //删除关键字
    removekeyword () {
      //删除后需要继续发请求
      this.searchParams.keyword = undefined
      //继续发请求
      this.getData()
      //清除搜索框文字
      this.$bus.$emit('clear')
      // 如果有query参数必须带上
      if (this.$route.query) {
        this.$router.push({ name: 'find', query: this.$route.query })
      }
    },
    //自定义事件接收子组件的值
    tradmark (state) {
      //接收子组件传递过来的值
      console.log(state);
      //整理参数 
      this.searchParams.trademark = `${state.tmId}:${state.tmName}`
      //再次发送请求 
      this.getData()
      //将trademark展示给面包屑
      // this.searchParams.trademark=''
    },
    //品牌的面包屑关闭按钮
    removeTrademark () {
      this.searchParams.trademark = ''
      this.getData()
    },
    //接收子组件的属性
    attrinfo (attr, attrValue) {
      let result = `${attr.attrId}:${attrValue}:${attr.attrName}`

      // 数组去重 祛除里面重复的元素 否则面包屑可以一直增加
      if (this.searchParams.props.indexOf(result) == -1) {
        this.searchParams.props.push(result)
      }
      this.getData()
      // this.searchParams.props=[]
    },
    // 删除商品售卖属性元素
    removerattr (index) {
      this.searchParams.props.splice(index, 1)
      this.getData()
    },
    // 排序操作 进行点击切换 
    changeorder (flag) {
      let originFlag = this.searchParams.order.split(':')[0]
      let originName = this.searchParams.order.split(":")[1]
      let newArr = []
      if (flag == originFlag) {
        newArr = `${flag}:${originName == 'desc' ? 'asc' : 'desc'}`
      } else {
        newArr = `${flag}:${'desc'}`
      }
      this.searchParams.order = newArr
      this.getData()
    },
    pageNo (page) {
      this.searchParams.pageNo=page
      this.getData()
    }

  },
  watch: {
    $route (newValue, oldValue) {
      //合并query和params参数并给searchParams
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      //进行一次请求
      this.getData()
      //每一次请求都应该把123级分类清空
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
    }
  }
}
</script>


<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;
            .iconfont {
              font-family: 'iconfont' !important;
              font-size: 16px;
              font-style: normal;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>