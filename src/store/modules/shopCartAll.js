import { defineStore } from 'pinia'
import {ref,reactive,toRefs} from "vue";
export const shopCartAll =  defineStore('shopCartAll',()=>{
    const userMap = ref(new Map);

    return{
        userMap
    }
},{
    unistorage: true // 开启后对 state 的数据读写都将持久化
})
export default shopCartAll