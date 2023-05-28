<template>
  <div class="pagination">
    <button :disabled="pageNo==1" @click="$emit('pageNo',pageNo-1)">上一页</button>
    <button v-if="pageNo>3" :class="{active:pageNo==1}" @click="$emit('pageNo',1)">1</button>
    <button v-if="pageNo>3">...</button>
    <!-- //中间部分 -->
    <!-- /7 -->
    <button v-for="(pageno,index) in startNumEnd.end" v-if="pageno>=startNumEnd.start" :key="index" :class="{active:pageNo==pageno}" @click="$emit('pageNo',pageno)">{{ pageno }}</button>
    <button v-if="startNumEnd.end<totalpage">...</button>
    <button v-if="startNumEnd.end<totalpage" @click="$emit('pageNo',totalpage)">{{ totalpage }}</button>
    <button>总共{{ total }}条</button>
    <button :disabled="pageNo==totalpage" @click="$emit('pageNo',pageNo+1)">下一页</button>
  </div>
</template>

<script>

export default {
  name: 'Pageation',
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  computed: {
    //总页数
    totalpage () {
      return Math.ceil(this.total / this.pageSize)
    },
    startNumEnd () {
      const { pageNo, continues } = this
      let start = 0;
      let end = 0;
      //当连续页数大于总页数不正常情况  1, 2, 3, 4 
      if (continues > this.totalpage) {
        start = 1
        end = continues
      } else {
        start = pageNo - parseInt(continues / 2)
        end = pageNo + parseInt(continues / 2)
        //判断两个情况
        if (start < 1) {
          start = 1
          end = continues
        }
        if (end > this.totalpage) {
          end = this.totalpage
          start = this.totalpage - continues + 1
        }
        return { start, end }
      }
    }

  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>