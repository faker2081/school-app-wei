<template>
  <view class="box-all">
    <view class="header-box">
      <tabsBar1 @changeTab="changeTab1"></tabsBar1>
      <tabsBar2 v-if="waterFallListRef" @changeTab="changeTab2" @initTab="changeTab2"></tabsBar2>
    </view>
    <view class="content-box scroll-box">
      <waterFallList class="flex" ref="waterFallListRef" ></waterFallList>
    </view>
    <Tabbar  type="home"></Tabbar>
  </view>
</template>

<script setup>
import tabsBar1 from '../component/tabs/tabsBar-1/index';
import tabsBar2 from '../component/tabs/tabsBar-2/index';
import waterFallList from '../component/waterFallList/index';
import { ref, getCurrentInstance, reactive } from 'vue'
import { onLoad, onReady, onShow } from '@dcloudio/uni-app';

const proxy = getCurrentInstance().proxy;

// 切換一级标签
function changeTab1(e) {
  console.log(e)
}
// 切換二级标签
function changeTab2(e) {
  console.log(e)
  waterFallListRef.value.freshing = true;
  waterFallListRef.value.queryForm.search.tag = e.name;
  waterFallListRef.value.initList();
}

const waterFallListRef = ref();
onShow(() => {
  uni.hideTabBar()
})

onReady(() => {
})



// init();

</script>
<style scoped lang="scss">
.container {
  height: calc(100vh - 100rpx);
  overflow-y: auto;
}
.box-all {
  height: 100vh;
  overflow: hidden;
}
.scroll-box {
  height: 80vh;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: scroll;
}
.header-box{
  height: 120px;
  overflow: hidden;
}
.flex {
  flex: 1;
  overflow-y: scroll;
}
</style>