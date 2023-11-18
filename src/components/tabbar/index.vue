<template>
  <uv-tabbar :value="value" @change="change" :fixed="true" activeColor="#3775F6"
             inactiveColor="rgb(0,0,0,.9)">
    <uv-tabbar-item text="首页">
      <template #inactive-icon>
        <view class="iconfont icon-home"></view>
      </template>
      <template #active-icon>
        <view class="iconfont icon-home active-color"></view>
      </template>
    </uv-tabbar-item>
    <uv-tabbar-item text="消息">
      <template #inactive-icon>
        <view class="iconfont icon-message"></view>
      </template>
      <template #active-icon>
        <view class="iconfont icon-message active-color"></view>
      </template>
    </uv-tabbar-item>
    <uv-tabbar-item text="我的">
      <template #inactive-icon>
        <view class="iconfont icon-mine"></view>
      </template>
      <template #active-icon>
        <view class="iconfont icon-mine active-color"></view>
      </template>
    </uv-tabbar-item>
  </uv-tabbar>
</template>
<script setup>
import {ref} from "vue";

const value = ref(0)
let change=index=>{
  console.log(index)
  value.value = index;
  switch (index) {
    case 1:
      break;
    case 2:
      break;
    case 3:
      break;
    default:
      break;
  }
}

</script>
<style scoped lang="scss">
.active-color {
  color: #3775F6;
}
</style>