import { defineStore } from 'pinia'
import {ref,reactive,toRefs} from "vue";
export const useTabBar =  defineStore('tabbar',()=>{
    const tabbarItem = reactive({
        name:'home',
        type:''
    })

    return{
        ...toRefs(tabbarItem),
    }
},{
    unistorage: false // 开启后对 state 的数据读写都将持久化
})
export default useTabBar