import { defineStore } from 'pinia'
import {ref,reactive} from "vue";
export const useUser =  defineStore('user',()=>{
    const userInfo = reactive({
        name:""
    })
    return{
        userInfo
    }

})
export default useUser