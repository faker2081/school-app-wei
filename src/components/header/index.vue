<template>
  <view>
    <!-- 2.0.19支持autoBack，默认为false -->
    <uv-navbar
        :title="title"
        :autoBack="true"
        :bg-color="bgColor"
        :leftIconSize="leftIconSize"
        :leftIconColor="leftIconColor"
        :titleStyle="{fontWeight: 600,fontSize:'36rpx'}"
        @leftClick="leftClick"
    >
    </uv-navbar>
  </view>
</template>
<script setup>
import {ref, getCurrentInstance, watchEffect} from 'vue'
const props = defineProps({
  // 标题
  title:{
    type:String,
    default:"123"
  },
  // 背景色
  bgColor:{
    type:String,
    default:'rgb(244,244,244)'
  },
  // 返回图标大小
  leftIconSize:{
    type:String,
    default:'40rpx'
  },
  leftIconColor:{
    type:String,
    default:'#000'
  }
})
let leftClick=()=>{

}
watchEffect(()=>{
  console.log(props.title);
})
</script>
<style scoped lang="scss">

</style>