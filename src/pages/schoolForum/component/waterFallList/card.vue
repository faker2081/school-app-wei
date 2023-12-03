<template>
  <view class="waterfall-item">
    <view class="waterfall-item__image"  @click="contentInfo">
      <uv-image v-if="item.postPhotoUrl" observeLazyLoad :src="baseUrl + item.postPhotoUrl" mode="aspectFit" :style="{width:item.width+'px'}"></uv-image>
      <uv-image v-else src="" mode="aspectFit" :style="{width:item.width+'px'}"></uv-image>
    </view>
    <view class="waterfall-item__ft">
      <view class="waterfall-item__ft__desc uv-line-2" @click="contentInfo">
        <text class="content-text">{{item.postText}}</text>
      </view>
      <view class="waterfall-item__ft__btn">
        <view class="waterfall-item__ft__btn__avatar" @click="createrInfo">
          <!-- TODO: 头像路径 -->
          <uv-avatar size="30" :src="baseUrl + item.userPhotoUrl"></uv-avatar>
          <view class="name">{{ item.userName }}</view>
        </view>
        <view class="waterfall-item__ft__btn__like" @click="like">
          <uv-icon size="28" name="thumb-up"></uv-icon>
          <text class="value">{{ item.likeNum }}</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup>
import { ref } from 'vue'
import baseUrl from '@/api/env.js'


console.info(baseUrl)
let props = defineProps({
  item: {
    type: Object,
    default: () => {}
  }
})

// 设置图片样式
let imageStyle = (item) => {
  return item=>{
    const v = uni.upx2px(750) - this.leftGap - this.rightGap - this.columnGap;
    const w = v/2;
    const rate = w / item.w;
    const h = rate* item.h;
    return {
      width: w + 'px',
      height: h + 'px'
    }
  }
}

// 获取作者信息
function createrInfo() {
  uni.navigateTo({
    //TODO: 跳转到作者信息页面
  })
}

// 获取内容信息
function contentInfo() {
  uni.navigateTo({
    //TODO: 跳转到内容信息页面
  })
}

// 点赞
function like() {
  // TODO: 点赞接口
  uni.showToast({
    title: '点赞成功',
    icon:'success',
    duration: 1000
  })
}

</script>
<style scoped lang="scss">
$show-lines: 1;
@import '@/uni_modules/uv-ui-tools/libs/css/variable.scss';
.waterfall-item {
  overflow: hidden;
  margin-top: 10px;
  border-radius: 6px;
}
.waterfall-item__ft {
  padding: 20rpx;
  background: #fff;
  &__title {
    margin-bottom: 10rpx;
    line-height: 48rpx;
    font-weight: 700;
    .content-text{
      font-size: 32rpx;
      color: #303133;
      max-height: 10vh;
    }
    .value {
      font-size: 32rpx;
      color: #303133;
    }
  }
  &__desc .value {
    font-size: 28rpx;
    color: #606266;
  }
  &__btn {
    padding: 10px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    align-content: space-around;
    align-items: center;
    &__avatar {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
      align-content: space-around;
      align-items: center;
      .name {
        font-size: 14px;
        color: #303133;
        width: 110rpx;
        overflow: hidden;
        text-overflow:ellipsis!important;
        white-space:nowrap
      }
    }
    &__like {
      font-size: 14px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
      align-content: space-around;
      align-items: center;
      .value  {
        font-size: 14px;
        color: #303133;
        width: 80rpx;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space:nowrap
      }
    }
  }
}


</style>