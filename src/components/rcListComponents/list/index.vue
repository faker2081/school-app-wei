<template>
  <view class="rc-list-box" :style="{height:height+'rpx'}">
    <view class="menu-box">
      <view class="image">
        <template v-if="imageUrl">
          <image :src="imageUrl" mode="aspectFill"></image>
        </template>
        <template v-else>
          <image src="@/static/image/order-bg.png" mode="aspectFill"></image>
          <view v-show="imageText" class="image-text" :class="imageBoolean?'':'red'">{{ imageText }}</view>
        </template>
      </view>
      <view class="title-box">
        <slot name="content">
          <view class="title">
            <view v-for="(item,index) in titleData">{{item}}</view>
          </view>
          <view class="title-data">
            <view v-for="(item,index) in formData">{{item}}</view>
          </view>
<!--          <view class="dis-box flex-start">-->
<!--            <view v-if="!signImage" class="" @click="isCanvas=true">-->
<!--              <text>电子签名</text>-->
<!--              <text class="iconfont icon-edit"></text>-->
<!--            </view>-->
<!--            <view class="sign" v-else>-->
<!--              <image :src="signImage" mode="aspectFit"></image>-->
<!--            </view>-->
<!--          </view>-->
        </slot>
      </view>
    </view>
    <view class="button-box">
      <slot name="button">
      </slot>
    </view>
    <drawSign v-model="isCanvas" @complete="complete"></drawSign>
  </view>
</template>
<script setup>
import {ref} from "vue";
import drawSign from '@/components/rcListComponents/draw-sign/sign.vue'

const isCanvas = ref(false)
const signImage = ref(null)
const complete = e => {
  console.log(e, '电子签名图片上传成功后，后端返回的图片路径');
  signImage.value = e;
}
const props = defineProps({
  height: {
    type: [String, Number],
    default: 394
  },
  imageUrl: {
    type: String,
    default: ''
  },
  imageBoolean: {
    type: Boolean,
    default: true
  },
  imageText: {
    type: String,
    default: ''
  },
  titleData:{
    type: Array,
    default: ['档口名称','档口名称','档口名称','档口名称']
  },
  formData:{
    type: Array,
    default: ['档口名称','档口名称','档口名称','档口名称']
  }
})
</script>
<style scoped lang="scss">
.rc-list-box {

  @include form-box(24rpx);

  & > .menu-box {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 24rpx;

    & > .image {
      width: 172rpx;
      height: 172rpx;
      overflow: hidden;
      border-radius: 20rpx;
      position: relative;

      & > .image-text {
        position: absolute;
        bottom: 0rpx;
        width: 100%;
        height: 50rpx;
        background-color: rgba(0, 0, 0, .5);
        @include flex-center;
        justify-content: center;
        font-size: var(--uni-font-size-12);
        color: #26FF00;

        &.red {
          color: var(--uni-text-color-red);
        }
      }
    }

    .title-box {
      flex: 1;
      margin-left: 30rpx;
      align-items: center;
      justify-content: space-between;
      display: flex;
      font-size: var(--uni-font-size-14);
      .title {
        color: var(--uni-text-input-color);
        & > view {
          margin-bottom: 22rpx;
        }
      }
      .title-data {
        & > view {
          margin-bottom: 22rpx;
        }
      }

      .dis-box {
        margin-bottom: 22rpx;
        justify-content: space-between;
        font-size: var(--uni-font-size-14);
        @include flex-center;

        &.flex-start {
          align-items: flex-start;
        }

        & > text {
          color: var(--uni-text-input-color);
        }

        .icon-edit {
          padding-left: 8rpx;
          color: #1677FF;
        }
      }
    }
  }
}

.sign {
  width: 160rpx;
  height: 90rpx;
  transform: rotate(-90deg);
  transform-origin: center;
  overflow: hidden;
}
</style>