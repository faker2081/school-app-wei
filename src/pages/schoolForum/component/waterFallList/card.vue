<template>
  <view class="waterfall-item">
    <view class="waterfall-item__image" :style="[imageStyle(props.item)]" @click="contentInfo">
      <image :src="item.image" mode="widthFix" :style="{width:item.width+'px'}"></image>
    </view>
    <view class="waterfall-item__ft">
      <view class="waterfall-item__ft__desc uv-line-2" @click="contentInfo">
        <text class="value">{{item.desc}}</text>
      </view>
      <view class="waterfall-item__ft__btn">
        <view class="waterfall-item__ft__btn__avatar" @click="createrInfo">
          <!-- TODO: 头像路径 -->
          <uv-avatar src="https://via.placeholder.com/200x200.png/2878ff"></uv-avatar>
          <text class="name">{{ item.name }}</text>
        </view>
        <view class="waterfall-item__ft__btn__like" @click="like">
          <uv-icon name="thumb-up"></uv-icon>
          <text class="value">{{ item.like }}</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup>
import { ref } from 'vue'

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
  }
}
</style>