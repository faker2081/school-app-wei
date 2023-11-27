<template>
  <view class="box-all">
    <view class="header-box">
      <view class="header-box">
        <HeaderSearch :keywordName="context" @search="search"></HeaderSearch>
      </view>
    </view>
    <view scroll-y="true" class="scroll-box">
      <waterFallList ref="waterfall" class="flex" :list="list"></waterFallList>
    </view>
  </view>
</template>
<script setup>
import { onLoad } from '@dcloudio/uni-app';
import { ref, getCurrentInstance, reactive } from 'vue'
import waterFallList from '../component/waterFallList/index';
const proxy = getCurrentInstance().proxy;

const props = defineProps({
  context: {
    type: String,
    default: "",
  }
})



let context = ref(props.context)

onLoad(() => {
  initWaterfall();
})

const waterfall = ref(null);
// 初始化搜索列表
function initWaterfall() {
  waterfall.value.queryForm.search.context = context.value;
  waterfall.value.initList();
}

// tabs值
const tabs = ref([
  {
    name: '全部',
    value: 'all'
  },
  {
    name: '用户',
    value: 'user'
  }
])
// 切换tabs
function switchTab() {
  
}
</script>
<style scoped lang="scss">
.box-all {
  height: 100vh;
  overflow: hidden;
}
.scroll-box{
  height: 100vh;
}
</style>