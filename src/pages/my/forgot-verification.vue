<template>
    <view class="container">
        <view class="main-content">
            <view class="nav-bar line-height">
                <h3 class="font-title">请输入验证码</h3>
              <span class="f-tip">验证码已发送到+86&nbsp;&nbsp;{{form.phone}}</span>
            </view>
            <view class="banner">
                <view class="input-wrap">
                    <view :class="form.code.length == index ? 'input-blue' : 'input1'"  v-for="(item, index) in inputLen" :key="index">
                        <input type="number" @tap="onInput" disabled :value="form.code.length >= index + 1 ? form.code[index] : ''" style="height: 100%;"/>
                    </view>
                </view>
                <view style="float: right;margin-top: 7px;color: #787777;" :disabled="isLock">
                    <view v-if="isLock == false" @click="getVerificationCode">重新获取</view>
                    <view v-else>{{second}}s</view>
                </view>
                <!-- 实际监听 -->
                <input class="input2" v-if="isFocus" @blur="blurInput" @input="checkVerificationCode" v-model="form.code"
                       :maxlength="inputLen" :focus="true" />
            </view>
        </view>
    </view>
</template>
<script setup>

import {reactive, ref, getCurrentInstance, watchEffect} from 'vue';
import {onLoad} from '@dcloudio/uni-app'
import api from '@/api/login/login'

const {proxy} = getCurrentInstance();

let form = reactive({
      phone: '',
      code: '',
      verificationCode: ''}
);
let code = ref('');
let isLock = ref(false);
let second = ref(60);
let inputLen = ref(6);
let isFocus = ref(false);

let nextStep=()=>{
  linkTo("/pages/my/set-password?phone="+form.phone);
};

/**需要判断当前电话号是否存在用户，存在则获取验证码*/
let getVerificationCode= async()=>{
  let oParams = {
    phone: form.phone,
    bizCode: 'password'
  }
  let res = await proxy.http.asyncPost(api.sendCode, oParams);
  if (res.code === 0) {
    form.verificationCode = res.data;
    uni.showToast({title: '发送验证码成功'});
    let interval = setInterval(() => {
      --second.value;
    }, 1000);
    setTimeout(() => {
      clearInterval(interval);
      isLock.value = false;
    }, 60000);
    isLock.value = true;
    second.value = 60;
  } else if(res.code === 20004){
    isLock.value = false;
    uni.showToast({title: res.msg, icon: 'none'});
  } else {
    uni.showToast({title: res.msg, icon: 'none'});
    isLock.value = false;
  }
}
//跳转公共方法
let linkTo=(url)=> {
  uni.navigateTo({
    url: url
  });
};

let onInput=()=>{
  isFocus.value = true;
};

let blurInput=()=>{
  isFocus.value = false;
};

/**
 * 验证码校验
 */
let checkVerificationCode= async(e)=>{
  code.value = e.detail.value;
  if (code.value.length != 6) {
    return
  }
  let oParams = {
    phone: form.phone,
    bizCode: 'password'
  }
  let res = await proxy.http.asyncPost(api.checkVerifyCode, oParams);
  if (res.code === 0) {
    isLock.value = false;
    second.value = 60;
    clearTimeout(interval);
    nextStep();
  } else {
    uni.showToast({title: res.msg, icon: 'none'});
    form.code = "";
  }
};
// 获取路由传参
onLoad((option) => {
  form.phone = JSON.parse(option.phone);
  getVerificationCode();
});
</script>

<style lang="scss" scoped>
    .container {
        width: 100%;
        height: 100vh;
        background: #ffffff;
        position: relative;
    }
    .nav-bar {
        width: 83%;
        margin-left: 7%;
        margin-right: 10%;
    }
    .line-height{
        line-height: 2;
    }
    .font-title{
        margin-top: 20%;
        letter-spacing: 2px;
        font-weight: 700;
        font-family: HarmonyOS Sans SC;
        line-height: 44px;
        font-size: 36px;
    }
    .f-tip{
        color: #b2b1b1;
    }
    .main-content {
        width: 100%;
    }
    .banner {
        width: 83%;
        overflow: hidden;
        background: #ffffff;
        margin: 15% 10% 0 7%;
    }
    .input-view{
        margin-top:30px;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-content: center;
        align-items: center;
        position: relative;
    }
    .uni-input{
        border-bottom: 1px solid #1977FF;
        min-height: 2em;
    }
    .input-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 36px;
        .input1 {
            width: 15%;
            height: 50px;
            border-bottom: 1px solid #9b9ba5;
            text-align: center;
        }
        .input-blue {
            width: 15%;
            height: 50px;
            border-bottom: 1px solid #1977FF;
            text-align: center;
        }
    }
    .input2 {
        height: 0;
        width: 0;
    }
</style>