<template>
  <view>
    <view class="header-1">
      <uv-tabs
        :list="props.list"
        lineWidth="0"
        lineColor="#f56c6c"
        :activeStyle="{
          color: '#EC808D',
          fontWeight: 'bold',
          transform: 'scale(1.05)',
        }"
        :inactiveStyle="{
          color: '#606266',
          transform: 'scale(1)',
          fontSize: '14px',
        }"
        itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;"
        @change="changeTab"
      ></uv-tabs>
      <view class="header-1__right" style="display: flex;">
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  list: {
    type: Array,
    default: () => [
      { name: '热门',  code: '1', },
      { name: '表白墙', code: '2', },
      { name: '工作', code: '2', },
      { name: '兼职', code: '2', },
    ],
  },
})


// 切换标签
const changeTab = (item) => {
  console.log(item)
}
</script>

<style scoped lang="scss">
::v-deep uni-page-body{
  overflow: hidden;
}
.header-1 {
  height: 18px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 15px;
  justify-content: flex-start;
  font-size: 10px!important;
  .header-1__right{
    height: 2.5vh;
    display: flex;
    text-align: center;
    padding-left: 15px;
    padding-right: 15px;
    color: rgb(96, 98, 102);
  }
}
.choosed {
  color: #EC808D;
}
</style>