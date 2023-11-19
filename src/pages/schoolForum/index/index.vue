<template>
  <view class="header-1">
    <uv-tabs
      :list="list"
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
      }"
      itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;"
      @change="changeTab"
    ></uv-tabs>
    <view class="header-1__right" style="display: flex;">
      <text>同城</text> <uv-icon name="arrow-down" style="">23</uv-icon>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue'
const list = ref([
  { name: '关注',  code: '1', },
  { name: '发现', code: '2', },
  { name: '同城', code: '3', }
])

// 切换标签
const changeTab = (item) => {
  console.log(item)
}
</script>

<style lang="scss">
.header-1 {
  height: 44px;
  background-color: #fff;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 15px;
  .header-1__right{
    display: flex;
    
  }
}
</style>