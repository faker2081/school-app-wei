<template>
  <view class="plan-box">
    <view class="title-box">
      <text class="plan-title">109号档口米面油采购需求</text>
      <text class="plan-title-type"></text>
    </view>
  </view>
</template>
<script setup>

</script>
<style scoped lang="scss">
.plan-box {
  @include form-box(24rpx);
  .title-box {
    align-items: flex-start;
    justify-content: space-between;
    display:flex;
    .plan-title {
      font-weight: 600;
      font-size: var(--uni-font-size-18);
    }
    .&-type {
      font-size: var(--uni-font-size-14);
      color:var(--uni-text-color-blue);
      &.red {
        color:var(--uni-text-color-red);
      }
    }
  }

}
</style>