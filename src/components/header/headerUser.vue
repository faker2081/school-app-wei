<template>
  <view class="headerSearch">
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
            <uv-avatar size="30" :src="baseUrl + createrInfo.userPhotoUrl"></uv-avatar>
            <view class="name">{{ userName }}</view>
          </view>
          <view class="right-box">
            <view class="follow">
              <!--关注按钮-->
              <view class="follow-icon"  @click="handleFollow">
                <uv-button v-if="followStatus" icon="plus" text="关注" shape="circle" :plain="true" iconColor="info"> </uv-button>
                <uv-button v-else icon="minus" text="取消关注" shape="circle" :plain="true" iconColor="info"> </uv-button>
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
import user from '@/api/user/user.js'

const {proxy} = getCurrentInstance();
const props = defineProps({
  // 贴子信息
  id: {
    type: Object,
    default: () => {}
  },
  userName: {
    type: String,
    default: ''
  },
})

// 获取用户信息
const createrInfo = reactive({});
async function getCreaterInfo() {
  const res = await proxy.http.asyncGet(user.getOtherInfo(id));
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
  const res = await proxy.http.asyncPost(user.followUser(userInfo.id , id));
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
  const res = await proxy.http.cancelFollowUser(user.unfollowUser(userInfo.id, item.userId));
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
  .user-info {
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
      text-overflow: ellipsis!important;
      white-space: nowrap
    }
  }
  .right-box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    align-content: space-around;
    align-items: center;
   .follow {
      font-size: 14px;
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