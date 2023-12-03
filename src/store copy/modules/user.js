import { defineStore } from 'pinia'
import {ref, reactive, toRefs} from "vue";
export const useUser =  defineStore('user',()=>{
    /**
     * name 姓名
     * type 角色类型
     * data 储存对象
     * */
    const userInfo = reactive({
        name:"",
        data:{},
        entId:'',
        permissions:[],
    })
    return{
        ...toRefs(userInfo),
    }

},{
    unistorage: true // 开启后对 state 的数据读写都将持久化
})
export default useUser