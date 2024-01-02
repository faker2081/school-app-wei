<template>
  <view class="box-all">
    <view class="header-box">
      <Header title="发布贴子" ></Header>
    </view>
    <view class="content-box" :style="{marginTop: topHeight.top + 10 + 'px'}">
      <uv-form v-model="formData" ref="form" :rules="rule" errorType="message" labelPosition="left" labelWidth="auto">
        <uv-form-item prop="postTitle" >
          <view class="input-view">
            <uv-input border="bottom" v-model="formData.postTitle" placeholder="请输入标题（选填）" maxlength="40"/>
          </view>
        </uv-form-item>
        <uv-form-item borderBottom prop="postText">
            <uv-textarea style="margin: 0px 10px;" v-model="formData.postText" count placeholder="请输入内容" maxlength="4000" height="120"/>
        </uv-form-item>
        <uv-form-item borderBottom prop="postPhoto">
          <view class="item-content">
            <ImageUpload @imageListArray="imageListArray"></ImageUpload>
          </view>
        </uv-form-item>
        <uv-form-item borderBottom prop="tags">
          <view class="input-view tag-box">
              <uv-tags :text="areaText" icon="map" plain @click="openAreaPicker"></uv-tags>
              <uv-tags style="margin-left: 10px;" text="选择标签" type="warning" icon="tags-fill" @click="openTagsPicker"></uv-tags>
          </view>
        </uv-form-item>
        <uv-line></uv-line>
        <view style="width: 98%;">
          <view style="display:flex; flex-wrap: wrap; flex-direction: row;">
              <uv-tags style="width: 90px; text-align: center;" v-for="(item, index) in tagList.list" :key="index"  :text="item" type="warning" closable :show="close2" @close="closeTags(index)"></uv-tags>
          </view>
        </view>
        <uv-line></uv-line>
        <uv-form-item borderBottom prop="tags" label="是否匿名">
          <view style="width: 20%;">
            <uv-switch v-model="formData.isPostAnonymous"></uv-switch>
          </view>
        </uv-form-item>
      </uv-form>
      
    </view>

    <uv-picker ref="picker" :columns="areaList" keyName="name" @change="change" @confirm="confirm">
		</uv-picker>
    <!--tages-->
    <!--多选器-->
    <uv-popup ref="popup" mode="bottom">
      <view class="header-title">
        <view class="title">请选择</view>
        <view class="right" @click="handleOk">确定</view>
      </view>
      <view class="popup-content">
        <view class="all-check">
        </view>
        <uv-checkbox-group v-model="tagList.list" placement="column" labelSize="20px"
                            @change="tagsChange">
          <uv-checkbox v-for="(item, index) in tags.tags" :key="index" :name="item.name"
                       :label="item.name" style="padding: 6px;"></uv-checkbox>
        </uv-checkbox-group>
      </view>
    </uv-popup>
    <view class="sure-button-box">
      <button class="sure-button" :disabled="false" @click="onSubmit">发送</button>
    </view>
  </view>
</template>

<script setup>
import {ref, getCurrentInstance, watchEffect, reactive, computed} from 'vue'
import post from '@/api/post/index'
import { onReady } from '@dcloudio/uni-app';

const {proxy} = getCurrentInstance();
const userInfo = uni.getStorageSync('userInfo');

let formData = ref({
  userId: userInfo.id,
  postTitle:"",
  postText:"",
  tags: "其他", // 分隔符为;
  school: userInfo.university,
  region: userInfo.region,
  isPostAnonymous: 0, // 是否匿名（0代表不匿，1代表匿名）
  // postPhoto: [], //可以上传多张，限制：至少一张
})

const rule = reactive({
  postTitle: [{
    type:'string',
    required: false,
    message: '请输入标题',
    trigger: ['blur', 'change']
  }],

  postPhoto: [{
    type:'array',
    required: false,
    message: '请上传图片',
    trigger: ['blur', 'change']
  }],
})

// 图片列表
let imgList  = ref([]);
function imageListArray(lists, fileList, type){
  console.log("lists", lists)
  console.log("fileList", fileList)
  imgList.value = lists;
}

let picker = ref(null);
// 标签列表
let tagList = reactive({list: []})

function openAreaPicker() {
  console.log('打开地区选择器', proxy.areaTree.areaList)
  picker.value.open();
}
// 开启标签选择弹窗
function openTagsPicker() {
  popup.value.open();
}
const popup = ref(null);

function handleOk() {
  popup.value.close();
}
// 移除标签
function closeTags(index) {
  tagList.list.splice(index, 1)
}

// 整理数据
async function formateData() {
  // 标签数据处理
  if(tagList.list.length > 0){
    formData.value.tags = tagList.list.join(';')
  }else{
    formData.value.tags = "其他"
  }
  // 地区数据
  if(areaText.value == "选择地区"){
    formData.value.region = userInfo.region;
  }else{
    formData.value.region = areaText.value.replaceAll('/', ';');
  }
  console.info("formData123", formData.value)
  if(formData.value.isPostAnonymous){
    formData.value.isPostAnonymous = 1;
  }else{
    formData.value.isPostAnonymous = 0;
  }
  return true;
}
// 公共添加文件信息
async function pushFileList() {
    let fileList = []
    imgList.value.forEach(async item => {
        // 加载blob文件
        const imgBlob = await fetch(item.url).then(r => r.blob())
        // 循环生成file文件流
        fileList.push({
            url: item.url,
            info: new File([imgBlob], item.file.name, {
                type: item.file.type
            })
        })
    })
    return fileList
}
async function toFormData(formDataObject) {
  if (!formDataObject || typeof formDataObject !== 'object') {
    throw new Error('Invalid formDataObject provided to toFormData function');
  }
  
  const data = new FormData();
  Object.keys(formDataObject).forEach((key) => {
    const value = formDataObject[key];
    // 如果值是一个对象，并且不是文件，我们可能需要将它转换为 JSON 字符串
    if (typeof value === 'object' && !(value instanceof File)) {
      data.append(key, JSON.stringify(value));
    } else {
      // 对于文件和其他非对象类型，直接追加
      data.append(key, value);
    }
  });
  imgList.value.forEach((file, index) => {
    data.append(`postPhoto[${index}]`, file, file.name);
  });
  // 如果你需要在这里进行其他异步操作，可以使用await
  
  console.log("FormData has been prepared.");
  // 注意：由于FormData对象不易于直接查看其内容，console.log(data)可能不会给出你期望的输出
  return data;
}
// 发送贴子 
async function onSubmit() {
  const formedFlag = await formateData();
  if(formedFlag){
    proxy.http.upload(post.send, formData.value, imgList.value[0] ? imgList.value[0].url : null, "postPhoto" )
    .then(res => {
      res = JSON.parse(res);
      console.log(res);
      // 处理响应
      // post.userSend(params);
      if(res.code == 200){
        console.log("发送成功")
        uni.showToast({
          title: '发送成功',
          icon:'success',
          duration: 2000
        })
        setTimeout(() => {
            uni.navigateBack()
          }, 2000);
      }
      if(res.code == 400){
        uni.showToast({
          title: '发送失败',
          icon:'none',
          duration: 2000
        })
      }
    })
    .catch(error => {
      // 处理错误
      console.error(error);
    });
  }
  
  
}

let provinces = ref([]);
let citys = ref([]);
let areas = ref([]);
let pickerValue = ref([0, 0, 0])
let defaultValue = reactive([3442, 1, 2])
function getData() {
  provinces.value = proxy.areaTree.areaList.sort((left, right) => (Number(left.code) > Number(right.code) ? 1 : -1));
  handlePickValueDefault()
}
onReady(() => {
  getData();
})
function handlePickValueDefault() {
  // 设置省
  pickerValue.value[0] = provinces.value.findIndex(item => Number(item.id) === defaultValue[0]);
  // 设置市
  citys.value = provinces.value[pickerValue.value[0]]?.children || [];
  pickerValue.value[1] = citys.value.findIndex(item => Number(item.id) === defaultValue[1]);
  // 设置区
  areas.value = citys.value[pickerValue.value[1]]?.children || [];
  pickerValue.value[2] = areas.value.findIndex(item => Number(item.id) === defaultValue[2]);
  console.info('pickerValue', pickerValue.value)
  // 重置下位置
  picker.value.setIndexs([pickerValue.value[0], pickerValue.value[1], pickerValue.value[2]],true);
}

function change(e) {
  const { columnIndex, index, indexs } = e
  // 改变了省
  if (columnIndex === 0) {
    citys.value = provinces.value[index]?.children || []
    areas.value = citys.value[0]?.children || []
    picker.value.setIndexs([index, 0, 0],true)
  } else if (columnIndex === 1) {
    areas.value = citys.value[index]?.children || []
    picker.value.setIndexs(indexs,true)
  }
}
function open() {
  picker.value.open();
  this.handlePickValueDefault()
}
const areaText = ref('选择地区')
function confirm(e) {
  console.log('确认选择的地区：', e);
  uni.showToast({
    icon: 'none',
    title: `${e.value[0].name}/${e.value[1].name}/${e.value[2].name}`
  })
  // 保存地区的时候用 ; 分割
  areaText.value = `${e.value[0].name}/${e.value[1].name}/${e.value[2].name}`
}

const areaList = computed(() => {
  return [provinces.value, citys.value, areas.value];
})
</script>
<style scoped lang="scss">
.box-all{
  width: 100vw;
  height: 100vh;

  background:#FFF;
}
.input-view{
  position: fixed;
  left: 10px;
}

.tag-box{
  display: flex;
}
.item-content{
  width: 90%;
}
.content-box{
  padding: 0px 10px;
}


.header-title {
  height: 112rpx;
  font-size: var(--uni-font-size-16);
  font-weight: bold;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #E7E7E7;
  align-items: center;
  padding: 0 24rpx;
  .title {
    flex: 1;
    text-align: center;
  }

}

.popup-content {
  margin: 20rpx 24rpx;
  overflow: auto;
  height: 60vh;
}
.all-check {
  display: flex;
  align-items: center;
}


.view-text-align{
  text-align: right;
  color: var(--uni-text-input-color);
}
</style>