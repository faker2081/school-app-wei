<template>
  <view class="offerMenu-box" :style="{'height':height+'rpx'}">
    <!--      商品信息详情        -->
    <view class="dis-flex">
      <image :src="imageUrl" :style="{width:imageWidth+'rpx',height:imageWidth+'rpx'}" mode="aspectFill"></image>
      <view class="menu-box-dis">
        <view class="menu">
          <h2>{{ name }}</h2>
          <view class="specification">{{ specification }}</view>
          <text class="text-button" v-show="jackUp">{{ jackUp }}</text>
        </view>
        <view class="price-box" v-show="price">
          <view class="price">¥ <span>{{price}}</span></view>
        </view>
      </view>
    </view>
    <!--  button  -->
    <view class="button-box">
      <slot name="button"></slot>
    </view>
    <!--  自定义  -->
    <slot></slot>
  </view>

</template>
<script setup>
const prop = defineProps({
  imageWidth:{
    type:Number,
    default:200
  },
  height:{
    type:Number,
    default:356
  },
  imageUrl:{
    type:String,
    default:''
  },
  name:{
    type:String,
    default:'洮南麒麟甜瓜王'
  },
  specification:{
    type:String,
    default:'10 - 15cm；斤'
  },
  jackUp:{
    type:String,
    default:''
  },
  price:{
    type:[Number,String],
  }
})
</script>

<style scoped lang="scss">
.offerMenu-box {
  width: calc(100% - 48rpx);
  padding: 0 24rpx;
  background-color: var(--uni-bg-color-white);
}
.dis-flex {
  display: flex;
  padding: 24rpx 0 0;
  & > image {
    width: 200rpx;
    height: 200rpx;
    border-radius: 16rpx;
    overflow: hidden;
  }
  .menu-box-dis {
    display: flex;
    justify-content: space-between;
    padding-left: 16rpx;
    flex:1;
    .menu {
      display: flex;
      align-items: flex-start;
      flex-direction:column;
      h2 {
        font-size: var(--uni-font-size-16);
        color: var(--uni-text-color);
        padding-bottom: 6rpx;
      }
      .specification {
        font-size: var(--uni-font-size-12);
        color: var(--uni-text-input-color);
        flex: 1;
      }
      .text-button {
        @include grey-small-button-box
      }
    }
    .price-box {
      display: flex;
      align-items: flex-end;
      line-height: 1;
      font-weight: 600;
      .price {
        min-width: 90rpx;
        color: var(--uni-text-color-red);
        font-size: var(--uni-font-size-12);
        & > span {
          font-size: var(--uni-font-size-16);
        }
      }
    }
  }
}
</style>