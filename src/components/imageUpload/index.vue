<template>
  <uv-upload
      :fileList="imageList"
      :name="name"
      :uploadIcon="uploadIcon"
      :uploadText="uploadText"
      :width="width"
      :height="height"
      :custom-style="customStyle"
      multiple
      :disabled="disabled"
      :maxCount="maxCount"
      :deletable="deletable"
      :useBeforeRead="true"
      :maxSize="maxSize * 1048576"
      @beforeRead="beforeRead"
      @afterRead="afterRead"
      @delete="fileDelete"
  ></uv-upload>
</template>
<script setup>
import {ref, reactive, getCurrentInstance, defineEmits, watchEffect} from 'vue'
const {proxy} = getCurrentInstance()

const props = defineProps({
  parentImageList:{
    type:Array,
    default:[],
  },
  type: {                 // 文件类型
    type: String,
    default: ''
  },
  maxCount:{               //最大选择图片的数量
    type:Number,
    default:5
  },
  //上传区域的图标，只能内置图标
  uploadIcon:{
    type:String,
    default:'plus'
  },
  //是否启用(显示/隐藏)组件
  disabled:{
    type:Boolean,
    default:false
  },
  //标识符，可以在回调函数的第二项参数中获取
  name:{
    type:String,
    default:'upload'
  },
  //是否显示删除按钮
  deletable:{
    type:Boolean,
    default:true
  },
  //上传区域的提示文字
  uploadText:{
    type:String,
  },
  //内部预览图片区域和选择图片按钮的区域宽度，单位rpx，不能是百分比，或者auto
  width:{
    type:Number||String||Object
  },
  //内部预览图片区域和选择图片按钮的区域高度，单位rpx，不能是百分比，或者auto
  height:{
    type:Number||String
  },
  //自定义外部样
  customStyle:{
    type:Object,
  },
  // 是否加水印
  watermarkFlag:{
    type:Boolean,
    default: false
  },
  maxSize:{
    type:Number,
    default:100
  }
})
let imageList = ref([]);           // 图片列表
let addList = [];           // 图片新增列表
let delList =  [];           // 删除文件
let uploadIf = ref(true)
const emits = defineEmits(['imageListArray','initImage','delImageListArray']);
imageList.value = props.parentImageList;
const beforeRead = async (e)=>{
  console.log('上', e)
  const size = (e.file[0].size) / 1024 / 1024
  let index;
  let type;
  // #ifdef H5
  index = e.file[0].name.indexOf('.')
  type = e.file[0].name.substring(index + 1)
  // #endif
  // #ifdef MP-WEIXIN
  index = e.file[0].url.indexOf('.')
  type = e.file[0].url.substring(index + 1)
  // #endif
  if (type !== 'png' && type !== 'jpg' && type !== 'jpeg') {
    uni.showToast({
      icon:'none',
      title:'文件格式不正确, 请上传png/jpg/jpeg图片格式文件'
    })
    uploadIf.value = false
    return false
  }else {
    if (size > 2) {
      uni.showToast({
        icon:'none',
        title:'上传图片大小不能超过' + maxSize + 'MB'
      })
      uploadIf.value = false
    }else {
      uploadIf.value = true
    }
  }
}


// 删除图片
let fileDelete = (e, key) => {
  if(e.file.id) {                       // 删除已上传文件回信文件
    let delIndex = null;
    imageList.value.filter((item, index) => {
      if (item.id === e.file.id) {
        delIndex = index;
      }
      return item;
    });
    imageList.value.splice(delIndex, 1);
    delList.push(e.file.id)
    emits('delImageListArray', delList, imageList.value,props.type);
  } else {
    let delIndex = null;
    imageList.value.filter((item, index) => {           // 通用列表数据
      if (item.uuid === e.file.uuid) {
        delIndex = index;
      }
      return item;
    });
    imageList.value.splice(delIndex, 1);
    addList.filter((item, index) => {               // 新增列表数据
      if (item.uuid === e.file.uuid) {
        delIndex = index;
      }
      return item;
    });
    addList.splice(delIndex, 1);
    emits('imageListArray', addList, imageList.value,props.type)
  }
}

// 新增图片
const afterRead = async (event) => {
  // 此时可以自行将文件上传至服务器
  let lists = [].concat(event.file);
  console.log(event)
  if(uploadIf.value){
    emits('imageListArray', lists, imageList.value,props.type)
  }
};
</script>
<style scoped lang="scss">
.form {}
</style>