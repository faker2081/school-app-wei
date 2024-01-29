<template>
  <view class="box-all"> 
    <view class="top">
      <!-- <uv-icon size="22" name="setting" color="#3c9cff"></uv-icon> -->
    </view>
    <view class="body">
      <view class="base-info">
        <view class="avatar">
          <uv-avatar size="70" :src="baseUrl + userInfo.photoUrl" mode="aspectFill"></uv-avatar>
        </view>
      </view>
      <view class="follow-data">
        <text style="width: 100rpx;">关注：</text><text>{{ userInfo.followNum }}</text>
        <text style="width: 100rpx; margin-left: 20px">粉丝：</text><text>{{ userInfo.followerNum }}</text>
      </view>
      <view class="follow-data">
        <text style="width: 100rpx;">昵称：</text><text>{{ userInfo.name ? userInfo.name : '--' }}</text>
      </view>
      <view class="follow-data">
        <text style="width: 100rpx;">地区：</text><text>{{ userInfo.region ? userInfo.region : '--' }}</text>
      </view>
    </view>
    <view class="footer">
      <view style="float: right; padding: 3px; margin-right: 10px;">
        <uv-button type="text" size="20" @click="edit"> 
              <text style="color: #3c9cff ">编辑</text> 
        </uv-button>
      </view>
    </view>
    <view class="base-data">
        <view class="interaction">
          <uv-icon size="28" name="plus-circle"></uv-icon>
          <text>{{ userInfo.myPostNum }}</text>
        </view>
        <view class="interaction">
          <uv-icon size="28" name="star"></uv-icon>
          <text>{{ userInfo.myCollectionPostNum }}</text>
        </view>
        <view class="interaction">
          <uv-icon size="28" name="thumb-up"></uv-icon>
          <text>{{ userInfo.myLikesPostNum }}</text>
        </view>
      </view>
    
  </view>
</template>

<script setup>
import baseUrl from '@/api/env.js'
const props = defineProps({
  userInfo: {
    type: Object,
    default: () => {},
  }
})

// 跳转到编辑信息页面
function edit() {
  uni.navigateTo({
    url: '/pages/my/infoForm',
  })
}

</script>

<style scoped lang="scss">
.top{
  width: 100%;
  text-align: right;
}
.box-all{
  margin: 2px;
  height: 100vh;
  background-color: aqua ;
  overflow: hidden;
  height: auto !important;;
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.body{
  margin-top: 40px;
  width: 98%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .avatar{
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  
  .follow-data{
    display: flex;
    align-items: center;
    color: #999;
    width: auto;
    .title{
      font-size: 12px;
    
    }
    .content{
      font-size: 14px;
      margin-left: 10px;
    }
  }
  
}
.base-data{
  text-align: justify;
  width: 99%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: nowrap;
  .interaction{
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }
}
</style>