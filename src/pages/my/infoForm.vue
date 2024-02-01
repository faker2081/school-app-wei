<template>
  <view class="box-all">
    <Header title="编辑信息" ></Header>
    <scroll-view scroll-y :style="{'margin-top':40+'px'}" style="width: 90%; margin-left: 5%;">
      <uv-form labelWidth="97" :rules="rule" ref="form" :model="userInfo" errorType="message">
        <uv-form-item borderBottom label="昵称" prop="name">
          <uv-input v-model="userInfo.name" border="none" placeholder="请输入姓名"></uv-input>
        </uv-form-item>
        <uv-form-item borderBottom label="性别" prop="gender" @click="openSelect('gender')">
          <uv-input v-model="userInfo.gender" border="none" placeholder="请选择性别" readonly suffix-icon="arrow-right"></uv-input>
        </uv-form-item>
        <uv-form-item borderBottom label="生日" prop="birthday" @click="openSelect('birthday')"> 
          <uv-input v-model="userInfo.birthday" border="none" placeholder="请选择生日" readonly suffix-icon="arrow-right"></uv-input>
        </uv-form-item>
        <uv-form-item borderBottom label="地区" prop="region" @click="openSelect('region')"> 
          <uv-input v-model="areaText" border="none" placeholder="请选择地区" readonly suffix-icon="arrow-right"></uv-input>
        </uv-form-item>
        <!-- <uv-form-item borderBottom label="大学" prop="insertUniversity"> 

        </uv-form-item> -->
        <uv-form-item borderBottom label="头像" prop="photo"> 
          <ImageUpload :maxCount="1" @imageListArray="imageListArray"></ImageUpload>
        </uv-form-item>
        <uv-form-item borderBottom label="恋爱情况" prop="relationshipStatus" @click="openSelect('relationshipStatus')"> 
          <uv-input v-model="userInfo.relationshipStatus" border="none" placeholder="请选择恋爱情况" readonly suffix-icon="arrow-right"></uv-input>
        </uv-form-item>
      </uv-form>
    </scroll-view>
    <view class="sure-button-box">
      <button class="sure-button" :loading="loading" :disabled="loading" @click="updateUserInfo">确定</button>
    </view>

    <uv-picker ref="genderPicker" :columns="genderList" @confirm="confirm($event ,'gender')"></uv-picker>
    <uv-picker ref="relationshipStatusPicker" :columns="relationshipStatusList" @confirm="confirm($event, 'relationshipStatus')"></uv-picker>
    <uv-picker ref="areaPicker" :columns="areaList" keyName="name" @change="change" @confirm="areaConfirm"></uv-picker>
  </view>
</template>

<script setup>
import { ref, getCurrentInstance, reactive, computed } from 'vue'
import { onReady, onShow } from '@dcloudio/uni-app';
import userApi from '@/api/user/user.js'
import parse from '../../uni_modules/uview-plus/libs/config/props/parse';
const {proxy} = getCurrentInstance();

const relationshipStatusList = [["单身", "恋爱中", "秘密"]];
const genderList = [["男", "女", "秘密"]];

// 选择器 ref
const genderPicker = ref(null);
const relationshipStatusPicker  = ref(null);
const userInfo = ref(uni.getStorageSync('userInfo'));

// 按钮禁止
const loading = ref(false);

const rule = {};
 
function openSelect(pickerName){
  switch(pickerName){
    case 'gender': 
      genderPicker.value.open();
      break;
    case 'birthday': 
      birthdayPicker.value.open();
      break;
    case 'region': 
      areaPicker.value.open();
      break;
    case 'relationshipStatus': 
      relationshipStatusPicker.value.open();
      break;
  }
}

// 图片列表
let imgList  = ref([]);
function imageListArray(lists, fileList, type){
  console.log("lists", lists)
  console.log("fileList", fileList)
  imgList.value = lists;
}

async function formateData(){
  if(areaText.value){
    userInfo.value.region = areaText.value.replaceAll('/', ';')
  }
  let keys = Object.keys(userInfo.value)
  keys.forEach(key => {
    if(!userInfo.value[key]){
      userInfo.value[key] = '';
    }
  })
}
// 修改个人信息
async function updateUserInfo(){
  await formateData();
  console.log(imgList.value[0])
  proxy.http.upload(userApi.editInfo, userInfo.value, imgList.value[0] ? imgList.value[0].url : null, imgList.value[0] ? "photo" : '')
    .then(res => {
      res = JSON.parse(res)
      if(res.code == 200){
        //存用户信息
        uni.setStorageSync('userInfo', res.data);
        uni.showToast({
          title: res.msg,
          icon: 'success',
          duration: 1000
        })
        // 返回
        setTimeout(() => {
          uni.navigateBack({ delta: 1 });
        }, 1000)
      }else{
        uni.showToast({
          title: '修改失败' + res.msg,
          icon: 'error',
          duration: 1000
        })
      }
    })
  
}

function confirm(data, prickerName){
  switch(prickerName){
    case 'gender':
      userInfo.value.gender = data.value[0];
      break;
    case 'birthday':
      userInfo.value.birthday = data.value[0];
      break;
    case 'region':
      break;
    case 'relationshipStatus':
      userInfo.value.relationshipStatus = data.value[0];
      break;
  }
  console.log("用户信息", userInfo.value, data);
}
// 地区选择
const areaPicker = ref(null);
// 地区选择相关
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
  areaPicker.value.setIndexs([pickerValue.value[0], pickerValue.value[1], pickerValue.value[2]],true);
}

function change(e) {
  const { columnIndex, index, indexs } = e
  // 改变了省
  if (columnIndex === 0) {
    citys.value = provinces.value[index]?.children || []
    areas.value = citys.value[0]?.children || []
    areaPicker.value.setIndexs([index, 0, 0],true)
  } else if (columnIndex === 1) {
    areas.value = citys.value[index]?.children || []
    areaPicker.value.setIndexs(indexs,true)
  }
}
function open() {
  areaPicker.value.open();
  this.handlePickValueDefault()
}

const areaText = ref()
function areaConfirm(e) {
  console.log('确认选择的地区：', e);
  // uni.showToast({
  //   icon: 'none',
  //   title: `${e.value[0].name}/${e.value[1].name}/${e.value[2].name}`
  // })
  // 保存地区的时候用 ; 分割
  areaText.value = `${e.value[0].name}/${e.value[1].name}/${e.value[2].name}`
}

const areaList = computed(() => {
  return [provinces.value, citys.value, areas.value];
})


onShow(() => {
})
</script>

<style lang="scss" scoped>
.box-all{
  margin-top: 50px;
  height: 80vh;
}
</style>