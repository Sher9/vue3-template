import { createRouter, createWebHashHistory } from 'vue-router'
import views from 'virtual:generated-pages'
//公共路由由此配置
const commonRoutes = [
    {
        path: '/myiframe',
        name: 'myiframe',
        component: () => import('@/components/iframe.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),//hash模式
    routes: [...views, ...commonRoutes]
})

export default router