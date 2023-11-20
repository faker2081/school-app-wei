<template>
  <view class="container">
    <view style="height: 89vh;">
      <view class="nav-bar">
        <h3 class="font-title"><span class="top-title">欢迎来到，</span><br/><span class="top-title-end">AI智能监控服务中心</span></h3>
      </view>
      <view class="nav-bar">
        <view class="banner">
          <view class="input-view" :class="form.loginName ? 'uni-input' : 'uni-input-grey'">
            <input class="input-left" focus v-model="form.loginName" placeholder="请输入用户名"/>
            <text v-if="form.loginName" class="icon-close" @click="close(2)"></text>
          </view>
          <view class="input-view" style="margin-top:10px;" :class="form.loginPwd ? 'uni-input' : 'uni-input-grey'">
            <input class="input-left" password v-model="form.loginPwd" placeholder="请输入密码"/>
            <text v-if="form.loginPwd" class="icon-close" @click="close(3)"></text>
          </view>
          <view class="button-view">
            <uv-button class="button" @click="accountLogin">登录</uv-button>
          </view>
          <view>
            <view class="forget" @click="forgotPassword">忘记密码</view>
          </view>
        </view>
      </view>
      <view class="phone-button-view">
        <uv-button class="phone-login-button" @click="changeLoginPage">验证码登录</uv-button>
      </view>
    </view>
  </view>
</template>
<script setup>
   import {reactive, ref, getCurrentInstance, watchEffect} from 'vue';
   import {getAES} from '@/utils/crypto'
   import api from '@/api/login/login'
   import config from '@/common/config'


   const {proxy} = getCurrentInstance();

   const form = reactive({
     loginName: '',
     loginPwd: ''
   });

   // 账号登录
   let accountLogin = async (e) => {
    uni.navigateTo({
      url: '/pages/schoolForum/index/index'
    });
    //  if (!form.loginName || !form.loginPwd) {
    //    uni.showToast({title: '用户名或密码不能为空', icon: 'none'});
    //    return;
    //  }
    //  let res = await proxy.http.asyncPost(api.accountLogin, {
    //    username: form.loginName.trim(),
    //    password: getAES(form.loginPwd),
    //    grant_type: 'password',
    //  }, true, "HEADER_JSON", "password", true);
    //  if (res.code === 0) {
    //    //存token
    //    uni.setStorageSync('token', res.data.accessToken);
    //    getLoginInfo();
    //    getMenu();
    //  } else {
    //    uni.showToast({title: res.msg, icon: 'none'});
    //  }
   }

   // 获取用户信息
   let getLoginInfo = async (e) => {
     let res = await proxy.http.asyncGet(api.getLoginInfo, {},true);
     if (res.code === 0) {
       //登录成功，并返回用户信息和主体信息
       uni.setStorageSync('userInfo', res.data);
       uni.setStorageSync('phone', res.data.user.phone);
       uni.setStorageSync('permissions', res.data.permissions);
        console.info(JSON.stringify(res.data.permissions) + '==============');
       linkToIndex();
     } else {
       uni.showToast({title: res.msg, icon: 'none'});
     }
   }

   // 获取用户菜单
   let getMenu = async (e) => {
     let res = await proxy.http.asyncGet(api.getMenu, {},true);
     if (res.code === 0) {
       let list = res.data || [];
       let menus = list.filter(item => {
         if (item.menuSource.indexOf(config.MENU_SOURCE) !== -1) {
           return item;
         }
       })
       console.info(JSON.stringify(menus) + '=============')
       uni.setStorageSync('menus', menus);
     } else {
       uni.showToast({title: res.msg, icon: 'none'});
     }
   }

   // 调整到首页
   let linkToIndex = async (e) =>{
     uni.navigateTo({
       url: '/pages/purchase/index/index'
     });
   }

   // 忘记密码
   let forgotPassword = (e) => {
     uni.navigateTo({
       url: "/pages/my/forgot-password"
     });
   }
   
   // 验证码登录
   let changeLoginPage = (e) => {
     uni.navigateTo({
       url: '/pages/login/phone-login'
     });
   }

   let close = (e) =>{

   }
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    height: auto;
    background: #ffffff;
    position: relative;
  }

  .nav-bar {
    width: 83%;
    margin-left: 7%;
    margin-right: 10%;
  }

  .top-title {
    font-size: 36px;
  }

  .top-title-end {
    font-size: 20px;
  }

  .line-height {
    line-height: 2;
  }

  .font-title {
    margin-top: 20%;
    letter-spacing: 4px;
    font-weight: 700;
    font-family: HarmonyOS Sans SC;
  }

  .banner {
    width: 100%;
    overflow: hidden;
    background: #ffffff;
  }

  .input-view {
    margin-top: 15%;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
  }

  .input-left {
    width: 80%;
    float: left;
  }

  .uni-input {
    border-bottom: 1px solid #1977FF;
    min-height: 40px;
  }

  .uni-input-grey {
    border-bottom: 1px solid #E7E7E7;
    min-height: 40px;
  }

  .forget {
    float: right;
    margin-top: 7%;
    color: #000000;
  }

  .icon-close {
    //background-image: url("../../static/img/home/shanchu@2x.png");
    background-size: cover;
    width: 21px;
    height: 21px;
    float: right;
  }

  .button-view {
    margin-top: 15%;
  }

  .button {
    background: #0256FF;
    border: 1px solid #0256FF;
    color: #ffffff;
    padding: 0px;
    border-radius: 2px;
  }

  .phone-button-view {
    width: 83%;
    margin-left: 7%;
    margin-right: 10%;
    position: absolute;
    bottom: 5%;
  }

  .phone-login-button{
    border: 1px solid #266FE8;
    background: #ffffff;
    color: #000000;
    border-radius: 2px;
  }
</style>
