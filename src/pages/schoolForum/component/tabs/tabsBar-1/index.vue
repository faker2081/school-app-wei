<template>
  <view>
    <view class="header-1">
      <uv-tabs
        :list="tabList"
        lineWidth="0"
        lineColor="#f56c6c"
        :activeStyle="{
          color: '#EC808D',
          fontWeight: 'bold',
          transform: 'scale(1.05)',
          fontSize: '17px',
        }"
        :inactiveStyle="{
          color: '#606266',
          transform: 'scale(1)',
          fontSize: '17px',
        }"
        itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;"
        @change="changeTab"
        :current="currentIndex"
      ></uv-tabs>
      <view class="header-1__tile" style="display: flex;" @click="localPlace">
        <text :class="{choosed: currentIndex === 2}">同城</text> <uv-icon name="arrow-down" style=""></uv-icon>
      </view>
      <view class="header-1__right" style="display: flex;" @click="search">
        <text :class="{choosed: currentIndex === 2}">搜索</text> <uv-icon name="search" style=""></uv-icon>
      </view>
    </view>
  </view>
</template>

<script setup>
import {ref, reactive, watchEffect, getCurrentInstance, defineEmits } from "vue";

let emits = defineEmits(['changeTab']);

let props = defineProps({
  tabList: {
    type: Array,
    default: [{name: "关注", code: 0}, {name: "发现", code: 1}],
  },
  selectList: {
    type: Array,
    default: [],
  },
});
// tabs 列表
const tabList = ref(props.tabList)
// 选项列表
const selectList = ref(props.selectList)

let currentIndex = ref(1)
// 切换标签
const changeTab = (item) => {
  console.info("currentIndex", currentIndex.value)
  currentIndex.value = item.code
  emits('changeTab', item);
}
// 切换同城
const localPlace = () => {
  // currentIndex.value = 2
  uni.showToast({
    title: '功能待开发',
    icon: 'error'
  })
}
// 搜索
function search() {
  uni.navigateTo({
    url: '/pages/schoolForum/search/index'
  })
}
</script>

<style scoped lang="scss">
.header-1 {
  font-size: 16px;
  height: 44px;
  background-color: #fff;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
  margin: 10px 1px;
  justify-content: space-between;
  .header-1__tile{
    height: 2.5vh;
    text-align: center;
    padding-left: 15px;
    padding-right: 15px;
    color: rgb(96, 98, 102);
  }
  .header-1__right{
    right: 20px;
    height: 2.5vh;
    display: flex;
    padding-right: 10px;
  }
}
.choosed {
  color: #EC808D;
}
</style>