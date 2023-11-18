<template>
  <view class="sign-box" v-show="modelValue" :style="{height:'100vh'}">
    <view class="whole canvas-autograph flexc">
      <canvas class="scroll-view" :canvas-id="canvasId" @touchstart="touchstart" @touchmove="touchmove"
              disable-scroll="true" @touchend="touchend"/>
      <view class="fun-box ">
        <uv-button round block type="warning" size="small" @click="clear">清空</uv-button>
        <uv-button round block type="primary" size="small" @click="confirm">确认</uv-button>
        <uv-button round block type="danger" size="small" @click="cancel">取消</uv-button>
      </view>
    </view>
  </view>
</template>
<script setup>
import {
  ref,
  reactive,
  watch,
  getCurrentInstance,
  onMounted
} from 'vue'

const {
  proxy: t
} = getCurrentInstance()
const emits = defineEmits(['update:modelValue', 'complete'])
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  infor: {
    type: Object,
    default: {}
  },
  canvasId:{
    type: String,
    default: 'mycanvas'
  }
})
watch(() => props.modelValue, e => {
}, {
  immediate: true,
})
let cavWidth = ref(2000)
let cavWidth1 = ref(2000)
let points = reactive([])
let pointList = ref([])
const isDraw = ref(false)
let canvaCtx = reactive(uni.createCanvasContext(props.canvasId))
canvaCtx.lineWidth = 4;
canvaCtx.lineCap = 'round'
canvaCtx.lineJoin = 'round'
const touchstart = e => {
  let startX = e.changedTouches[0].x
  let startY = e.changedTouches[0].y
  let startPoint = {
    X: startX,
    Y: startY
  }
  points.push(startPoint);
  canvaCtx.beginPath();
}
const touchmove = e => {
  let moveX = e.changedTouches[0].x
  let moveY = e.changedTouches[0].y
  let movePoint = {
    X: moveX,
    Y: moveY
  }
  points.push(movePoint)
  pointList.value.push(movePoint)
  let len = points.length
  if (len >= 2) {
    draw()
  }
}
const draw = () => {
  let point1 = points[0]
  let point2 = points[1]
  points.shift()
  canvaCtx.moveTo(point1.X, point1.Y)
  canvaCtx.lineTo(point2.X, point2.Y)
  canvaCtx.stroke()
  canvaCtx.draw(true)
}
const touchend = e => {
  points = [];
}
const clear = () => {
  pointList.value = []
  return uni.getSystemInfo()
      .then(res => {
        canvaCtx.clearRect(0, 0, res.windowWidth, res.windowHeight);
        canvaCtx.draw(true);
        return res
      })
      .catch(err => {
        console.log(err);
      })
}
const confirm = () => {
  if (pointList.value.length < 10) {
    uni.showToast({
      icon: 'none',
      title: '请签字'
    })
  } else {
    uni.canvasToTempFilePath({
      canvasId: props.canvasId,
    }).then(res => {
      const {
        tempFilePath
      } = res
      emits('update:modelValue', false);
      // getImageInfo(tempFilePath)
      emits('complete', tempFilePath);
    })
  }
}
const cancel = () => {
  pointList.value = []
  clear().then((res) => {
    emits('update:modelValue', false);
  })
}

</script>
<style scoped lang="scss">
.sign-box {
  position: fixed;
  width: 100vw;
  bottom: 0;
  left: 0%;
  z-index: 997;
  background: #e7e7e7;
  border-radius: 30rpx;
}

.canvas-autograph {
  position: absolute;
  z-index: 998;
  height: 95%;
  width: 82%;
  top: 50%;
  left: 50%;
  transform: translate(-43%, -50%);

  .scroll-view {
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
  }

  .fun-box {
    position: absolute;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    transform: rotate(90deg);
    top: 50%;
    left: -59%;

    .fun-box-btn {
      width: 160rpx;
      height: 100%;
      color: #FFFFFF;
      border-radius: 20rpx;
      border: 1rpx solid #C0C0C0;
      text-align: center;

      + .fun-box-btn {
        margin-left: 20rpx;
      }
    }
  }

}
</style>