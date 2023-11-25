<template>
  <uv-tabbar :value="value" @change="change" :fixed="true" activeColor="#EC808D"
             inactiveColor="rgb(0,0,0,.9)">
    <uv-tabbar-item text="首页" name="home">
      <template #inactive-icon>
        <view class="iconfont icon-home"></view>
      </template>
      <template #active-icon>
        <view class="iconfont icon-home active-color"></view>
      </template>
    </uv-tabbar-item>
    <uv-tabbar-item text="商城" name="shop">
      <template #inactive-icon>
        <view class="iconfont icon-guide"></view>
      </template>
      <template #active-icon>
        <view class="iconfont icon-guide active-color"></view>
      </template>
    </uv-tabbar-item>
    <uv-tabbar-item text="发帖" name="post">
      <template #inactive-icon>
        <view ><uv-icon name="plus-circle-fill" size="28"></uv-icon></view>
      </template>
      <template #active-icon>
        <view class="active-color"><uv-icon color="#EC808D" name="plus-circle-fill" size="28"></uv-icon></view>
      </template>
    </uv-tabbar-item>
    <uv-tabbar-item text="消息" name="message">
      <template #inactive-icon>
        <view class="iconfont icon-message"></view>
      </template>
      <template #active-icon>
        <view class="iconfont icon-message active-color"></view>
      </template>
    </uv-tabbar-item>
    <uv-tabbar-item text="我的" name="mine">
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
import {ref, getCurrentInstance} from "vue";
import config from '@/common/config'

let projectType = ref('');
projectType.value = config.PROJECT_TYPE;      // 默认系统登录名称

const props = defineProps({
  type: {         // 校园/供应商/配餐单位
    type: String,
    default: ''
  },
})

// 权限功能
// const {proxy} = getCurrentInstance();

// const {tabbar} = proxy.store();
let change = name => {
  // tabbar.$patch(state => {
  //   state.name = name;
  //   if(props.type) {
  //     state.type = props.type;
  //   }
  // })

  switch (name) {
    case 'home':
      // if (tabbar.type ==='user') {
        uni.switchTab({
          url: '/pages/schoolForum/index/index'
        });
      // } 
      // else if (tabbar.type ==='manager') {
      //   uni.switchTab({
      //     url: ''
      //   });
      // }
      break;
    case 'shop':
      // uni.switchTab({
      //   url: ''
      // });
      break;
    case 'post':
      // uni.switchTab({
      //   url: ''
      // });
      break;
    case 'message':
      // uni.switchTab({
      //   url: ''
      // });
      break;
    case 'mine':
      // uni.switchTab({
      //   url: ''
      // });
      break;
    default:
      break;
  }
}

</script>
<style scoped lang="scss">
.active-color {
  color: #EC808D;
}
</style>