import { defineStore } from 'pinia'
import {ref,reactive,toRefs} from "vue";
export const useParam =  defineStore('param',()=>{
    const param = ref(null);

    return{
        param
    }
},{
    unistorage: false // 开启后对 state 的数据读写都将持久化
})
export default useParam