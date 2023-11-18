<template>
  <scroll-view class="list-all" scroll-y="true" refresher-enabled="true" :refresher-triggered="triggered"
               :lower-threshold="50"
               @scrolltolower="nextPage"
               :refresher-threshold="80" refresher-background="#FFF" @refresherpulling="onPulling"
               @refresherrefresh="onRefresh" @refresherrestore="onRestore" @refresherabort="onAbort">
    <view v-if="emptyFlag" class="no-data">
      <view class="no-data-tit">
        暂无数据
      </view>
    </view>
    <view v-if="!emptyFlag">
      <view  class="order-box" v-for="(item, index) in dataList" :key="index" @click="showOrder(item)">
        <view class="title-name">
          <view class="title">
            <view class="icon-text">合作</view>
            <h1>{{ '白山师范第一食堂' }}</h1>
          </view>
          <view class="status-text">{{ '待受理' }}</view>
        </view>
        <scroll-view :scroll-x="true" style="width: 100%" class="scroll-none">
          <view class="image-box">
            <image src="@/static/image/order-bg.png" mode="aspectFill" v-for="i in 7"></image>
          </view>
        </scroll-view>
        <view class="detile-box">
          <view class="dis">配送时间：<view class="time">{{ '2023 - 03 - 03 19:36:36' }}</view></view>
          <view class="dis">收货地址：<view class="time">{{ '吉林省长春市高新区栖乐会购物广场G座' }}</view></view>
        </view>
        <view class="button-box">
          <button class="grey-button">接单</button>
          <button class="red-button">退单</button>
          <button class="red-button">改单中 </button>
        </view>
        <view class="price-box">
          <view>
            <h1>¥<span>{{ 66.7 }}</span></h1>
            <view class="piece">共{{3}}件</view>
          </view>
        </view>
      </view>
      <uni-load-more :status="loadingType" :content-text="contentText"/>
    </view>
  </scroll-view>
</template>

<script setup>

import api from '@/api/school/order/order'
import {ref, reactive, watchEffect, getCurrentInstance, defineEmits,onMounted} from "vue";
const {proxy} = getCurrentInstance();
const props = defineProps({
  type:{
    type:String,
  }
})
let queryForm =  reactive({         // 查询条件
  pageSize: 10, //	页号
  pageNum: 1 // 记录数
});
let total =  ref(0);                //  总数
let dataList = reactive([]);      // 数据列表

let freshing =  ref(false);             //
let triggered =  ref(false);            //
let emptyFlag =  ref(false);            //
let loadingType =  ref( 'noMore');      //
let contentText =reactive( { // 加载提示
  contentdown: "上拉显示更多",
  contentrefresh: "正在加载...",
  contentnomore: "没有更多数据了"
});

let onPulling = (e) => {
  freshing.value = false;
  setTimeout(() => {
    triggered.value = true;
  }, 1000)
  console.log("下拉刷新了")
}

let onRefresh= (e) => {
  if (freshing.value) return;
  triggered.value = 'restore';
  setTimeout(() => {
    freshing.value = false;
    triggered.value = false;
  }, 1000)
  //获取数据的函数
  queryForm.pageNum = 1 // 记录数
  getListData()
}

let onRestore= (e) => {
  triggered.value = 'restore'; // 需要重置
}

let onAbort= (e) => {
  console.log("onAbort");
}
let nextPage= (e) => {
  if (queryForm.pageNum * queryForm.pageSize < total.value) {
    queryForm.pageNum++;
    getListData()
  }
}

let searchList =(e) => {
  queryForm.pageNum = 1;
  getListData()
}

// 账号登录
let getListData = async (e) => {
  loadingType.value = 'loading';
  let res = await proxy.http.asyncPost(api.castoffList, queryForm);
  if (res.code === 0) {
    total.value = res.data.total;
    dataList = queryForm.pageNum === 1 ? res.data.records : dataList.concat(res.data.records);
    if (dataList.length < total.value) {
      loadingType.value = 'more';
    } else {
      loadingType.value = 'noMore'; //没有数据时显示‘没有更多’
    }
    if (dataList.length > 0) {
      emptyFlag.value = false
    } else {
      emptyFlag.value = true
    }
  } else {
    uni.showToast({title: res.msg, icon: 'none'});
  }
}

const emit = defineEmits(['showOrder'])
// 查看详情
let showOrder = (item) => {
  emit('showOrder', item)
}

watchEffect(()=>{

  console.log(props.type)
})

searchList()
</script>
<style scoped lang="scss">
.list-all {
  width: 100%;
  height: calc(100vh - 150px);
  overflow: auto;
}
.order-box {
  @include form-box(24rpx);
}
.title-name {
  justify-content: space-between;
   @include flex-center  ;
  margin-top: 24rpx;
  & > .title {
     @include flex-center  ;
  }
  h1 {
    font-size: var(--uni-font-size-16);
    color:var(--uni-text-color)
  }
  .status-text {
    color: var(--uni-text-input-color);
    font-size: var(--uni-font-size-14);
  }
}
.image-box {
  margin-top: 24rpx;
  height: 144rpx;
   @include flex-center  ;

  image {
    flex-shrink: 0;
    width: 144rpx;
    height: 100%;
    border-radius: 16rpx;
    margin-right: 16rpx;
  }
}
.icon-text {
  @include icon-text(linear-gradient(152deg, #F69836 7%, #FABE46 76%),0,0);
  padding: 4rpx 8rpx;
}
.detile-box {
  padding-top: 24rpx;
  color: var(--uni-text-color-grey);
  font-size: var(--uni-font-size-14);
  position: relative;
  .dis {
    line-height: 44rpx;
     @include flex-center  ;
    align-items: flex-start;
    &:last-child {
      padding-bottom: 130rpx;
    }
    & > .time {
      flex: 1;
      color: var(--uni-text-input-color);
    }
  }
}
.price-box {
  background-color: rgba(255,255,255,.8);
  width: 118rpx;
  height: 144rpx;
  position: absolute;
  right: 24rpx;
  top: 90rpx;
  justify-content: center;
   @include flex-center  ;
  h1 {
    font-size: var(--uni-font-size-12);
    color: var(--uni-text-color);
    display: flex;
    align-items: baseline;
    justify-content: flex-start;
    & > span {
      font-size: var(--uni-font-size-16);
    }
  }
  .piece {
    text-align: center;
    font-size: var(--uni-font-size-12);
    color: var(--uni-text-color-grey);
  }
}

</style>