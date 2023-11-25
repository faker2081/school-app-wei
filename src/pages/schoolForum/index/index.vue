<template>
  <view class="box-all">
    <view class="header-box">
      <tabsBar-1></tabsBar-1>
      <tabsBar-2></tabsBar-2>
    </view>
    <view class="content-box scroll-box">
      <waterFallList class="flex" :list="list"></waterFallList>
    </view>
    <Tabbar type="user"></Tabbar>
  </view>
</template>

<script setup>
import tabsBar1 from '../component/tabs/tabsBar-1/index';
import tabsBar2 from '../component/tabs/tabsBar-2/index';
import waterFallList from '../component/waterFallList/index';
import { ref, getCurrentInstance } from 'vue'

const proxy = getCurrentInstance().proxy;
const list = ref([
  {
    title: '标题1',
    userName: '用户名1',
    postText: '描述1',
    postPhotoUrl:'/vCampus/31/post/266/8d0f9a859e444d0094c72ab73637308e.png;',
    userPhotoUrl:'/vCampus/31/head/bfe0be6e8d0d47a9b099c14594ae2ac5.png',
    likeNum: 1000,
    contentInfo: 100,
    createrInfo: 100
  },
  {
    title: '标题2',
    userName: '用户名2',
    postText: '描述2',
    postPhotoUrl:'/vCampus/31/post/265/097089e7e22d4feea68f0a9fc915fe77.png;',
    userPhotoUrl:'/vCampus/31/head/bfe0be6e8d0d47a9b099c14594ae2ac5.png',
    likeNum: 10000000,
    contentInfo: 100,
    createrInfo: 100
  },
  {
    title: '标题3',
    userName: '用户名3',
    postText: '描述3',
    postPhotoUrl:'',
    userPhotoUrl:'',
    likeNum: 100,
    contentInfo: 100,
    createrInfo: 100
  },
])


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