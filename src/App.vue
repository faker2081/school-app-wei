<script>
import {
  onLaunch,
  onShow,
  onHide, onReady,
} from '@dcloudio/uni-app'
import {reactive, ref} from "vue";
export default {
  setup(){
    onLaunch(() => {
      console.log('App Launch')
    })
    onShow(() => {
      console.log('App Show')
    })
    onHide(() => {
      console.log('App Hide')
    })
  }
}

</script>

<style lang="scss">
  @import '@/uni_modules/uv-ui-tools/index.scss';
	/*每个页面公共css */
	@import './uni.scss';
  @import "./static/iconfont/iconfont.css";
  @import '@climblee/uv-ui/index.scss';
</style>