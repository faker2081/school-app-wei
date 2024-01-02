<template>
  <view class="post-item">
    <view class="post-item__image">
        <uv-image v-if="item.postPhotoUrl" observeLazyLoad mode="heightFix" :src="baseUrl + item.postPhotoUrl" ></uv-image>
      
    </view>
    <view class="post-item__content">
      <view class="">
        <text class="content-text">
          <uv-read-more show-height="100px" :toggle="true" ref="readMore">
            <rich-text style="word-break: break-all;" class="content" :nodes="item.postText"></rich-text>
          </uv-read-more>
        </text>
      </view>
      <view class="post-item__content__interaction">
        <view class="interaction" @click="collect">
          <uv-icon v-if="item.isUserCollectPost" color="#3775F6" size="28" name="star-fill"></uv-icon>
          <uv-icon v-else size="28" name="star"></uv-icon>
          <text class="">{{ item.collectionNum }}</text>
        </view>
        <view class="interaction" @click="like">
          <uv-icon v-if="item.isUserLikePost" color="#F53F3F" size="28" name="thumb-up-fill"></uv-icon>
          <uv-icon v-else size="28" name="thumb-up"></uv-icon>
          <text class="">{{ item.likeNum }}</text>
        </view>
        <view class="interaction" @click="comment">
          <uv-icon size="28" name="chat"></uv-icon>
          <text class="">{{ item.commentNum }}</text>
        </view>
        
      </view>
    </view>
  </view>
</template>
<script setup>
import { ref, getCurrentInstance } from 'vue'
import baseUrl from '@/api/env.js'
import { onReady } from '@dcloudio/uni-app'
import postApi from '@/api/post/index.js'

const {proxy} = getCurrentInstance();

console.info(baseUrl)
let props = defineProps({
  item: {
    type: Object,
    default: () => {}
  }
})
const userInfo = uni.getStorageSync("userInfo")
const readMore = ref(null)
onReady(() => {
  console.log('onReady')
  readMore.value.init()
})
//收藏
function collect() {
  if(props.item.isUserCollectPost){
    props.item.collectionNum -= 1;
    props.item.isUserCollectPost = false;
    console.info(userInfo)
    let res = proxy.http.asyncGet(postApi.cancelCollect(userInfo.id, props.item.id));
    if(res.code == 200){
      console.info('取消收藏成功')
    }else{
      console.info('取消收藏失败')
    }
  }else{
    props.item.collectionNum += 1;
    props.item.isUserCollectPost = true;
    console.info(userInfo)
    let res = proxy.http.asyncGet(postApi.collect(userInfo.id, props.item.id));
    if(res.code == 200){
      console.info('收藏成功')
    }else{
      console.info('收藏失败')
    }
  }
}
// 点赞
function like() {
  if(props.item.isUserLikePost){
    props.item.likeNum -= 1;
    props.item.isUserLikePost = false;
    console.info(userInfo)
    let res = proxy.http.asyncGet(postApi.cancelLike(userInfo.id, props.item.id));
    if(res.code == 200){
      console.info('取消点赞成功')
    }else{
      console.info('取消点赞失败')
    }
  }else{
    props.item.likeNum += 1;
    props.item.isUserLikePost = true;
    console.info(userInfo)
    let res = proxy.http.asyncGet(postApi.like(userInfo.id, props.item.id));
    if(res.code == 200){
      console.info('点赞成功')
    }else{
      console.info('点赞失败')
    }
  }
}

</script>
<style scoped lang="scss">
.post-item {
  padding: 10px;
  // width: 200%;
  margin-top: 35px;
  background: #f5f5f5;
  overflow: hidden;
  border-radius: 6px;
  &__image {
    display: block; 
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
  }
  &__content {
    padding: 15px;
    background: #fff;
    .content-text{
      font-size: 32rpx;
      color: #303133;
    }
    &__interaction{
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
    }
  }
}
.interaction{
  width: 200rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
}

</style>