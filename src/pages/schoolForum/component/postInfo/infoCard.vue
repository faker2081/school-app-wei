<template>
  <view>
    <view class="post-item">
      <view class="post-item__image" v-if="item.postPhotoUrl">
          <image  observeLazyLoad :showError="false" mode="widthFix" :src="baseUrl + item.postPhotoUrl" @tap="onPreviewImage(baseUrl + item.postPhotoUrl)">
            <!-- <template #error>
              
            </template> -->
          </image>
      </view>
      <view class="post-item__content">
        <view class="">
          <view class="content-text">
            <uv-read-more show-height="100px" :toggle="true" ref="readMore">
              <rich-text style="word-break: break-all;" class="content" :nodes="item.postText"></rich-text>
            </uv-read-more>
          </view>
        </view>
        <view class="post-item__content__interaction">
          <view class="interaction" @click="collect">
            <uv-icon v-if="item.isUserCollectPost" color="#3775F6" size="28" name="star-fill"></uv-icon>
            <uv-icon v-else size="28" name="star"></uv-icon>
            <text class="">{{ item.collectionNum }}</text>
          </view>
          <view class="interaction" @click="like">
            <uv-icon v-if="item.isUserLikePost" color="#F53F3F" size="28" name="thumb-up-fill"></uv-icon>
            <uv-icon v-else size="28" name="thumb-up"></uv-icon>
            <text class="">{{ item.likeNum }}</text>
          </view>
          <view class="interaction" @click="comment">
            <uv-icon size="28" name="chat"></uv-icon>
            <text class="">{{ item.commentNum }}</text>
          </view>
          
        </view>
        <view>
          <text class="post-item__content__time">{{ dayjs(item.postTime).format('YYYY年MM月DD日 HH:mm')  }}</text>
        </view>
      </view>
      
    </view>
    <view>
      <!-- 评论弹框 -->
      <uv-popup ref="commentRef" type="bottom" class="comment-pop" @change="onChangePop">
          <view class="comment-pop-content">
              <uv-input placeholder="请输入评论内容" border="surround" shape="circle" v-model="inputVal"
                  :focus="comtIptFocusStatus"></uv-input>
              <view class="send" :style="{ background: themeColor }" @click="sendComment">发送</view>
          </view>
      </uv-popup>
    </view>
      
  </view>
    
</template>
<script setup>
import { ref, getCurrentInstance } from 'vue'
import baseUrl from '@/api/env.js'
import { onReady } from '@dcloudio/uni-app'
import postApi from '@/api/post/index.js'

const {proxy} = getCurrentInstance();

console.info(baseUrl)
let props = defineProps({
  item: {
    type: Object,
    default: () => {}
  },
  themeColor: {
      type: String,
      default: '#1DBFB6'
  }
})
const userInfo = uni.getStorageSync("userInfo")
const readMore = ref(null)
onReady(() => {
  console.log('onReady')
  readMore.value.init()
})
//收藏
async function collect() {
  if(props.item.isUserCollectPost){
    props.item.collectionNum -= 1;
    props.item.isUserCollectPost = false;
    console.info(userInfo)
    let res = await proxy.http.asyncGet(postApi.cancelCollect(userInfo.id, props.item.id));
    if(res.code == 200){
      console.info('取消收藏成功')
    }else{
      console.info('取消收藏失败')
    }
  }else{
    props.item.collectionNum += 1;
    props.item.isUserCollectPost = true;
    console.info(userInfo)
    let res = await proxy.http.asyncGet(postApi.collect(userInfo.id, props.item.id));
    if(res.code == 200){
      console.info('收藏成功')
    }else{
      console.info('收藏失败')
    }
  }
}
// 点赞
async function like() {
  if(props.item.isUserLikePost){
    props.item.likeNum -= 1;
    props.item.isUserLikePost = false;
    console.info(userInfo)
    let res = await proxy.http.asyncGet(postApi.cancelLike(userInfo.id, props.item.id));
    if(res.code == 200){
      console.info('取消点赞成功')
    }else{
      console.info('取消点赞失败')
    }
  }else{
    props.item.likeNum += 1;
    props.item.isUserLikePost = true;
    console.info(userInfo)
    let res = await proxy.http.asyncGet(postApi.like(userInfo.id, props.item.id));
    if(res.code == 200){
      console.info('点赞成功')
    }else{
      console.info('点赞失败')
    }
  }
}

// 输入框的value
const inputVal = ref('')
function comment() {
  openPop()
}


// 评论弹窗相关
const commentRef = ref() // uni_popup 弹框实例
const comtIptFocusStatus = ref(false) // 评论输入框聚焦状态
/**
 * 弹框change事件
 */
 function onChangePop(e) {
    comtIptFocusStatus.value = e.show
}

/**
 * 关闭评论弹框
 * @param msg 提示信息 不传则不提示
 */
 function close(msg) {
    commentRef.value.close()
    inputVal.value = ''
    if (msg) uni.showToast({ title: msg, icon: 'none' })
}

/**
 * 打开评论弹框
 */
 function openPop() {
    commentRef.value.open()
}

// 预览图片
let onPreviewImage = (url)=> {

  uni.previewImage({
    // 先filter找出为图片的item，再返回filter结果中的图片url
    urls: [url],
  });
};

const emits = defineEmits(['refreshComments']);
// 评论
async function sendComment() {
  const commentForm = {
    commentText: inputVal.value,
    userId: userInfo.id,
    replyCommentId: null,
    postId: props.item.id,
    isCommentsAnonymous: 0
  }
  if (inputVal.value) {
    let res = await proxy.http.asyncPost(postApi.comment, commentForm);
    if (res.code == 200) {
      close('评论成功')
      props.item.commentNum += 1;
      emits("refreshComments");
    } else {
      close('评论失败')
    }
  }else {
    uni.showToast({ title: "评论信息不能为空！", icon: 'none' })
  }
}
</script>
<style scoped lang="scss">
.post-item {
  padding: 10px;
  // width: 200%;
  
  background: #f5f5f5;
  border-radius: 6px;
  &__image {
    display: flex; 
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    margin: 0 auto;
  }
  &__content {
    margin-top: 1px;
    padding: 15px;
    background: #fff;
    .content-text{
      font-size: 32rpx;
      color: #303133;
    }
    &__interaction{
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
    }
    &__time{
      padding-top: 2px;
      font-size: 22rpx;
      color: #999;
    }
  }
}

.error-text{
  display: flex;
}

.interaction{
  width: 200rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.comment-pop-content {
    height: 100rpx;
    width: 750rpx;
    background-color: #fff;
    display: flex;
    align-items: center;

    .send {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 120rpx;
        height: 40rpx;
        border-radius: 60rpx;
        font-size: 28rpx;
        font-weight: 500;
        color: #ffffff;
        margin-left: 18rpx;
    }
}
</style>