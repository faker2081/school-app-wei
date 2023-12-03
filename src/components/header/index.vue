<template>
  <view>
    <!-- 2.0.19支持autoBack，默认为false -->
    <uv-navbar
        :title="title"
        :bg-color="bgColor"
        :autoBack="autoBack"
        :leftIconSize="leftIconSize"
        :leftIconColor="leftIconColor"
        :titleStyle="{fontWeight: 600,fontSize:'36rpx'}"
        @leftClick="leftClick"
    >
    </uv-navbar>
  </view>
</template>
<script setup>
import {defineEmits, watchEffect} from 'vue'
let emits = defineEmits(['leftClick']);
const props = defineProps({
  // 标题
  title:{
    type:String,
    default:""
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
  },
  autoBack: {
    type: Boolean,
    default: true
  }
})
let leftClick=()=>{
  if(!props.autoBack) {
    emits('leftClick')
  }
}
watchEffect(()=>{
  console.log(props.title);
})
</script>
<style scoped lang="scss">

</style>