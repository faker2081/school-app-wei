<template>
  <view class="box-all">
    <view class="header-box">
      <HeaderSearch @search="search"></HeaderSearch>
    </view>
    <view class="content-box">
      <view class="block-box">
        <view class="block-box-title">
          <text> 历史记录 </text>
        </view>
      </view>
      <view class="block-box">
        <view class="block-box-title">
          <text> 猜你想搜 </text>
        </view>
      </view>
      <view class="list-box">
        <view class="block-box-title">
          <text> 热门发现 </text>
        </view>
      </view>
    </view>
  </view>
  
</template>

<script setup>

import { ref, getCurrentInstance, reactive } from 'vue'

const proxy = getCurrentInstance().proxy;

const context = ref();

function search(e) {
  context.value = e;
  if (!context.value) {
    uni.showToast({
      title: '请输入搜索内容',
      icon: 'none'
    })
    return;
  }
  toResult();
}

function toResult() {
  
  uni.navigateTo({
    url: '/pages/search/result?context=' + context.value
  })
}


</script>
<style scope lang="scss">
.box-all {
  height: 100vh;
  overflow: hidden;
}

</style>