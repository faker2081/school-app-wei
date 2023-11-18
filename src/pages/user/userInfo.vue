<!-- 我的页面 -->
<template>
	<view v-show="showFlag">
		<view class="my_top">
			<view class="my_photo">
				<view class="my_phtot_img">
					<image src="../../static/img/home/morentouxiang@2x.png" alt="" style="width: 80px;height: 80px;border-radius: 40px;"/>
				</view>
			</view>
			<view class="my_phtot_p">
				<p style="font-size: 16px;font-weight: bold;width: 90%;margin: 0 auto;">
					{{name}}
				</p>
			</view>
		</view>
		<view  class="my_content">
			<view class="my_list">
				<view class="my_list_item my_list_item_border" @tap="toUpdatePhone()" v-if="phone">
					<image src="../../static/img/home/shoujihao@2x.png" alt=""/>
					<p>更换手机号</p>
					 <uni-icons type="arrowright" size="25"></uni-icons>
				</view>
				<view class="my_list_item my_list_item_border" @tap="toBindPhone()" v-else>
					<image src="../../static/img/home/shoujihao@2x.png" alt=""/>
					<p>绑定手机号</p>
					 <uni-icons type="arrowright" size="25"></uni-icons>
				</view>
				<view class="my_list_item" @tap="toEditPassword()">
					<image src="../../static/img/home/mima@2x.png" alt=""/>
					<p>密码修改</p>
					<uni-icons type="arrowright" size="25"></uni-icons>
				</view>
			</view>
			<view class="tcdl">
				<button type="primary" style="color: #1977FF;background-color: #fff; font-weight: bold;height: 50px;line-height: 50px;"  @tap="bindLogout">退出登录</button>
			</view>
		</view>
	</view>

</template>

<script setup>
import {reactive, ref, getCurrentInstance, watchEffect} from 'vue';
let name = ref("");
let phone = ref("");
let showFlag = ref(false);
let token = uni.getStorageSync("token");

import {onLoad, created} from '@dcloudio/uni-app'

// 获取路由传参
onLoad((option) => {
  let user = uni.getStorageSync("userInfo").user;
  phone.value = uni.getStorageSync("phone");
  if(user) {
    name.value = user.userName;
  }
});

created((option) => {
  if(!token){
    uni.navigateTo({
      url: '../login/login',
    });
    return;
  }
  showFlag.value = true;
  let user=uni.getStorageSync("userInfo").user;
  if(user){
    name.value = user.userName;
  }
});

let bindLogout =() => {
  uni.showLoading({
    title: '退出中',
    mask:true,
  });

  api.loginOut().then(res => {
    this.logout();
    uni.reLaunch({
      url: '../index/index',
    });
    uni.hideLoading();
  })
};

let toEditPassword=() =>{
  uni.navigateTo({
    url: '/pages/user/editPassword',
  });
};

let toBindPhone=() =>{
  uni.navigateTo({
    url: '/pages/user/editPassword',
  });
};

let toUpdatePhone=() =>{
  let phone = uni.getStorageSync("phone");
  if(phone) {
    uni.navigateTo({
      url: '/pages/user/updatePhone',
    });
  } else {
    uni.showToast({
      title: '未绑定手机号',
      icon: "none"
    });
  }
}

</script>

<style>
	.my_top {
	    width: 100%;
	    margin: 0 auto 20px;
	    height: 230px;
		  background-size: 100% 100%;
		  overflow: auto;
	}
	.my_photo {
	    width: 90px;
	    height: 90px;
	    border-radius: 50px;
	    background: #ffffff;
		overflow: hidden;
		margin: 30px auto; 
	}
	.my_phtot_img {
	    width: 80px;  
	    height: 80px;
		margin: 5px auto;
	    /* margin: 7px auto; */
	    border-radius: 43px;
	    /* background: #f47b42; */
	}
	.my_phtot_img img {
	    width: 100%;
	    height: 100%;
	}
	.my_phtot_p {
	    width: 100%;
		text-align: center;
	    color: #fff;
	}
	.my_content{
		height: calc(100vh  - 220px);
		margin-top: -34px;
		border-radius: 10px;
		background-color: #F5F5F5;
		overflow:auto
	}
	.my_list {
	    width: 90%;
	    margin: 7% 5%;
		padding: 0 5%;
		border-radius: 5px;
		background-color: #FFF;
	}
	.my_list_item {
	    width: 100%;
		padding: 0 5%;
	    height: 50px;
	    line-height: 50px;
	}
	.my_list_item image {
	    float: left;
	    margin-top: 15px;
		width: 20px;
		height: 20px;
	}
	.my_list_item p {
	    float: left;
	    color: #333333;
		padding: 0 5%;;
	    font-size: 14px;
	}
	.tcdl {
	    width: 90%;
	    margin: 10px auto 0;
	    height: 50px;
	    line-height: 50px;
	    border-radius: 5px;
	    color: #fff;
	}
	.uniui-arrowright{
		color:grey !important;
		float: right;
	}
	.my_list_item_border{
		border-bottom: 1px solid #D0D0D0;
		left:25px;
	}
	button::after{
		border:none!important;
	}
</style>
