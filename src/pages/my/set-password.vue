<template>
    <view class="container">
        <view class="main-content">
            <view class="banner">
                <h3 class="font-title">设置新密码</h3>
            </view>
            <view class="banner">
                <view class="input-view" :class="form.loginPwd ? 'uni-input' : 'uni-input-grey'">
                    <input class="input-left" focus password v-model="form.loginPwd" placeholder="请输入新密码" maxlength="20"/>
                    <text v-if="form.loginPwd" class="icon-close icon-close-one" @click="close(1)"></text>
                </view>
                <view class="input-view" :class="form.reLoginPwd ? 'uni-input' : 'uni-input-grey'" style="margin-top:10px;">
                    <input class="input-left" password v-model="form.reLoginPwd" placeholder="再次输入新密码" maxlength="20"/>
                    <text v-if="form.reLoginPwd" class="icon-close icon-close-two" @click="close(2)"></text>
                </view>
                <view class="button-view">
                    <uv-button class="button" @click="submit">确定</uv-button>
                </view>
            </view>
        </view>
    </view>
</template>
<script setup>
import {reactive, ref, getCurrentInstance, watchEffect} from 'vue';
import {onLoad} from '@dcloudio/uni-app'
import api from '@/api/user/user'
const {proxy} = getCurrentInstance();

let form = reactive({
      loginPwd: '',
      reLoginPwd: '',
      phone: ''
    }
);

let submit = async()=> {
  let patt = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,}$/;
  if(!patt.test(form.loginPwd)){
    uni.showToast({title: "密码包含大小写字母、数字、特殊字符", icon: 'none'});
    return false;
  }
  if (form.loginPwd != form.reLoginPwd) {
    uni.showToast({title: '两次密码不一致，请修改后再保存', icon: 'none'});
    return false;
  }
  let res = await proxy.http.asyncPost(api.savePassword, form);
  if (res.code === 0) {
    uni.showToast({title: '修改密码成功'});
    linkTo("/pages/login/login");
  } else {
    uni.showToast({title: res.msg, icon: 'none'});
  }

};

//跳转公共方法
let linkTo=(url)=> {
  uni.navigateTo({
    url: url
  });
};
/**清空输入框内容*/
let close=(flag)=>{
  if(flag === 1){
    form.loginPwd = '';
  }else if(flag === 2){
    form.reLoginPwd = '';
  }
};

// 获取路由传参
onLoad((option) => {
  form.phone = JSON.parse(option.phone);
});
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
    .icon-close-one{
        top: 12%;
    }
    .icon-close-two{
        top: 18.5%;
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