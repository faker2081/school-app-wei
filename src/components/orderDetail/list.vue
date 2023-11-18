<template>
  <view class="list-box">
    <view class="title-name">
      <view class="icon-text">供</view>
      <h1>{{ title }}</h1>
    </view>
    <view class="product-box">
      <view class="dis-flex" v-for="i in 3">
        <view class="product-dis">
          <view class="image"><image src="@/static/image/order-bg.png" mode="aspectFill"></image><view class="image-text" v-show="stockoutType">缺货</view></view>
          <view>
            <view class="product-name">{{ '洮南麒麟甜瓜王（无籽）' }}</view>
            <view class="product-spe">{{ '10-15cm；克' }}</view>
          </view>
        </view>
        <view class="price-box">
          <view class="price">¥ <span>{{ '45.8' }}</span></view>
          <view class="product-num">
            <view class="through">x{{ 18 }}</view>
            <view>x{{ 20 }}</view>
          </view>
          <view class="small-button-box">
            <button class="yellow-small-button">改单</button>
            <button class="red-small-button">缺货</button>
          </view>
        </view>
      </view>
    </view>
    <view class="product-box">
      <view class="title-name jc">
        <view class="title">
          <view class="icon-text-change">换</view>
          <h2>换货商品</h2>
        </view>
        <view class="text-change">换货中</view>
      </view>
      <view v-for="i in 2">
        <view class="dis-flex">
          <view class="product-dis">
            <view class="image"><image src="@/static/image/order-bg.png" mode="aspectFill"></image><view class="image-text" v-show="stockoutType">缺货</view></view>
            <view>
              <view class="product-name" :class="{'change-color':stockoutType}">{{ '洮南麒麟甜瓜王（无籽）' }}</view>
              <view class="product-spe" :class="{'change-color':stockoutType}">{{ '10-15cm；克' }}</view>
            </view>
          </view>
          <view class="price-box">
            <view class="price change-color">¥ <span>{{ '45.8' }}</span></view>
            <view class="product-num">
              <view class="through change-color">x{{ 18 }}</view>
              <view>x{{ 20 }}</view>
            </view>
            <view class="small-button-box">
              <button class="yellow-small-button">改单</button>
              <button class="red-small-button">缺货</button>
            </view>
          </view>
        </view>
        <view class="dis-flex">
          <view class="product-dis">
            <view class="image"><image src="@/static/image/order-bg.png" mode="aspectFill"></image><view class="image-text" v-show="stockoutType">缺货</view></view>
            <view>
              <view class="product-name">{{ '洮南麒麟甜瓜王（无籽）' }}</view>
              <view class="product-spe">{{ '10-15cm；克' }}</view>
            </view>
          </view>
          <view class="price-box">
            <view class="price">¥ <span>{{ '45.8' }}</span></view>
            <view class="product-num">
              <view class="through">x{{ 18 }}</view>
              <view>x{{ 20 }}</view>
            </view>
            <view class="small-button-box">
              <button class="yellow-small-button">改单</button>
              <button class="red-small-button">缺货</button>
            </view>
          </view>
        </view>
        <uv-input border="surround" v-model="value" class="input-type" color="(0, 0, 0, 0.6)" readonly fontSize="28rpx"
                  custom-style="">
          <template #prefix>
            <uv-text
                text="换货理由："
                margin="0 3px 0 0"
                type="tips"
            ></uv-text>
          </template>
        </uv-input>
      </view>
    </view>
    <view class="product-box">
      <view class="title-name jc">
        <view class="title">
          <view class="icon-text-quit">换</view>
          <h2>退货商品</h2>
        </view>
        <view class="text-quit">退货中</view>
      </view>
      <view class="dis-flex" v-for="i in 2">
        <view class="product-dis">
          <view class="image"><image src="@/static/image/order-bg.png" mode="aspectFill"></image><view class="image-text" v-show="stockoutType">缺货</view></view>
          <view>
            <view class="product-name">{{ '洮南麒麟甜瓜王（无籽）' }}</view>
            <view class="product-spe">{{ '10-15cm；克' }}</view>
          </view>
        </view>
        <view class="price-box">
          <view class="price">¥ <span>{{ '45.8' }}</span></view>
          <view class="product-num">
            <view class="through">x{{ 18 }}</view>
            <view>x{{ 20 }}</view>
          </view>
          <view class="small-button-box">
            <button class="yellow-small-button">改单</button>
            <button class="red-small-button">缺货</button>
          </view>
        </view>
      </view>
      <uv-input border="surround" v-model="value" class="input-type" color="(0, 0, 0, 0.6)" readonly fontSize="28rpx"
                custom-style="">
        <template #prefix>
          <uv-text
              text="退货理由："
              margin="0 3px 0 0"
              type="tips"
          ></uv-text>
        </template>
      </uv-input>
    </view>
    <view class="total">
      <text>合计</text>
      <text>¥</text>
      <text>44452</text>
    </view>
  </view>
</template>
<script setup>
import {ref} from "vue";

const props = defineProps({
  title: {
    type: String,
    default: '白山师范第一食堂'
  },
  stockoutType:{
    type:Boolean,
    default:true,
  }
})
const value = ref('')
</script>
<style scoped lang="scss">
.list-box {
  @include form-box(20rpx)
}

.title-name {
   @include flex-center  ;
  margin-top: 24rpx;

  &.jc {
    justify-content: space-between;
  }

  .title {
     @include flex-center  ;

  }

  h1 {
    font-size: var(--uni-font-size-16);
    color: var(--uni-text-color)
  }

  h2 {
    font-size: var(--uni-font-size-14);
    color: var(--uni-text-color);
    font-weight: 100;
  }
}

.product-box {
  border-top: 1px solid #E7E7E7;
  margin-top: 30rpx;

  .dis-flex {
    padding-top: 24rpx;
     @include flex-center  ;
    align-items: flex-start;

    &:first-child {
      padding-top: 32rpx;
    }

    justify-content: space-between;

    .product-dis {
      align-items: flex-start;
       @include flex-center  ;

      & > .image {
        flex-shrink: 0;
        width: 144rpx;
        height: 144rpx;
        position: relative;
        border-radius: 16rpx;
        overflow: hidden;
        margin-right: 16rpx;
        .image-text {
          position: absolute;
          bottom: 0;
          background: rgba(0,0,0,.5);
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 48rpx;
          font-size: var(--uni-font-size-12);
          color: var(--uni-text-color-white);
        }
      }

      .product-name {
        font-size: var(--uni-font-size-14);
        color: var(--uni-text-color);
      }

      .product-spe {
        padding-top: 8rpx;
        color: var(--uni-text-input-color);
        font-size: var(--uni-font-size-12);
      }
    }

    .price-box {
      text-align: right;

      .price {
        font-weight: 600;
        color: var(--uni-text-color);
        font-size: var(--uni-font-size-12);

        & > span {
          font-size: var(--uni-font-size-16);
        }
      }

      .product-num {
         @include flex-center  ;
        justify-content: flex-end;
        padding-top: 8rpx;
        color: var(--uni-text-input-color);
        font-size: var(--uni-font-size-12);

        & > .through {
          text-decoration: line-through;
          padding-right: 8rpx;
          color: var(--uni-text-color-grey);
        }
      }
    }
  }
}

.icon-text {
  @include icon-text(#FE9000, 0, 0)
}

.icon-text-change {
  @include icon-text(none, 1px, #FF9F18, #FF9F18)
}

.icon-text-quit {
  @include icon-text(none, 1px, #F53F3F, #F53F3F)
}

.text-change {
  font-size: var(--uni-font-size-14);
  color: var(--uni-text-color-yellow);
}

.text-quit {
  font-size: var(--uni-font-size-14);
  color: var(--uni-text-color-red);
}

.change-color {
  color: var(--uni-text-color-grey) !important;
}

.input-type {
  margin-top: 24rpx;
  border-color: rgba(0, 0, 0, 0) !important;
  background: #F4F4F4;
}
.total {
  padding-top: 30rpx;
  padding-bottom: 30rpx;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  font-weight: 600;
  & > text {
    &:nth-child(1){
      font-size: var(--uni-font-size-14);
      color: var(--uni-text-input-color);
      line-height: 1;
    }
    &:nth-child(2){
      padding-left: 16rpx;
      font-size: var(--uni-font-size-14);
      color: var(--uni-text-color);
      line-height: 1;
    }
    &:nth-child(3){
      padding-left: 4rpx;
      font-size: var(--uni-font-size-18);
      color: var(--uni-text-color);
      line-height: 1;
    }
  }
}
</style>