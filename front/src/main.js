import { createApp } from 'vue'
import App from './App.vue'

//创建并挂载根实例
const app = createApp(App);

//ElementPlus
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
app.use(ElementPlus);

//CSS
import './assets/main.css'

//路由
import router from "./router/index.js";
app.use(router);

app.mount('#app');