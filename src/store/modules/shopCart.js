import { defineStore } from 'pinia'
import {ref,reactive,toRefs} from "vue";
export const useShopCart =  defineStore('shopCart',()=>{
    const providerMap = reactive({
        goods:new Map(),
        provider: new Map(),
    });

    return{
        ...toRefs(providerMap),
    }
},{
    unistorage: true // 开启后对 state 的数据读写都将持久化
})
export default useShopCart