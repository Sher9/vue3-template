import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default (app) => {
    //引入饿了么图标
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component)
    }
    // 使用element-plus 并且设置全局的大小
    app.use(ElementPlus, {
        locale: locale,
        // 支持 large、default、small
        size: 'small'
    })
    app.config.globalProperties.$icon = ElementPlusIconsVue
}