<template>
  <view>
    <view v-if='signImage' style='text-align: right;'>
      <image :src='signImage' :style="{width:'200rpx',height:'100rpx'}"></image>
    </view>
    <canvas class='firstCanvas' canvas-id="firstCanvas" @touchmove='move' @touchstart='start($event)' @touchend='end'
            @touchcancel='cancel' @longtap='tap' disable-scroll='true' @error='error'>
    </canvas>

    <view class="caozuo">
      <view class="chongqian" @tap='clearClick'>
        重签
      </view>
      <view class="over" @click="overSign">
        完成签名
      </view>
    </view>
  </view>
</template>
<script setup>
import {ref} from "vue";
import {onLoad} from "@dcloudio/uni-app";
const content = ref(null);
const touchs = ref([]);
const canvasw = ref(0);
const canvash = ref(0);
const signImage = ref()
const isEnd = ref(false);
//获取系统信息
uni.getSystemInfo({
  success: function(res) {
    canvasw.value = res.windowWidth;
    canvash.value = res.windowHeight;
  },
});
function overSign(){
  uni.canvasToTempFilePath({
    canvasId: 'firstCanvas',
    success: function(res) {
      //打印图片路径
      console.log(res.tempFilePath)
      console.log('完成签名')
      //设置图片
      signImage.value = res.tempFilePath;

    }
  })
}
// 画布的触摸移动开始手势响应
function start(e){
  // console.log(event)
  // console.log("触摸开始" + event.changedTouches[0].x)
  // console.log("触摸开始" + event.changedTouches[0].y)
  //获取触摸开始的 x,y
  let point = {
    x: e.changedTouches[0].x,
    y: e.changedTouches[0].y
  }
  // console.log(point)
  touchs.value.push(point);
}
// 画布的触摸移动手势响应
function move(e){
  let point = {
    x: e.touches[0].x,
    y: e.touches[0].y
  }
  // console.log(point)
  touchs.value.push(point)
  if (touchs.value.length >= 2) {
    draw(touchs.value)
  }
}
// 画布的触摸移动结束手势响应
function end(){
  // 设置为已经签名
  isEnd.value = true;
  console.log('end')
  // 清空轨迹数组
  touchs.value.pop()
}
// 画布的触摸取消响应
function cancel(e){

}
// 画布的长按手势响应
function tap(e){

}
//画布触摸错误
function error(e){

}
//绘制
function draw(){
  let point1 = touchs.value[0]
  let point2 = touchs.value[1]
  touchs.value.shift()
  content.value.moveTo(point1.x, point1.y)
  content.value.lineTo(point2.x, point2.y)
  content.value.stroke()
  content.value.draw(true)
}
//清除操作
function clearClick(){
  // 设置为未签名
  //清除画布
  content.value.clearRect(0, 0, canvasw.value, canvash.value)
  content.value.draw(true)
}

onLoad(()=>{
  //获得Canvas的上下文
  content.value = uni.createCanvasContext('firstCanvas')
  //设置线的颜色
  content.value.setStrokeStyle("#000")
  //设置线的宽度
  content.value.setLineWidth(5)
  //设置线两端端点样式更加圆润
  content.value.setLineCap('round')
  //设置两条线连接处更加圆润
  content.value.setLineJoin('round')
})
</script>
<style scoped lang="scss">

</style>