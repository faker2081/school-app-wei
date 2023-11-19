<template>
  <view class="box" style="overflow: hidden;">
		<view class="tab-box"  style="overflow: hidden;">
      <uv-tabs :list="tabList" lineColor="#3775F6" lineWidth="24" lineHeight="2"
           :activeStyle="{fontWeight: 'bold',color:'var(--uni-text-color-blue)'}"
           :itemStyle="{padding:`${padding}`,lineHeight:'44px',fontSize:'16px'}"
           :inactive-style="{color:'rgba(0,0,0,.9)'}"
           @click="changeTab" ></uv-tabs>
    </view>
		<view class="bottom-copyright" >
      <view>以上内容没有你想要的答案?</view>
      <view>可加入微校源用户QQ群「{{ qqGroup }}」获取帮助</view>
		</view>
	</view>
</template>

<script setup>

import {ref, reactive, getCurrentInstance,onMounted} from "vue";
import { onLoad } from "@dcloudio/uni-app";
const tabList = [{ name: '注册与登录', code: 1 }, { name: '学生认证', code: 2 }]

// qq群
const qqGroup = '898999888'

// 注册与登录问题
const loginProblems = ref(null)
const getLoginProblems = () => {
  // TODO 获取登录问题
}

// 学生认证问题
const studentProblems = ref(null)
const getStudentProblems = () => {
  // TODO 获取学生认证问题
}

// 监听tab切换
const current = ref(1)
const changeTab = (e) => {
  current.value = e.code;
	// if (e.code == 1) {
	// 	getLoginProblems()
	// } else if (e.code == 2) {
	// 	getStudentProblems()
	// }
}
</script>
<style scoped lang="scss">
  @import '@/static/css/index.scss';
</style>