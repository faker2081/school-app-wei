<template>
  <view class="box-all">
    <view class="header-box">
      <Header-user v-if="postInfo" :postInfo="postInfo" :userName="postInfo.userName"></Header-user>
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
import postApi from '@/api/post/index.js'

const proxy = getCurrentInstance().proxy;

let postInfo = ref({})
onLoad((options) => {
  console.info("headerUser onLoad", options)
  if(options.item){
    postInfo.value = JSON.parse(decodeURIComponent(options.item));
  }
})

// 获取用户信息
const userInfo = uni.getStorageSync('userInfo');

const post = reactive({});
async function getPost() {
  const res = await proxy.http.asyncGet(postApi.getPostDetail(userInfo.id ,props.id));
  if(res.code === 200){
    Object.assign(postInfo, res.data);
  }
}

onReady(() => {
})



</script>

<style lang="scss" scoped>


</style>