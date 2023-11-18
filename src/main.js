import {
    createSSRApp
} from "vue";
// main.js
import App from "./App.vue";
import Http from '@/utils/http.js'
import {createPinia} from "pinia";
import persist from 'pinia-plugin-persistedstate';
import uvUI from '@/uni_modules/uv-ui-tools'
import Validate from "@/utils/formValidate";
import DayJs from 'dayjs'
// 计算自定义高度容器流出
import TopHeight from "@/common/topHeight";
// 注册公共组件
import Header from "@/components/header/index.vue";
import HeaderSearch from "@/components/header/headerSearch.vue";
import Tabbar from "@/components/tabbar/index.vue";

export function createApp() {
    const app = createSSRApp(App);
    app.config.globalProperties.http = Http;
    app.config.globalProperties.topHeight = TopHeight;
    app.config.globalProperties.validate = Validate;
    app.config.globalProperties.dayjs = DayJs;
    const pinia = createPinia();
    pinia.use(persist)
    app.use(pinia)
    app.use(uvUI);
    app.component('Header', Header);
    app.component('HeaderSearch', HeaderSearch);
    app.component('Tabbar', Tabbar);
    return {
        app,
    };

}