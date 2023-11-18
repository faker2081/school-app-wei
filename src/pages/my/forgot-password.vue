<template>
    <view class="container">
        <view class="main-content">
            <view class="banner">
                <h3 class="font-title">找回密码</h3>
            </view>
            <view class="banner">
                <view class="input-view" :class="phone ? 'uni-input' : 'uni-input-grey'">
                    <input class="input-left" focus v-model="phone" placeholder="请输入手机号"/>
                    <text v-if="phone" class="icon-close" @click="close"></text>
                </view>
                <view class="button-view">
                    <uv-button class="button" style="" @click="nextStep">发送验证码</uv-button>
                </view>
            </view>
        </view>
    </view>
</template>
<script setup>
import {reactive, ref, getCurrentInstance, watchEffect} from 'vue';
let phone = ref('');
let close = () =>{
  phone.value = '';
};
let nextStep = ()=>{
  let reg = /^1[3456789]\d{9}$/;
  if (!reg.test(phone.value)) {
    uni.showToast({title: "请输入正确的手机号", icon: 'none'})
  }else{
    linkTo("/pages/my/forgot-verification?phone="+phone.value)
  }
};

//跳转公共方法
let linkTo= (url)=> {
  uni.navigateTo({
    url: url
  });
};
</script>

<style scoped>
    .container {
        width: 100%;
        height: 100vh;
        background: #f8f8f8;
        position: relative;
    }
    .main-content {
        width: 83%;
        margin-left: 7%;
        margin-right: 10%;
    }
    .banner {
        width: 100%;
        overflow: hidden;
    }
    .input-view{
        margin-top:25%;
        flex-wrap: nowrap;
        justify-content: flex-start;
        align-content: center;
        align-items: center;
        /*position: relative;*/
    }
    .input-left {
        width: 80%;
        float: left;
    }
    .uni-input{
        border-bottom: 1px solid #1977FF;
        min-height: 40px;
    }
    .uni-input-grey{
        border-bottom: 1px solid #9b9ba5;
        min-height: 40px;
    }
    .icon-close{
        background-size: cover;
        width: 21px;
        height: 21px;
        float: right;
    }
    .button-view{
        margin-top:30px;
    }
    .button{
        background-color: #1977FF;
        color: #ffffff;
        padding: 0px;
        border-radius: 2px;
    }
    .font-title {
        margin-top: 20%;
        letter-spacing: 4px;
        font-weight: 700;
        font-family: HarmonyOS Sans SC;
        font-size: 36px;
    }
</style>