import {
    createSSRApp
} from "vue";
// main.js
import App from "./App.vue";
import Http from '@/utils/http.js'
import pinia from '@/store'
import Validate from "@/utils/formValidate";
import DayJs from 'dayjs';
import {globalDirective} from '@/utils/directives'
import cal from '@/utils/cal.js'
import ImageUpload from "@/components/imageUpload/index.vue"
import AreaTree from "@/data/area.js"
import Tags from "@/data/tages.js"

// 计算自定义高度容器流出
import TopHeight from "@/common/topHeight"
// 注册公共组件
import Header from "@/components/header/index.vue";
import HeaderSearch from "@/components/header/headerSearch.vue";
import HeaderUser from "@/components/header/headerUser.vue";
import Tabbar from "@/components/tabbar/index.vue";



export function createApp() {
    const app = createSSRApp(App);
    app.config.globalProperties.http = Http;
    app.config.globalProperties.topHeight = TopHeight;
    app.config.globalProperties.validate = Validate;
    app.config.globalProperties.dayjs = DayJs;
    app.config.globalProperties.store = pinia.store;
    app.config.globalProperties.areaTree = AreaTree;
    app.config.globalProperties.tags = Tags;
    app.use(pinia.init);
    app.config.globalProperties.globalDirective = globalDirective;
    app.config.globalProperties.cal = cal;
    app.component('Header', Header);
    app.component('HeaderSearch', HeaderSearch);
    app.component('HeaderUser', HeaderUser);
    app.component('Tabbar', Tabbar);
    app.component('ImageUpload', ImageUpload);

    app.directive('hasPermission', {
        mounted(el, binding, VNode, prevNode) {
            const {
                value
            } = binding
            const all_permission = "*:*:*";
            const permissions = pinia.store().userStore.permissions;
            console.log(permissions)
            if (value && value instanceof Array && value.length > 0) {
                const permissionFlag = value;
                console.log(value)
                const hasPermissions = permissions.some(permission => {
                    return all_permission === permission || permissionFlag.includes(permission)
                })
                if (!hasPermissions) {
                    el.parentNode && el.parentNode.removeChild(el)
                }
            } else {
                throw new Error(`请设置操作权限标签值`)
            }
        },
    })
    return {
        app,
    };
}