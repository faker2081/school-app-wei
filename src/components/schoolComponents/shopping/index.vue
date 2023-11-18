<template>
  <view class="shopping-box">
    <view class="title-box">
      <view v-show="productEdit"><uv-checkbox-group><uv-checkbox name="ap" shape="circle" disabled></uv-checkbox></uv-checkbox-group></view>
      <view class="title">
        <text class="icon-text">供</text>
        <view class="store-name">{{ storeName }}</view>
        <uv-icon name="arrow-right" class="icon-right"></uv-icon>
      </view>
    </view>
    <view class="product-edit-box" v-for="(item,index) in productList" :key="index">
      <view v-show="productEdit"><uv-checkbox-group shape="circle" :disabled="false"><uv-checkbox name="ap"></uv-checkbox></uv-checkbox-group></view>
      <view class="product-box">
        <view class="image"><image src="@/static/image/order-bg.png" mode="aspectFill"></image><view class="text" v-show="productType">{{'缺货'}}</view></view>
        <view class="detail-box">
          <view class="dea-box">
            <text class="pro-name">四川春见粑粑柑 橘子桔子</text>
            <view class="price">¥<span>{{'66.7'}}</span></view>
          </view>
          <view class="price-box">
            <view>
              <view class="dea-name">规格：--    </view>
              <view class="dea-name">单位：g   </view>
            </view>
            <view v-if="!productType">
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
            <view class="disable-text" v-else>该商品已不能购买</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup>
import {ref} from "vue";
const props = defineProps({
  // 店铺名称
  storeName:{
    type:String,
    default:'大家大业果蔬有限公司',
  },
  // 商品列表
  productList:{
    type:Array,
    default:[1,1,1,1,1],
  },
  // 商品状态
  productType:{
    type:Boolean,
    default:false
  },
  // 是否编辑
  productEdit:{
    type:Boolean,
    default:true
  },
})
const showMinus = ref(false)
const numValue = ref(null);
const inputDis = ref(true);
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
.shopping-box {
  @include form-box(24rpx)
}

.title-box {
  @include flex-center;
  .title {
    border-bottom: 1px solid #E7E7E7;
    flex: 1;
    @include flex-center;
    .icon-text {
      @include icon-text(#FFB62B, 0, 0)
    }
    .store-name {
      padding: 18rpx 0 18rpx 26rpx;
      font-size: var(--uni-font-size-18);
    }
    .icon-right {
      margin-left:auto;
    }
  }
}
.product-edit-box {
  @include flex-center
}
.product-box {
  display: flex;
  flex: 1;
  margin: 40rpx 0;
  & > .image {
    @include productImage(128rpx,128rpx);
    & > .text {
      position: absolute;
      width: 100%;
      height: 48rpx;
      bottom: 0;
      background-color: rgba(0,0,0,.5);
      @include flex-center-center;
      font-size: var(--uni-font-size-12);
      color: var(--uni-text-color-white);
    }
  }
  .detail-box {
    padding-left: 16rpx;
    flex: 1;
    .dea-box {
      flex: 1;
      display: flex;
      justify-content: space-between;
    }
    .pro-name {
      line-height: 1;
      font-size: var(--uni-font-size-16);
      color: var(--uni-text-input-color);
      flex: 1;
    }
    .price {
      line-height: 1;
      min-width: 90rpx;
      font-size: var(--uni-font-size-12);
      font-weight: 600;
      text-align: right;
      & > span {
        font-size: var(--uni-font-size-16);
      }
    }
  }
  .price-box {
    justify-content: space-between;
    align-items: flex-end;
    display: flex;
    .dea-name {
      line-height: 1;
      padding-top: 20rpx;
      font-size: var(--uni-font-size-12);
      color: var(--uni-text-color-grey);
    }
    .disable-text {
      font-size: var(--uni-font-size-12);
      color: var(--uni-text-color-red);
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
  width: 60rpx;
  height: 42rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8rpx;
  margin: 0 5rpx;
  font-weight: 600;
  text-align: center;

  ::v-deep .uni-input-input {
    font-size: var(--uni-font-size-14);
  }
}
</style>