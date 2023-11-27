<template>
  <scroll-view scroll-y="true" class="list-box"
    :refresher-enabled="true" :lower-threshold="50" @scrolltolower="nextPage"
    :refresher-threshold="80" refresher-background="#FFF" @refresherpulling="onPulling"
    @refresherrefresh="onRefresh" @refresherrestore="onRestore" @refresherabort="onAbort">
    <uv-waterfall ref="waterfall" v-model="list" :add-time="10" @clear="clear" @changeList="changeList"
      :left-gap="leftGap" :right-gap="rightGap" :column-gap="columnGap">
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
          <view v-for="(item, index) in list2" :key="index">
            <card :item="item"> </card>
          </view>
        </view>
      </template>
    </uv-waterfall>

    <uv-load-more :status="loadStatus"></uv-load-more>
  </scroll-view>
</template>

<script setup>
import {ref, reactive, watchEffect, getCurrentInstance, defineEmits, computed } from "vue";
import card from '@/pages/schoolForum/component/waterFallList/card';
import { onHide, onLoad, onShareTimeline } from "@dcloudio/uni-app";
import api from '@/api/post/index';

let {proxy} = getCurrentInstance();

// 用户信息
const userInfo = uni.getStorageSync('userInfo');
// 查询表单
let queryForm = reactive({
  pageNo: 1, // 页码
  pageSize: 10,  // 条数
  search: {
    userId: userInfo.id,
    region: "吉林省;长春市",  // 筛选该地区的帖子，遵循格式
    context: "",
    school: "",  // E，筛选该学校的帖子
    tag: "工作",  // E，筛选具有该标签的帖子
    type: 1,

  }
});
// 刷新与加载设置
let freshing =  ref(false);             //
let triggered =  ref(false);            //
let emptyFlag =  ref(false); 

// 瀑布流设置
const leftGap = 10
const rightGap = 10
const columnGap = 10

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

function changeList(e){
  console.log(e.name)
  switch (e.name){
    case 'list1':
      list1.value.push(e.value);
      break;
    case 'list2':
      list2.value.push(e.value);
      break;
  }
}

const waterfall = ref(null);
// 下拉刷新数据
async function onPulling(e) {
  freshing.value = false;
  setTimeout(() => {
    triggered.value = true;
  }, 1000);
}
let onRefresh= (e) => {
  if (freshing.value) return;
  triggered.value = 'restore';
  setTimeout(() => {
    freshing.value = false;
    triggered.value = false;
  }, 1000);
  //获取数据的函数
  queryForm.pageNo = 1; // 记录数
  getData()
};

let onRestore= (e) => {
  triggered.value = 'restore'; // 需要重置
};

let onAbort= (e) => {
  console.log("onAbort");
};

let total = ref(0);
let nextPage= (e) => {
  if (queryForm.pageNo * queryForm.pageSize < total.value) {
    queryForm.pageNo++;
    onReachBottom();
  }
};

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
    list.value.push.apply(list.value,data);
    loadStatus.value = 'loadmore';
  }
  if (dataList.value.length < total.value) {
      loadingType.value = 'loadmore';
    } else {
      loadingType.value = 'noMore'; //没有数据时显示‘没有更多’
    }
}

// 切换tab 
async function switchTab() {
  list.value = [];
  waterfall.value.clear();
  list1.value = [];
  list2.value = [];
  const { data } = await getData();
  list.push.apply(list.value, data);
}

// 如果页面还没渲染结束，页面就跳走，但此时@changeList回调还在返回数据，可能会造成渲染出错，所以要想办法停止渲染 
onHide(() => {
  waterfall.value.clear();
})


// 获取数据
async function getData() {

  const res = await proxy.http.asyncPost(api.findPageNoTenantId, queryForm);

  if (res.code === 200) {
    total.value = res.data.total;
    return res.data.list;
  }else{
    uni.showToast({
      title: res.msg,
      icon: 'none'
    })
  }
  return [];
}

// 初始化列表
async function initList() {
  list.value = getData();
}

defineExpose({
  initList,
  switchTab,
  queryForm
})

</script>