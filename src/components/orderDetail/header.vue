<template>
  <view class="header-box">
    <h1>{{ title }}</h1>
    <view class="remark" :style="{'color':color}">{{remark}}</view>
  </view>
</template>
<script setup>
const props = defineProps({
  // 标题
  title:{
    type:String,
    default:'退换货'
  },
  //注释
  remark:{
    type:String,
    default:''
  },
  color:{
    type:String,
    default:'#FF0000'
  }
})
</script>
<style scoped lang="scss">
.header-box {
  @include form-box(0);
  padding: 24rpx 24rpx;
  h1 {
    font-size: var(--uni-font-size-16);
    color: var(--uni-text-color);
  }
  .remark {
    padding-top: 8rpx;
    font-size: var(--uni-font-size-12);
    color:var(--uni-text-color-red)
  }
}
</style>