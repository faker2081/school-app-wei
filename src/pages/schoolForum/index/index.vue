<template>
  <view class="box-all">
    <view class="header-box">
      <tabsBar-1></tabsBar-1>
      <tabsBar-2></tabsBar-2>
    </view>
    <view class="content-box">
      <waterFallList></waterFallList>
    </view>
  </view>
</template>

<script setup>
import tabsBar1 from '../component/tabs/tabsBar-1/index';
import tabsBar2 from '../component/tabs/tabsBar-2/index';
import waterFallList from '../component/waterFallList/index';
import { ref } from 'vue'

</script>
<style scoped lang="scss">
.box-all {
  overflow: hidden;
}
</style>