import { createApp } from 'vue'
import './assets/style/index.css'
import './assets/style/element.css'
import App from './App.vue'
import router from './router';
import store from './store'
import setupElement from './plugins/element'
import { downloadFile } from '@/util/request'
import { getDictValue } from '@/util/dict'
import { vaildData } from "@/util/index";
import gridLayout  from 'vue-grid-layout' 
const app = createApp(App)
// 全局方法挂载
app.config.globalProperties.downloadFile = downloadFile
app.config.globalProperties.getDictValue = getDictValue
app.config.globalProperties.vaildData = vaildData

app.use(router)
app.use(store)
//初始化饿了么组件
setupElement(app)
app.use(gridLayout)
app.mount('#app')
