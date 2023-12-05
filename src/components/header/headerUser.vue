<template>
  <view class="header-search">
    <!-- 2.0.19支持autoBack，默认为false -->
    <uv-navbar
        :autoBack="autoBack"
        :bg-color="bgColor"
        :leftIconSize="leftIconSize"
        :leftIconColor="leftIconColor"
        :titleStyle="{fontWeight: 600,fontSize:'36rpx'}"
        @leftClick="leftClick"
    >
      <template #center>
        <view class="center-box">
          <view class="user-info">
            <uv-avatar size="35" :src="baseUrl + postInfo.userPhotoUrl"></uv-avatar>
            <view class="name">{{ postInfo.userName }}</view>
          </view>
          <view class="right-box">
            <view class="follow">
              <!--关注按钮-->
              <view class="follow-icon"  @click="handleFollow">
                <uv-button v-if="!followStatus" icon="plus-circle" text="关注" shape="circle" :plain="true" iconColor="info"> </uv-button>
                <uv-button v-else icon="minus-circle" text="取消关注" shape="circle" :plain="true" iconColor="info"> </uv-button>
              </view>
            </view>
            <view class="share">
              <view class="share-icon">
                <uv-icon size="28" name="share"></uv-icon>
              </view>
            </view>
          </view>
        </view>
      </template>
    </uv-navbar>
  </view>
</template>
<script setup>
import {ref, getCurrentInstance, watchEffect, defineEmits, reactive} from 'vue'
import baseUrl from '@/api/env.js'
import userApi from '@/api/user/user.js'
import postApi from '@/api/post/index.js'

let emits = defineEmits(['leftClick']);

const {proxy} = getCurrentInstance();
const props = defineProps({
  // 返回图标大小
  leftIconSize:{
    type:String,
    default:'40rpx'
  },
  leftIconColor:{
    type:String,
    default:'#000'
  },
  // 背景色
  bgColor:{
    type:String,
    default:'rgb(244,244,244)'
  },
  userName: {
    type: String,
    default: ''
  },
  autoBack: {
    type: Boolean,
    default: true
  },
  postInfo: {
    type: Object,
    default: () => {}
  }
})

let leftClick=()=>{
  if(!props.autoBack) {
    emits('leftClick')
  }
}

// 获取用户信息
const post = reactive({});
async function gePost() {
  const res = await proxy.http.asyncGet(postApi.getOtherInfo(props.id));
  if (res.code === 200) {
    Object.assign(createrInfo, res.data);
  }
}

let followStatus = ref(false);
async function handleFollow() {
  // 关注接口
  if(!followStatus.value) {
    if(!await follow()) return;
  } else {
    if(!await unfollow()) return;
  }
  followStatus.value =!followStatus.value;
}
// 获取用户信息
const userInfo = uni.getStorageSync('userInfo');
// 关注
async function follow() {
  const res = await proxy.http.asyncPost(userApi.followUser(userInfo.id , id));
  if (res.code === 200) {
    uni.showToast({
      title: '关注成功',
      icon:'success',
      duration: 1000
    })
    return true;
  }
  uni.showToast({
      title: '关注失败',
      icon:'success',
      duration: 1000
    })
  return false;
}
// 取消关注
async function unfollow() {
  const res = await proxy.http.cancelFollowUser(userApi.unfollowUser(userInfo.id, item.userId));
  if (res.code === 200) {
    uni.showToast({
      title: '取消关注成功',
      icon:'success',
      duration: 1000
    })
    return true;
  }
  uni.showToast({
      title: '取消关注失败',
      icon:'success',
      duration: 1000
    })
    return false;
    
}

</script>
<style lang="scss" scoped>
::v-deep .uv-navbar__content {
  background-color: transparent;
}

.center-box {
  position: fixed;
  right: 10px;
  width: 80%;
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  .user-info {
    position: fixed;
    left: 160rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    align-content: space-around;
    align-items: center;
    .name {
      margin-left: 3px;
      font-size: 14px;
      color: #303133;
      width: 110rpx;
      overflow: hidden;
      text-overflow: ellipsis!important;
      white-space: nowrap
    }
  }
  .right-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    
   .follow {
      font-size: 14px;
      margin-right: 40rpx;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
      align-content: space-around;
      align-items: center;
    }
   .share {
      font-size: 14px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
      align-content: space-around;
    }
  }
}


</style>