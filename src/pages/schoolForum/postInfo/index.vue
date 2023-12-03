<template>
  <view class="box-all">
    <view class="header-box">
      <header-user :id="props.postId" :userName="postInfo.userName"></header-user>
    </view>
    <view class="content-box">
      <view class="post-box">
        TODO 贴子 
      </view>
      <view class="comment-box">
        <view v-for="item in postInfo.postCommentVoList" :key="item.id">
          TODO 评论 
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import {ref, getCurrentInstance, watchEffect, reactive} from 'vue'
import { onLoad, onReady } from '@dcloudio/uni-app'
import post from '@/api/post/index.js'

// 获取用户信息
const userInfo = uni.getStorageSync('userInfo');
const props = defineProps({
  postId: {
    type: String,
    default: ''
  }
})

const postInfo = reactive({});
function getPostInfo() {
  const res = post.getPostDetail(userInfo.id ,props.postId);
  if(res.code === 200){
    Object.assign(postInfo, res.data);
  }
}

onReady(() => {
  if(props.postId) {
    getPostInfo();
  }
})



</script>

<style lang="scss" scoped>


</style>