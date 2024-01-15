<template>
  <view class="info-box-all">
    <view class="base-info">
      <baseInfoCard :userInfo="userInfo"></baseInfoCard>
    </view> 
    <Tabbar type="mine"></Tabbar>
  </view>
</template>
<script setup>
import { onShow } from "@dcloudio/uni-app";
import baseInfoCard from "./baseInfoCard.vue";
import { getCurrentInstance, ref } from "vue";
import userApi from '@/api/user/user.js'

const {proxy} = getCurrentInstance();

const userInfo = ref(uni.getStorageSync('userInfo'));

// 刷新用户信息
async function refresh(){
  let res = await proxy.http.asyncGet(userApi.getInfo(userInfo.value.id), {}, "HEADER_JSON");
  if (res.code === 200) {
    //存用户信息
    uni.setStorageSync('userInfo', res.data);
    userInfo.value = uni.getStorageSync('userInfo');
  } else {
    uni.showToast({title: res.msg, icon: 'none'});
  }
}
onShow(() => {
  uni.hideTabBar();
  refresh();
})
</script>
<style lang="scss" scoped>
.info-box-all {
  height: 100vh;
  overflow: hidden;

}
</style>