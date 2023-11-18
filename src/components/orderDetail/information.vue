<template>
  <view class="distribution-box">
    <h1>{{title}}</h1>
    <view class="text-message-box pt">
      <text>{{'订单编号'}}</text>
      <text>{{form.orderCode}}</text>
    </view>
    <view class="text-message-box">
      <text>{{'下单时间'}}</text>
      <text>{{form.orderTime}}</text>
    </view>
    <view class="text-message-box">
      <text>{{'订单备注'}}</text>
      <text>{{form.remark}}</text>
    </view>
  </view>
</template>
<script setup>
const props = defineProps({
  title:{
    type:String,
    default:''
  },
  form:{
    type:Object,
    default:{},
  }
})
</script>
<style scoped lang="scss">
.distribution-box {
  @include form-box(20rpx);
  padding: 24rpx;
  h1 {
    font-size: var(--uni-font-size-16);
  }
  .text-message-box {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    font-size: var(--uni-font-size-14);
    color: var(--uni-text-color);
    padding:16rpx 0;
    &.pt {
      padding: 24rpx 0 16rpx;
    }
    text{
      &:first-child{
        color: var(--uni-text-input-color);
      }
      &:last-child{
        max-width: 396rpx;
      }
    }
  }
}
</style>