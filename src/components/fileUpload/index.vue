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
      @beforeRead="beforeRead"
      @afterRead="afterRead"
      @delete="fileDelete"
  ></uv-upload>
</template>
<script setup>
import {pathToBase64} from 'image-tools';
import { v4 as uuidv4 } from 'uuid';
import {ref,reactive, getCurrentInstance, defineEmits} from 'vue'
const {proxy} = getCurrentInstance()

const props = defineProps({
  tableId: {    // 表id
    type: String,
    default: ''
  },
  tableName: {      // 表名称
    type: String,
    default: ''
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
    type:Number||String
  },
  //内部预览图片区域和选择图片按钮的区域高度，单位rpx，不能是百分比，或者auto
  height:{
    type:Number||String
  },
  //自定义外部样
  customStyle:{
    type:Object,
  },

})
let imageList = ref([])

let delList =  ref([])         // 删除文件
const emits = defineEmits(['imageListArray','imageLength']);

const beforeRead = async (event)=>{

}
// 初始化数据
let init = async (e) => {
  if(props.tableId) {
    let query = {};
    query.tableId = props.tableId;
    query.tableName = props.tableName;
    query.type = [props.type];
    let res = await proxy.http.asyncPost(api.findFileList, query);
    if (res.code === 0) {
      if(res.data) {
        res.data.forEach(item => {
          emits('imageListArray',imageList);
          imageList.value.push(item);
        })
      }
    } else {
      uni.showToast({title: res.msg, icon: 'none'});
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
    delList.value.push(e.file)
    console.log(delList.value)
    console.log(delList)
    emits('delListArray',delList);
    emits('imageListArray',imageList);
  } else {
    let delIndex = null;
    imageList.value.filter((item, index) => {
      if (item.uuid === e.file.uuid) {
        delIndex = index;
      }
      emits('imageListArray',item)
      return item;
    });
    imageList.value.splice(delIndex, 1);
    emits('imageListArray',imageList)
  }
}

// 新增图片
const afterRead = async (event) => {
  // 此时可以自行将文件上传至服务器
  let lists = [].concat(event.file);
  for (let i = 0; i < lists.length; i++) {
    let oParams = {
      type: props.type,
      base64: '',
      originalFilename: lists[i].name,
      contentType: '',
      tableName: props.tableName
    }
    const imgString = await pathToBase64(lists[i].url);
    oParams.base64 = imgString;
    // const res = await proxy.http.upload(api.fileUpload, oParams, true, '', '', false);
    console.info(oParams);
    // const resdata = JSON.parse(res);
    // if(resdata.code === 0) {
    //   let oItem = {
    //     fileId: resdata.data.fileId,
    //     url: resdata.data.path,
    //     type: props.type,
    //     name: resdata.data.name,
    //     extname: '',
    //     filePath: resdata.data.filePath,
    //     fileType: resdata.data.fileType,
    //     fileSize: resdata.data.fileSize,
    //     uuid: uuidv4()
    //   }
    //   imageList.value.push(oItem);
    //   emits('imageListArray',imageList.value,oItem)
    // }
  }
};


</script>
<style scoped lang="scss">

</style>