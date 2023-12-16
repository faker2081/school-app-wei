<template>
  <view class="box-all"> 
    <view class="top">

    </view>
    <view class="body">
      <view class="base-info">
        <uv-avatar size="70" :src="baseUrl + userInfo.photoUrl"></uv-avatar>
        <text>{{ userInfo.name }}</text>>
      </view>
    </view>
    <view class="footer">

    </view>
  </view>
</template>

<script setup>

const props = defineProps({
  userInfo: {
    type: Object,
    default: () => {},
  }
})


</script>

<style scoped lang="scss">

</style>