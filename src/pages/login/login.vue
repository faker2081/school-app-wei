<template>
  <view class="container">
    <view style="height: 89vh;">
      <view class="nav-bar">
        <h3 class="font-title"><span class="top-title">欢迎来到，</span><br/><span class="top-title-end">微校园</span></h3>
      </view>
      <view class="nav-bar">
        <view class="banner">
          <view class="input-view"  :class="formData.telephone ? 'uni-input' : 'uni-input-grey'">
            <uv-form :model="formData" ref="form" :rules="rule" errorType="message">
              <uv-form-item prop="telephone">
                <input class="input-left" maxlength="11" minlength="11" type="tel" focus v-model="formData.telephone" placeholder="请输入电话号码"/>
              </uv-form-item>
              
            </uv-form>
            
          </view>
          <!-- <view class="input-view" style="margin-top:10px;" :class="form.loginPwd ? 'uni-input' : 'uni-input-grey'">
            <input class="input-left" password v-model="form.loginPwd" placeholder="请输入密码"/>
            <text v-if="form.loginPwd" class="icon-close" @click="close(3)"></text>
          </view> -->
          <view class="button-view">
            <uv-button class="button" @click="accountLogin">一键登录</uv-button>
            <uv-button class="button" @click="accountRegister">一键注册</uv-button>
          </view>
          <view>
            <view class="forget" @click="forgotPassword">忘记密码</view>
          </view>
        </view>
      </view>
      <!-- <view class="phone-button-view">
        <uv-button class="phone-login-button" @click="changeLoginPage">验证码登录</uv-button>
      </view> -->
    </view>
  </view>
</template>
<script setup>
   import {reactive, ref, getCurrentInstance, watchEffect} from 'vue';
   import {getAES} from '@/utils/crypto'
   import api from '@/api/login/login'
   import config from '@/common/config'


   const {proxy} = getCurrentInstance();

   const formData = reactive({
     loginName: '',
     loginPwd: '',
     telephone: '',
   });

   const rule = reactive({
    telephone: [{
      type: 'string',
      required: true,
      message: '请输入手机号码',
      trigger: ['blur', 'change']
    },
    {
      validator: (rule, value, callback) => {
        return proxy.validate.validatePhone(value)
      },
      message: '请输入正确手机号码',
      trigger: ['blur', 'change']
    }],
  })

  const form = ref(null)
   // 账号登录
   let accountLogin = async (e) => {
    form.value.validate().then(async(valid) => {
      console.info(valid)
      let res = await proxy.http.asyncGet(api.login(formData.telephone), {}, "HEADER_JSON");
      console.info(res)
      if (res.code === 200) {
        //存用户信息
        uni.setStorageSync('userInfo', res.data);
        uni.navigateTo({
          url: '/pages/schoolForum/index/index'
        });
        //  getLoginInfo();
        //  getMenu();
      } else {
        uni.showToast({title: res.msg, icon: 'none'});
      }
    })
     
   }

let accountRegister = async (e) => {
    form.value.validate().then(async(valid) => {
      console.info(valid)
      let res = await proxy.http.asyncGet(api.register(formData.telephone), {}, "HEADER_JSON");
      console.info(res)
      uni.showToast({title: res.msg, icon: 'none'});
    })
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
