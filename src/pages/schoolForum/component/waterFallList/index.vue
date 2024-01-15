<template>
    <scroll-view scroll-y="true"  :style="{flex:1}"
      :refresher-enabled="true" :lower-threshold="50" @scrolltolower="nextPage" :refresher-triggered="triggered"
      :refresher-threshold="80" refresher-background="rgb(244, 244, 244)" @refresherpulling="onPulling"
      @refresherrefresh="onRefresh" @refresherrestore="onRestore" @refresherabort="onAbort">
      <view>
        <view>
          <uv-waterfall  ref="waterfall" v-model="list" :add-time="10" @clear="clear" @changeList="changeList"
            :left-gap="leftGap" :right-gap="rightGap" :column-gap="columnGap">
            <template v-slot:list1>
              <!-- 为了磨平部分平台的BUG，必须套一层view -->
              <view >
                <view v-for="(item, index) in list1" :key="index" class="card-box">
                  <card :item="item"> </card>
                </view>
              </view>
            </template>
            <template v-slot:list2>
              <!-- 为了磨平部分平台的BUG，必须套一层view -->
              <view >
                <view v-for="(item, index) in list2" :key="index" class="card-box">
                  <card :item="item"> </card>
                </view>
              </view>
            </template>
            
          </uv-waterfall>
        </view>
          
        <view>
          <uv-load-more :status="loadStatus"></uv-load-more>
        </view>
        <view>
          <uv-gap height="100"></uv-gap>
        </view>
      </view>
    </scroll-view>
</template>

<script setup>
import {ref, reactive, watchEffect, getCurrentInstance, defineEmits, computed } from "vue";
import card from '@/pages/schoolForum/component/waterFallList/card';
import { onHide, onLoad, onReady, onShareTimeline } from "@dcloudio/uni-app";
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
    region: "",  // 筛选该地区的帖子，遵循格式
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

let props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})

// 列表数据
let list = ref(props.list);
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
  freshing.value = true;
  waterfall.value.clear();
  setTimeout(() => {
    triggered.value = true;
  }, 0);
  console.log('下拉刷新');
}
let onRefresh= async(e) => {
  if (freshing.value) return;
  triggered.value = 'restore';
  setTimeout(() => {
    freshing.value = false;
    triggered.value = false;
    console.log('刷新完成');
  }, 1000);
  //获取数据的函数
  queryForm.pageNo = 1; // 记录数
  list.value = await getData()
  freshing.value = false;
};

let onRestore= (e) => {
  triggered.value = 'restore'; // 需要重置
};

let onAbort= (e) => {
  console.log("onAbort");
};

let total = ref(0);
let nextPage = async(e) => {
  if (queryForm.pageNo * queryForm.pageSize < total.value) {
    queryForm.pageNo++;
    onReachBottom();
  }
};

function clear() {
    console.log('执行了clear')
  }

// 加载状态
const loadStatus = ref('more');
//触底加载更多
async function onReachBottom() {
  if(loadStatus.value == 'more') {
    loadStatus.value = 'loading';
    waterfall.value.clear();
    const data = await getData();
    list.value.push.apply(list.value,data);
    loadStatus.value = 'more';
  }
  if (list.value.length < total.value) {
      loadStatus.value = 'more';
    } else {
      loadStatus.value = 'noMore';
    }
}

// 切换tab 
async function switchTab() {
  list.value = [];
  waterfall.value.clear();
  list1.value = [];
  list2.value = [];
  const data = await getData();
  list.push.apply(list.value, data);
}

onLoad(() => {
  // initList();
})

onReady(() => {
  console.log('onReady')
  // waterfall.value.clear();
  // initList();
  // console.log(list.value)
})

// 如果页面还没渲染结束，页面就跳走，但此时@changeList回调还在返回数据，可能会造成渲染出错，所以要想办法停止渲染 
onHide(() => {
  // waterfall.value.clear();
})


// 获取数据
async function getData() {
  const res = await proxy.http.asyncPost(api.searchPostByCondition, queryForm);

  if (res.code === 200) {
    total.value = res.data.total;
    if(freshing.value){
      list1.value = [];
      list2.value = [];
      freshing.value = false;
    }
    console.log(res.data.list)
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
  waterfall.value.clear();
  list.value = await getData();
}


defineExpose({
  initList,
  switchTab,
  queryForm,
  freshing
})

</script>
<style scoped lang="scss">
.card-box {
  width: 350rpx;
  margin-bottom: 10rpx;
}
</style>