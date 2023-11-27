<template>
  <view class="headerSearch">
    <!-- 2.0.19支持autoBack，默认为false -->
    <uv-navbar
        :autoBack="autoBack"
        :bg-color="bgColor"
        :leftIconSize="leftIconSize"
        :leftIconColor="leftIconColor"
        :titleStyle="{fontWeight: 600,fontSize:'36rpx'}"
        @leftClick="leftClick"
    >
      <template #center>
        <uv-search :placeholder="placeholderTitle"  shape="round" v-model="keyword" @search="change" @custom="change"
                  bgColor="#ffffff"  height="56rpx" box-style="flex:none;" margin="0 90rpx"
                   :inputStyle="{width:'265rpx'}" :actionStyle="{color:'#3775F6'}"
        ></uv-search>
      </template>
    </uv-navbar>
  </view>
</template>
<script setup>
import {ref, getCurrentInstance, watchEffect, defineEmits} from 'vue'

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
  },
  placeholderTitle: {
    type: String,
    default: '请输入搜索内容'
  },
  autoBack: {
    type: Boolean,
    default: true
  },
  keywordName: {
    type: String,
    default: ''
  },
})
const keyword = ref(null);
const emits = defineEmits(['search','leftClick']);
let change = () => {
  emits('search',keyword.value);
}
let leftClick=()=>{
  if(!props.autoBack) {
    emits('leftClick')
  }
}
keyword.value = props.keywordName;
</script>
<style lang="scss" scoped>
::v-deep .uv-navbar__content {
  background-color: transparent;
}

</style>