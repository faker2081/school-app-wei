<template>
  <view class="box-all">

    <Tabbar type="mine"></Tabbar>
  </view>
</template>
<script setup>
import { onShow } from "@dcloudio/uni-app";


onShow(() => {
  uni.hideTabBar()
})
</script>
<style lang="sss" scoped>

</style>