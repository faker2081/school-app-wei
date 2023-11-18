<template>
  <view class="container">
    <view style="height: 90vh;">
      <view class="nav-bar">
        <h3 class="font-title"><span class="top-title">用户绑定</span></h3>
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
        </view>
      </view>
    </view>
  </view>
</template>
<script setup>
import {reactive, ref, getCurrentInstance, watchEffect} from 'vue';
const {proxy} = getCurrentInstance();
let form = reactive({
  loginName: '',
  loginPwd: '',
});
let unionid = ref('');
let openid = ref('');
let editName = ref('');					// 用户昵称
let mobile = ref('');           //手机号

// 登录
let accountLogin = () =>{
    if (!form.loginName || !form.loginPwd) {
      uni.showToast({title: '用户名或密码不能为空', icon: 'none'});
      return;
    }
    form.unionid = unionid;
    form.openid = openid;
    login.accountLogin(form).then(res => {
      if (res.code === 0) {
        let accessToken = res.data.accessToken;
        saveUnionid(accessToken);
      } else {
        uni.showToast({title: res.msg, icon: 'none'});
      }
    });
};
// 绑定
let saveUnionid=(accessToken)   =>{
    login.wechatBinding(form.loginName ,unionid).then(res => {
    if (res.code === 0) {
      //存token
      uni.setStorageSync('token', accessToken);
      uni.showToast({
        icon: 'none',
        mask: true,
        title: '用户绑定成功',
        duration: 1000
      });
    getLoginInfo();
      setTimeout(() => {
        uni.switchTab({
          url: '/pages/purchase/index/index'
        });
      }, 1000)
    }else{
      uni.showToast({title: res.msg, icon: 'none'});
    }
  });
};
// 获取用户信息
let getLoginInfo=() => {
  login.getLoginInfo().then(res => {
    if (res.code === 0) {
    //登录成功，并返回用户信息和主体信息
    uni.setStorageSync('userInfo', res.data);
    uni.setStorageSync('phone', res.data.user.phone);
    } else {
    uni.showToast({title: res.msg, icon: 'none'});
    }
  })
};
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
    min-height: 2em;
  }

  .uni-input-grey {
    border-bottom: 1px solid #E7E7E7;
    min-height: 40px;
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

</style>
