<template>
  <view class="container">
    <view style="height: 90vh;" v-if="phoneLoginFlag">
      <uni-nav-bar :fixed="true" status-bar background-color="#909399" left-icon="left" @clickLeft="backHome" font-size="24px" color="#FFFFFF" :border="border"></uni-nav-bar>
      <view class="order-image">
        <image :src="imgMinioPath+'/image/dingdong.png'" alt="" class="order-img"/>
      </view>
      <view class="nav-bar">
        <view class="banner">
          <view class="input-view" :class="form.phone ? 'uni-input' : 'uni-input-grey'">
            <input class="input-left" focus v-model="form.phone" placeholder="请输入手机号"/>
            <text v-if="form.phone" class="icon-close" @click="form.phone = ''"></text>
          </view>
          <view class="button-view">
            <uv-button class="button" @click="getVerificationCode">获取验证码</uv-button>
          </view>
        </view>
      </view>
    </view>
    <view v-if="!phoneLoginFlag">
      <uni-nav-bar :fixed="true" status-bar background-color="#909399" left-icon="left" @clickLeft="back" font-size="24px" color="#FFFFFF" :border="border">
      </uni-nav-bar>
      <view class="nav-bar line-height">
        <h3 class="font-title"><span class="top-title">请输入验证码</span></h3>
        <span class="f-tip">验证码已发送到+86&nbsp;&nbsp;{{form.phone}}</span>
      </view>
      <view class="nav-bar">
        <view class="banner">
          <view class="input-wrap">
            <view :class="form.code.length == index ? 'input-blue' : 'input1'"  v-for="(item, index) in inputLen" :key="index">
              <input type="number" @tap="onInput" disabled :value="form.code.length >= index + 1 ? form.code[index] : ''" style="height: 100%;"/>
            </view>
          </view>
          <view style="float: right;margin-top: 7px;color: #787777;" :disabled="isLock">
            <view v-if="isLock" @click="getVerificationCode">重新获取</view>
            <view v-else>{{second}}s</view>
          </view>
          <!-- 实际监听 -->
          <input class="input2" v-if="isFocus" @blur="blurInput" @input="login" v-model="form.code"
                 :maxlength="inputLen" :focus="true"/>
        </view>
      </view>
    </view>

  </view>
</template>

<script setup>
  import {reactive, ref, getCurrentInstance, watchEffect} from 'vue';
  const {proxy} = getCurrentInstance();
  import api from '@/api/login/login'
  import config from '@/common/config'
  const form = reactive({
    phone: '',
    code: '',
    loginName: '',
    loginPwd: '',
    verificationCode: '',
  });
  let phoneLoginFlag =  ref(true);
  let isLock = ref(true);
  let second = ref(60);
  let inputLen = ref(6);  // 验证码长度
  let isFocus = ref(false);  // 验证码长度
  let interval = reactive({});  // 定时器
  let imgMinioPath = ref(config.IMG_MINIO_PATH);

  let backHome = () =>{
    uni.navigateBack({
      delta: 1
    })
  }

  let back = () =>{
    phoneLoginFlag.value = true;
  }

  /**获取验证码*/
  let getVerificationCode = async () =>{
    let reg = /^1[3456789]\d{9}$/;
    if (!form.phone) {
      uni.showToast({title: "请输入手机号", icon: 'none'})
    } else if (!reg.test(form.phone)) {
      uni.showToast({title: "请输入正确的手机号", icon: 'none'})
    } else {
      let oParams = {
        phone: form.phone,
        bizCode: 'login'
      };
      let res = await proxy.http.asyncPost(api.sendCode, oParams);
      if (res.code === 0) {
        form.verificationCode = res.data;
        uni.showToast({title: '发送验证码成功'});
        phoneLoginFlag.value = false;
        timer();
      } else {
        uni.showToast({title: res.msg, icon: 'none'});
        isLock.value = true;
      }
    }
  }
  //验证码的倒计时
  let timer = () => {
    isLock.value = false;
    if (second.value > 0) {
      second.value--;
      interval = setTimeout(timer, 1000);
    } else {
      isLock.value = true;
      second.value = 60;
      clearTimeout(interval);
    }
  }
  /**手机号登录*/
  let login = () =>  {
    if(form.code.length < 6){
      return;
    }
    login.equalsSmsCode(form.phone, form.code).then(res => {
      if (res.code === 0) {
        uni.setStorageSync("phone",this.form.phone);
        let company = uni.getStorageSync('companyInfo');
        getCustomer(form.phone,company)
      } else {
        uni.showToast({title: res.msg, icon: 'none'});
      }
    });
  }
  let getCustomer=(phone,company) =>  {
    customer.getForApplet(phone,company.tenantId,company.createOrgId).then(r=>{
      if(r.code === 0){
        let customer = {};
        if(r.data){
          customer = r.data
        }else{
          customer.userLevelCode = 0;
        }
        uni.setStorageSync('customer',customer);
        uni.redirectTo({
          url: '/pages/order/index',
        });
      }
    })
  }
  /**清空输入框内容*/
  let letclose=(flag) =>   {
    if (flag === 1) {
      form.phone = '';
    } else if (flag === 2) {
      form.loginName = '';
    } else if (flag === 3) {
      form.loginPwd = '';
    }
  }

  let onInput=() =>   {
    isFocus.value = true;
  }

  let blurInput=() =>   {
    isFocus.value = false;
  }
  /**
   * 提交成功返回首页
   */
  let linkToIndex=() => {
    uni.switchTab({
      url: '/pages/purchase/index/index'
    });
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

  .font-title {
    margin-top: 20%;
    letter-spacing: 2px;
    font-weight: 700;
    font-family: HarmonyOS Sans SC;
    line-height: 44px;
  }

  .top-title {
    font-size: 36px;
  }

  .input-view {
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
    border-radius: 20px;
  }

  .banner {
    width: 100%;
    margin-top: 15%;
    overflow: hidden;
    background: #ffffff;
  }

  .f-tip {
    color: #b2b1b1;
    font-size: 16px;
    line-height: 24px;
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
      display: flex;
      border-bottom: 1px solid #1977FF;
      text-align: center;
    }
  }

  .input2 {
    height: 0;
    width: 0;
  }
  .order-image {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100px;
    margin: 15% auto;
  }
  .order-img {
    width: 166px;
    height: 23px;
  }
</style>
