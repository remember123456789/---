<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="moveindex(index)" @mouseenter="Entershow">
        <h2 class="all">全部商品分类</h2>
        <div class="sort" v-if="show">
          <div class="all-sort-list2" v-for="(c1,index) in categorylist" :key="c1.categoryId" @click="goSearch">
            <div class="item" @mouseenter="changeindex(index)" :class="{cur:currentIndex===index}">
              //一级餐单
              <h3>
                <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
              </h3>
              <div class="item-list clearfix" :style="{display:currentIndex===index?'block':'none'}">
                <div class="subitem" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
                  <dl class="fore">
                    <dt>
                     <!-- 二级餐单 -->
                      <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                    </dt>
                    <dd>
                      <em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                        <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName}}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
//也可以使用按需引入
import _ from 'lodash'
export default {
  name: 'TypeNav',
  data () {
    return {
      currentIndex: -1,
      show: true
    }
  },
  mounted () {
    //当路由发生跳转时，让导航栏隐藏 但是在home页面不隐藏
    if (this.$route.path !== '/home') {
      this.show = false
    }
  },
  computed: {
    //右侧需要的是一个函数，当使用计算属性时右侧函数会立即执行一次
    //注入一个参数state即为大仓库的数据
    ...mapState({
      categorylist: (state) => {
        return state.home.categorylist
      }
    }),
  },
  methods: {
    changeindex: _.throttle(function (index) {
      this.currentIndex = index
    }, 40),

    moveindex (index) {
      this.currentIndex = -1
      //进行判断如果在home页面 鼠标移出show不改变还是true
      if (this.$route.path !== '/home') {
        this.show = false
      }
    },

    goSearch (event) {
      let element = event.target;
      let { categoryname, category1id, category2id, category3id } = element.dataset
      // 进行路由传
      if (categoryname) {
        let location = { name: 'find' }
        let query = { categoryName: categoryname }
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        location.query = query
        // {name:'find',query{categoryName:categoryname}}
        this.$router.push(location)
      }
    },
    Entershow () {
      this.show = true
    }
  }
}

</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 516px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          // width: 30px;
          height: 30px;
          width: 210px;
          // background-color: #e1251b;
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 515px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
  }
}
</style>
