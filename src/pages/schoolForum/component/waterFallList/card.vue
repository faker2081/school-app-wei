<template>
  <view class="waterfall-item">
    <view class="waterfall-item__image"  @click="contentInfo(item)">
      <uv-image v-if="item.postPhotoUrl" observeLazyLoad :src="baseUrl + item.postPhotoUrl" :showError="true" mode="aspectFit" :style="{width:item.width+'px'}"></uv-image>
      <!-- <uv-image v-else src="" mode="aspectFit" :style="{width:item.width+'px'}"></uv-image> -->
    </view>
    <view class="waterfall-item__ft">
      <view class="waterfall-item__ft__desc uv-line-2" @click="contentInfo">
        <text class="content-text">{{item.postText}}</text>
      </view>
      <view class="waterfall-item__ft__btn">
        <view class="waterfall-item__ft__btn__avatar" @click="createrInfo">
          <uv-avatar size="30" :src="baseUrl + item.userPhotoUrl" mode="aspectFill"></uv-avatar>
          <view class="name">{{ item.userName }}</view>
        </view>
        <view class="waterfall-item__ft__btn__like" @click="like">
          <uv-icon v-if="item.isUserLikePost" color="#F53F3F" size="28" name="thumb-up-fill"></uv-icon>
          <uv-icon v-else size="28" name="thumb-up"></uv-icon>
          <text class="value">{{ item.likeNum }}</text>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup>
import { ref, getCurrentInstance } from 'vue'
import baseUrl from '@/api/env.js'
import postApi from '@/api/post/index.js'

const {proxy} = getCurrentInstance();
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
function contentInfo(item) {
  uni.navigateTo({
    url: '/pages/schoolForum/postInfo/index?item=' + encodeURIComponent(JSON.stringify(item)),
  })
}
const userInfo = uni.getStorageSync("userInfo")
// 点赞
async function like() {
  if(props.item.isUserLikePost){
    props.item.likeNum -= 1;
    props.item.isUserLikePost = false;
    let res = await proxy.http.asyncGet(postApi.cancelLike(userInfo.id, props.item.id));
    if(res.code == 200){
      console.info('取消点赞成功')
    }else{
      console.info('取消点赞失败')
    }
  }else{
    props.item.likeNum += 1;
    props.item.isUserLikePost = true;
    let res = await proxy.http.asyncGet(postApi.like(userInfo.id, props.item.id));
    if(res.code == 200){
      console.info('点赞成功')
    }else{
      console.info('点赞失败')
    }
  }
}

</script>
<style scoped lang="scss">
$show-lines: 1;
@import '@/uni_modules/uv-ui-tools/libs/css/variable.scss';
.waterfall-item {
  border: #333130 solid 1px;
  background: #fff;
  overflow: hidden;
  margin-top: 10px;
  border-radius: 6px;
  &__image {
    width: 50%;
    display: flex;
    max-height: 70vh;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
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
    background: #fff;
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