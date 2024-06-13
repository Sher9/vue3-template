import { createApp } from 'vue'
import Login from './components/login.vue'
import store from './store'
import setupElement from './plugins/element'
const app = createApp(Login)
//初始化饿了么组件
setupElement(app)
app.use(store)
app.mount('#app')

