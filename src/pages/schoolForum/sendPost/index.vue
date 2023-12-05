<template>
  <view class="box-all">
    <view class="header-box">
      <Header title="发布贴子" ></Header>
    </view>
    <view class="content-box" :style="{marginTop: topHeight.top + 10 + 'px'}">
      <uv-form v-model="formData" ref="form" :rules="rule" errorType="message" labelPosition="left">
        <uv-form-item prop="postTitle" >
          <view class="input-view" :class="formData.postTitle? 'uni-input' : 'uni-input-grey'">
            <uv-input border="bottom" v-model="formData.postTitle" placeholder="请输入标题（选填）" maxlength="40"/>
          </view>
        </uv-form-item>
        <uv-form-item borderBottom prop="postText">
            <uv-textarea style="margin: 0px 10px;" v-model="formData.postText" count placeholder="请输入内容" maxlength="5000" height="120"/>
        </uv-form-item>
        <uv-form-item borderBottom prop="fileList">

        </uv-form-item>
        <uv-form-item borderBottom prop="tags">

        </uv-form-item>
        
      </uv-form>
    </view>
  </view>
</template>

<script setup>
import {ref, getCurrentInstance, watchEffect, reactive} from 'vue'
import post from '@/api/post/index'

const userInfo = uni.getStorageSync('userInfo');

let formData = ref({
  userId: userInfo.id,
  postTitle:"",
  postText:"",
  tags: "其他", // 分隔符为;
  school: userInfo.university,
  region: userInfo.region,
  isPostAnonymous: 0, // 是否匿名（0代表不匿，1代表匿名）
  postPhoto: [], //可以上传多张，限制：至少一张
})

const rule = reactive({
  postTitle: [{
    type:'string',
    required: false,
    message: '请输入标题',
    trigger: ['blur', 'change']
  }],
})


</script>
<style scoped lang="scss">
.box-all{
  width: 100vw;
  height: 100vh;

  background:#FFF;
}
.input-view{
  position: fixed;
  left: 10px;
}


</style>