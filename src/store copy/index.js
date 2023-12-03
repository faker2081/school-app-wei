// 导入pinia
import * as Pinia from 'pinia';
import { createUnistorage } from '@/uni_modules/pinia-plugin-unistorage'
// 模块引用
import useUserStore from "@/store/modules/user";
import useTabBar from "@/store/modules/tabbar";
import useShopCartAll from "@/store/modules/shopCartAll";                // 购物车相关
import useShopCart from "@/store/modules/shopCart";                // 购物车相关
import useParam from "@/store/modules/param";                      // 传参相关
// 持久化存储
const pinia = {
    init:Pinia.createPinia(),
    store:()=>{
        return {
            userStore: useUserStore(),
            tabbar: useTabBar(),
            shopCartAll: useShopCartAll(),
            shopCart: useShopCart(),
            useParam: useParam()
        }
    }
};
pinia.init.use(createUnistorage());

export default pinia

