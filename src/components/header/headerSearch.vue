<template>
  <view>
    <!-- 2.0.19支持autoBack，默认为false -->
    <uv-navbar
        :autoBack="true"
        :bg-color="bgColor"
        :leftIconSize="leftIconSize"
        :leftIconColor="leftIconColor"
        :titleStyle="{fontWeight: 600,fontSize:'36rpx'}"
    >
      <template #center>
        <uv-search placeholder="请输入搜索内容" shape="round" v-model="keyword" @change="change"
                  bgColor="#ffffff"  height="56rpx" box-style="flex:none;" margin="0 90rpx"
                   :inputStyle="{width:'250rpx'}" :actionStyle="{color:'#3775F6'}"
        ></uv-search>
      </template>
    </uv-navbar>
  </view>
</template>
<script setup>
import {ref, getCurrentInstance, watchEffect} from 'vue'

const props = defineProps({
  // 背景色
  bgColor: {
    type: String,
    default: 'linear-gradient(to bottom, rgb(234, 239, 246) 60%, rgba(244,244,244,1))'
  },
  // 返回图标大小
  leftIconSize: {
    type: String,
    default: '40rpx'
  },
  leftIconColor: {
    type: String,
    default: '#000'
  }
})
const keyword = ref(null)
let change = () => {

}
</script>
<style scoped lang="scss">
::v-deep .uv-navbar__content {
  background-color: transparent;
}

</style>