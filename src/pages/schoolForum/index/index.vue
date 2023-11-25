<template>
  <view class="box-all">
    <view class="header-box">
      <tabsBar-1></tabsBar-1>
      <tabsBar-2></tabsBar-2>
    </view>
    <view class="content-box">
      <waterFallList :list="list"></waterFallList>
    </view>
    <Tabbar type="user"></Tabbar>
  </view>
</template>

<script setup>
import tabsBar1 from '../component/tabs/tabsBar-1/index';
import tabsBar2 from '../component/tabs/tabsBar-2/index';
import waterFallList from '../component/waterFallList/index';
import { ref } from 'vue'

const list = ref([
  {
    title: '标题1',
    desc: '描述1',
    img:'',
    like: 100,
    contentInfo: 100,
    createrInfo: 100
  },
  {
    title: '标题2',
    desc: '描述2',
    img:'',
    like: 100,
    contentInfo: 100,
    createrInfo: 100
  },
  {
    title: '标题3',
    desc: '描述3',
    img:'',
    like: 100,
    contentInfo: 100,
    createrInfo: 100
  },
])
</script>
<style scoped lang="scss">
.box-all {
  overflow: hidden;
}
</style>