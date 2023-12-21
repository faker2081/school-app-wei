<template>
  <view>
    <view class="header-1" style="overflow-x: auto;">
      <uv-tabs
        :scrollable="true"
        :list="props.list"
        
        lineColor="#f56c6c"
        :activeStyle="{
          color: '#EC808D',
          fontWeight: 'bold',
          transform: 'scale(1.05)',
        }"
        :inactiveStyle="{
          color: '#606266',
          transform: 'scale(1)',
          fontSize: '14px',
        }"
        itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;"
        @change="changeTab"
        :current="currentIndex"
      ></uv-tabs>
      <view class="header-1__right" style="display: flex;">
      </view>
    </view>
  </view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app';
import { ref, defineProps } from 'vue'
import tages from '../../../../../data/tages';

let emits = defineEmits(['changeTab', "initTab"]);

const props = defineProps({
  list: {
    type: Array,
    default: () => tages.tags,
  },
})

let currentIndex = ref(1)
// 切换标签
const changeTab = (item) => {
  emits('changeTab', item);
}
function init(){
  emits('initTab', props.list[currentIndex.value]);
}

onLoad(() => {
  init();
})
</script>

<style scoped lang="scss">
::v-deep uni-page-body{
  overflow: hidden;
}
.header-1 {
  height: 18px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 15px;
  justify-content: flex-start;
  font-size: 10px!important;
  .header-1__right{
    height: 2.5vh;
    display: flex;
    text-align: center;
    padding-left: 15px;
    padding-right: 15px;
    color: rgb(96, 98, 102);
  }
}
.choosed {
  color: #EC808D;
}
</style>