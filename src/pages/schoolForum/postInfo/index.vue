<template>
  <view class="box-all">
    <view class="header-box">
      <Header-user v-if="postInfo" :postInfo="postInfo" :userName="postInfo.userName"></Header-user>
    </view>
    <view class="content-box">
      <view class="post-box">
        <info-card :item="postInfo"></info-card>
      </view>
      <view class="comment-box">
        <view v-for="item in postInfo.postCommentVoList" :key="item.id">
          TODO 评论 
          <h-comment-box></h-comment-box>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import {ref, getCurrentInstance, watchEffect, reactive} from 'vue'
import { onLoad, onReady } from '@dcloudio/uni-app'
import infoCard from '../component/postInfo/infoCard.vue';
import postApi from '@/api/post/index.js'

const proxy = getCurrentInstance().proxy;

let postInfo = ref({})
onLoad( (options) => {
  if(options.item){
    postInfo.value = JSON.parse(decodeURIComponent(options.item));
    console.info("headerUser onLoad", postInfo.value)
  }
   getPost();
})
// 获取用户信息
const userInfo = uni.getStorageSync('userInfo');

const post = reactive({});
async function getPost() {
  const res = await proxy.http.asyncGet(postApi.getPostDetail(userInfo.id, postInfo.value.id));
  if(res.code === 200){
    Object.assign(post, res.data);
    console.info("postInfo", post)
  }
}

// 整理评论信息
let commentList = ref();
function getComments() {
  
}
onReady(() => {
})



</script>

<style lang="scss" scoped>

.content-box {
  background-color: aquamarine;
  width: 100%;
  .post-box {
    align-items: center;
    padding: 10px 0;
    
    width: 100%;
  }
}



.comment-box {
  padding: 10px 0;
}

</style>