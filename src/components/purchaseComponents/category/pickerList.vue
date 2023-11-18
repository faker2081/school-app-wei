<template>
  <view >
    <uv-vtabs
        :chain="false"
        :list="mainClassify"
        hdHeight="100rpx"
        :bar-item-active-line-style="{background: '#3775F6',height:'40rpx',margin:'auto',width:'8rpx',borderRadius:'0px 4px 4px 0px'}"
        :bar-item-active-style="{color:'rgba(0, 0, 0, 0.9)',fontWeight:'bold'}"
        :bar-item-style="{color:'rgba(0, 0, 0, 0.6)',background: '#F8F8F8'}"
        @change="changeList">
      <uv-vtabs-item>
        <uv-vtabs
            :chain="true"
            :list="subClass"
            hdHeight="100rpx"
            :bar-item-active-line-style="{background: '#3775F6',height:'40rpx',margin:'auto',width:'8rpx',borderRadius:'0px 4px 4px 0px'}"
            :bar-item-active-style="{color:'rgba(0, 0, 0, 0.9)',fontWeight:'bold'}"
            :bar-item-style="{color:'rgba(0, 0, 0, 0.6)',background: '#F8F8F8'}"
            @change="change">
          <!-- #ifdef VUE3 -->
          <template v-for="(item,index) in subClass" :key="index">
            <uv-vtabs-item :index="index">
              <!-- #endif -->
              <view class="item"
                    v-for="(item2,index2) in item.childrens"
                    :key="index2">
                <view class="item-title">
                  <text class="text">{{ item2.name }}</text>
                </view>
                <view class="item-content">
                  <text class="text">{{ item2.desc }}</text>
                </view>
              </view>
              <view
                  class="gap"
                  v-if="index<subClass.length-1">
                <uv-gap bg-color="#f1f1f1" height="4"></uv-gap>
              </view>
            </uv-vtabs-item>
          </template>
        </uv-vtabs>
      </uv-vtabs-item>
    </uv-vtabs>
  </view>
</template>
<script setup>
import {computed, reactive, ref, watchEffect} from "vue";
import {onReady} from "@dcloudio/uni-app";

const props = defineProps({
  numType: {
    type: String,
    default: 'order'
  }
})
onReady(() => {

});
const mainClassifyValue = ref(0)
const subClass = computed(() => {
  const _list = mainClassify.value[mainClassifyValue.value]?.childrens;
  return _list ? _list : [];
})
const mainClassify = ref([{
  name: '水果类',
  childrens: [{
    name: 'uv-ui简介1',
    childrens: [{name: '全端兼容1',}, {name: '集成工具',}, {name: '主题扩展',}]
  },{
    name: 'uv-ui简介2',
    childrens: [{name: '全端兼容2',}, {name: '集成工具',}, {name: '主题扩展',}]
  }]
}, {
  name: '蔬菜类1',
  childrens: [{
    name: 'uv-ui简介3',
    childrens: [{name: '全端兼容3',}, {name: '集成工具',}, {name: '主题扩展',}]
  },{
    name: 'uv-ui简介4',
    childrens: [{name: '全端兼容4',}, {name: '集成工具',}, {name: '主题扩展',}]
  }]
}, {
  name: '蔬菜类2',
  badge: {
    show: true,
    value: 5
  },
  childrens: [{
    name: 'uv-ui简介5',
    childrens: [{name: '全端兼容5',}, {name: '集成工具',}, {name: '主题扩展',}]
  },{
    name: 'uv-ui简介6',
    childrens: [{name: '全端兼容6',}, {name: '集成工具',}, {name: '主题扩展',}]
  }]
}, {
  name: '蔬菜类3',
  childrens: [{
    name: 'uv-ui简介7',
    childrens: [{name: '全端兼容7',}, {name: '集成工具',}, {name: '主题扩展',}]
  },{
    name: 'uv-ui简介8',
    childrens: [{name: '全端兼容8',}, {name: '集成工具',}, {name: '主题扩展',}]
  }]
}, {
  name: '蔬菜类4',
  childrens: [{
    name: 'uv-ui简介9',
    childrens: [{name: '全端兼容9',}, {name: '集成工具',}, {name: '主题扩展',}]
  },{
    name: 'uv-ui简介10',
    childrens: [{name: '全端兼容10',}, {name: '集成工具',}, {name: '主题扩展',}]
  }]
}])
const chain = ref(true)
let change = (index) => {
  console.log('子选项改变：', index)
}
let changeList= (index) => {
  mainClassifyValue.value = index;
  console.log('选项改变：', index)
}

</script>
<style scoped lang="scss">
.right-title {
  padding: 20rpx 0 0 24rpx;
  color: var(--uni-text-input-color);
  font-size: var(--uni-font-size-14);
}

.right-product-box {
  display: flex;
  justify-content: space-between;
  width: calc(100% - 48rpx);
  margin: 64rpx auto 32rpx;

  &:first-child {
    margin: 32rpx auto 32rpx;
  }

  .image-box {
    border-radius: 16rpx;
    width: 200rpx;
    height: 200rpx;
    flex-shrink: 0;
    overflow: hidden;

    & > uni-image {
      width: 100%;
      height: 100%;
    }
  }

  .name-box {
    padding-left: 16rpx;
    flex-direction: column;
    display: flex;

    h2 {
      font-weight: 600;
      font-size: var(--uni-font-size-16);
      line-height: 48rpx;
    }

    .specif-text {
      font-size: var(--uni-font-size-12);
      color: var(--uni-text-input-color);
      flex: 1;
      padding-top: 8rpx;
    }

    .price-box {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .price {
        display: flex;
        align-items: flex-end;
        line-height: 1;
        color: var(--uni-text-color-red);
        font-size: var(--uni-font-size-12);
        font-weight: 600;

        & > span {
          font-size: var(--uni-font-size-16);
          padding-left: 8rpx;
        }
      }
    }
  }
}

.minus {
  border: 1px solid #3775F6;
  height: 38rpx;
  width: 38rpx;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.plus {
  height: 38rpx;
  width: 38rpx;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0);
  background-color: #3775F6;
}

.input {
  width: 70rpx;
  height: 42rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8rpx;
  margin: 0 20rpx;
  font-weight: 600;
  text-align: center;

  ::v-deep .uni-input-input {
    font-size: var(--uni-font-size-14);
  }
}
</style>