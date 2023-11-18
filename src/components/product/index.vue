<template>
  <view :style="{marginTop:topHeight.top+'px'}">
    <uv-vtabs
        :chain="chain"
        :list="getList"
        :height="height"
        hdHeight="160rpx"
        :bar-item-active-line-style="{background: '#3775F6',height:'40rpx',margin:'auto',width:'8rpx',borderRadius:'0px 4px 4px 0px'}"
        :bar-item-active-style="{color:'rgba(0, 0, 0, 0.9)',fontWeight:'bold'}"
        :bar-item-style="{color:'rgba(0, 0, 0, 0.6)'}"
        @change="change">
      <!-- #ifdef VUE3 -->
      <template v-for="(item,index) in getList" :key="index">
        <view class="right-title">{{ item.name }}</view>
        <uv-vtabs-item :index="index">
          <!-- #endif -->
          <view class="item"
                v-for="(list,j) in item.childrens"
                :key="j">
            <view class="right-product-box">
              <view class="image-box">
                <image src="@/static/image/order-bg.png" mode="aspectFill"></image>
              </view>
              <view class="name-box">
                <h2>{{ '四川春见粑粑柑 橘子 桔子 不甜不要钱' }}</h2>
                <view class="specif-text">{{ '10 - 15cm；斤' }}</view>
                <view class="price-box">
                  <view class="price">¥ <span>{{ '45.8' }}</span></view>
                  <view v-show="numType==='offer'">
                    <uv-number-box v-model="numValue" :showMinus="showMinus" @change="numChange" min="0">
                      <template #minus>
                        <view class="minus">
                          <uv-icon name="minus" size="12" bold></uv-icon>
                        </view>
                      </template>
                      <template #input>
                        <input type="number" v-model="numValue" :disabled="inputDis" class="input">
                      </template>
                      <template #plus>
                        <view class="plus">
                          <uv-icon name="plus" color="#FFFFFF" size="12" bold></uv-icon>
                        </view>
                      </template>
                    </uv-number-box>
                  </view>
                  <view v-show="numType==='order'">
                    <uv-checkbox-group v-model="checkboxValue" size="42rpx">
                      <uv-checkbox name="apple" shape="circle" ></uv-checkbox>
                    </uv-checkbox-group>
                  </view>
                </view>
              </view>
            </view>
          </view>
          <view
              class="gap"
              v-if="index<getList.length-1">
            <uv-gap bg-color="#f1f1f1" height="4"></uv-gap>
          </view>
        </uv-vtabs-item>
      </template>
      <!--      <uv-gap bg-color="#fff" height="600"></uv-gap>-->
    </uv-vtabs>
  </view>
</template>
<script setup>
import {computed, reactive, ref, watchEffect} from "vue";
import {onReady} from "@dcloudio/uni-app";
const props = defineProps({
  numType:{
    type:String,
    default:'order'
  }
})
onReady(() => {

});
const checkboxValue = ref('')
const showMinus = ref(false)
const numValue = ref(null);
const inputDis = ref(true);
const height = computed(() => uni.getSystemInfoSync().windowHeight - 44)
console.log(height.value)
const getList = reactive([{
  name: '水果类',
  childrens: [{name: 'uv-ui简介1231',}]
}, {
  name: '蔬菜类1',
  childrens: [{name: '全端兼容',}, {name: '集成工具',}, {name: '主题扩展',}]
}, {
  name: '蔬菜类2',
  badge: {
    show: true,
    value: 5
  },
  childrens: [{name: '更新日志',}]
}, {
  name: '蔬菜类3',
  childrens: [{name: '设计规范',}]
}, {
  name: '蔬菜类4',
  childrens: [{name: '交流反馈',}, {name: '交流反馈',}, {name: '交流反馈',}, {name: '交流反馈',}, {name: '交流反馈',}, {name: '交流反馈',}, {name: '交流反馈',}, {name: '交流反馈',}]
}])
const chain = ref(true)
let change = (index) => {
  console.log('选项改变：', index)
}

let numChange = (value) => {
  if (value.value > 0) {
    inputDis.value = false
    showMinus.value = true
  } else {
    showMinus.value = false;
    setTimeout(()=>{
      inputDis.value = true
      numValue.value = value.value = null;
      console.log(numValue.value)
    },10)
  }
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