<template>
  <view class="box-all">
    <view class="">
      <baseInfoCard :userInfo="userInfo"></baseInfoCard>
    </view> 
    <Tabbar type="mine"></Tabbar>
  </view>
</template>
<script setup>
import { onShow } from "@dcloudio/uni-app";
import baseInfoCard from "./baseInfoCard.vue";

const userInfo = uni.getStorageSync('userInfo');
console.info(userInfo)
onShow(() => {
  uni.hideTabBar()
})
</script>
<style lang="scss" scoped>
.box-all {
  height: 100vh;
  overflow: hidden;
}
</style>