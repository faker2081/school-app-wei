<template>
  <view class="box-all">
    <view class="header-box">
      <tabsBar1></tabsBar1>
      <tabsBar2></tabsBar2>
    </view>
    <view class="content-box scroll-box">
      <waterFallList class="flex" ref="waterFallListRef" ></waterFallList>
    </view>
    <Tabbar type="home"></Tabbar>
  </view>
</template>

<script setup>
import tabsBar1 from '../component/tabs/tabsBar-1/index';
import tabsBar2 from '../component/tabs/tabsBar-2/index';
import waterFallList from '../component/waterFallList/index';
import { ref, getCurrentInstance, reactive } from 'vue'
import { onLoad, onReady } from '@dcloudio/uni-app';
import api from '@/api/post/index';
import login from '@/api/login/login'

const proxy = getCurrentInstance().proxy;


const waterFallListRef = ref();
async function init(){
  
}



onReady(() => {
  waterFallListRef.value.queryForm.search.tag = '工作';
  waterFallListRef.value.initList();
  init();
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