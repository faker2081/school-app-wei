<template>
  <view>
    <view class="header-title">
      <view class="title">{{title}}</view>
      <uv-icon name="close" size="18" bold class="icon" color="#000" @click="close"></uv-icon>
    </view>
    <commodity-information imageUrl="/src/static/image/order-bg.png" name ="洮南麒麟甜瓜王" specification="10-15cm；斤" jack-up="20斤起" price="45.8" :height=460 :image-width=156>
      <view class="slot-box">
        <view class="input-box">
          <text>起订量</text>
          <view>
            <uv-number-box v-model="value">
              <template #minus>
                <view class="minus">
                  <uv-icon name="minus" size="12" bold></uv-icon>
                </view>
              </template>
              <template #input>
                <input type="text" v-model="value" class="input">
              </template>
              <template #plus>
                <view class="plus">
                  <uv-icon name="plus" color="#FFFFFF" size="12" bold></uv-icon>
                </view>
              </template>
            </uv-number-box>
          </view>
        </view>
        <view class="input-box">
          <text>价格</text>
          <uv-input class="input-price" border="none"  type="number" inputAlign="center" fontSize="32rpx" color="rgba(0,0,0,.9)" :customStyle="{fontWeight:'600'}">
            <template #prefix>
              <uv-text
                  text="¥"
                  margin="0 0 0 20rpx"
                  class="input-pre"
              ></uv-text>
            </template>
          </uv-input>
        </view>
      </view>
    </commodity-information>
  </view>
</template>
<script setup>
import {ref} from 'vue'
import commodityInformation from '@/components/commodityInformation/index.vue'
const props = defineProps({
  title:{
    type:String,
    default:'编辑商品信息'
  },
  imageUrl:{
    type:String,
  },
  name:{
    type:String,
    default:'洮南麒麟甜瓜王'
  },
  specification:{
    type:String,
    default:'10-15cm；斤'
  },
  jackUp:{
    type:String,
    default:'1斤起'
  },
  price:{
    type:[String,Number],
    default:'45.8'
  }
});
const value = ref(0)
const emits = defineEmits(['close']);
let close = ()=>{
  emits('close')
}
</script>
<style scoped lang="scss">
.header-title {
  width: 750rpx;
  height: 112rpx;
  font-size: var(--uni-font-size-16);
  font-weight: bold;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #E7E7E7;
  align-items: center;
  .title {
    flex: 9;
    text-align: center;
  }
  .icon {
    flex: 1;
  }
}
.slot-box {
  padding-top: 20rpx;
  .input-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20rpx;
    & > text {
      font-size: var(--uni-font-size-16);
      color: var(--uni-text-color);
    }
  }
}
.minus {
  border: 1px solid #3775F6;
  border-radius: 50%;
  padding: 8rpx;
}
.plus {
  border-radius: 50%;
  padding: 8rpx;
  border: 1px solid rgba(0,0,0,0);
  background-color: #3775F6;
}
.input {
  width: 184rpx;
  height: 72rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #F2F2F2;
  border-radius: 8rpx;
  margin: 0 20rpx;
  font-weight: 600;
  text-align: center;
}
.input-price {
  width: 200rpx;
  margin-left: 290rpx;
  background-color: #F2F2F2;
  padding: 10rpx 0!important;
}
.input-pre {
  ::v-deep {
    .uv-text__value {
      font-weight: 600!important;
      color: var(--uni-text-color)!important;
    }

  }
}
::v-deep .uni-input-input {
  color: var(--uni-text-color)!important;
}

</style>