<template>
  <scroll-view scroll-y="true" class="list-box">
    <uv-waterfall ref="waterfall" @clear="clear">
      <template v-slot:list1>
        <!-- 为了磨平部分平台的BUG，必须套一层view -->
        <view >
          <view v-for="(item, index) in list1" :key="index">
            <card :item="item"> </card>
          </view>
        </view>
      </template>
      <template v-slot:list2>
        <!-- 为了磨平部分平台的BUG，必须套一层view -->
        <view >
          <view v-for="(item, index) in list1" :key="index">
            <card :item="item"> </card>
          </view>
        </view>
      </template>
    </uv-waterfall>

    <uv-load-more :status="loadStatus"></uv-load-more>
  </scroll-view>
</template>

<script setup>
import {ref, reactive, watchEffect, getCurrentInstance, defineEmits } from "vue";
import card from '@/pages/schoolForum/component/waterFallList/card';
import { onHide, onShareTimeline } from "@dcloudio/uni-app";

let {proxy} = getCurrentInstance();

let emits = defineEmits(['like', 'contentInfo', 'userInfo']);
let prpos = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})

// 列表数据
let list = ref(prpos.list);
let list1 = ref([]);
let list2 = ref([]);

const waterfall = ref(null);
// 下拉刷新数据
async function onPullDownRefresh() {
    list.value = [];
    waterfall.value.clear();
    list1.value = [];
    list2.value = [];
    const { data } = await getData();
    list = data;
    uni.showToast({
      icon: 'success',
      title: '刷新成功'
    })
    uni.stopPullDownRefresh();
  }

function clear() {
    console.log('执行了clear')
  }

// 加载状态
const loadStatus = ref('loadmore');
//触底加载更多
async function onReachBottom() {
  if(loadStatus.value == 'loadmore') {
    loadStatus.value = 'loading';
    const { data } = await getData();
    list.push.apply(list.value,data);
    loadStatus.value = 'loadmore';
  }
}
// 如果页面还没渲染结束，页面就跳走，但此时@changeList回调还在返回数据，可能会造成渲染出错，所以要想办法停止渲染 
onHide(() => {
  waterfall.value.clear();
})

</script>