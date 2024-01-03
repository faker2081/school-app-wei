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
          <h-comment-box @remove="removeComment" @sendComment="sendComment"></h-comment-box>
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
// 评论相关
const keyName  = { 
                    // 一级评论相关
                    id: 'id', // 评论id
                    user_id: 'user_id', // 用户id
                    user_name: 'user_name', // 用户名
                    user_avatar: 'user_avatar', // 用户头像
                    user_content: 'user_content', // 用户评论内容
                    user_date: 'user_date', // 用户评论时间
                    user_is_like: 'user_is_like', // 用户是否点赞
                    user_like_num: 'user_like_num', // 用户点赞数
                    isLoading: 'isLoading', // 是否显示加载中
                    allReply: 'allReply', // 评论总数
                    isMyComment:'isMyComment', // 是否是自己的评论
                    // 二级评论相关
                    user_reply_list: 'user_reply_list',  // 回复列表
                    user_reply_id: 'user_reply_id', // 回复人id
                    user_reply_name: 'user_reply_name', // 回复人名字
                    user_reply_avatar: 'user_reply_avatar', // 回复人头像
                    user_reply_content: 'user_reply_content', // 回复 内容
                    user_reply_date: 'user_reply_date', // 回复 时间
                    user_reply_is_like: 'user_reply_is_like', // 回复人是否点赞
                    user_reply_like_num: 'user_reply_like_num', // 回复人点赞数
                    pid: 'pid',
                    user_isMyComment:'user_isMyComment', // 是否是自己的评论
                    to_user_name: 'to_user_name', // 被回复人名字
                    to_user_id: 'to_user_id', // 被回复人id
                  };
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