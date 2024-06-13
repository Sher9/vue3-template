import Pages from 'vite-plugin-pages'
export default function createPages() {
    const plugin = []
    plugin.push(
        Pages({
            // 这里可以配置插件选项，例如路由的目录等,这里我指定了遍历的文件夹是src/view目录
            dirs: [{ dir: 'src/views', baseRoute: '' }],
        })
    )
    return plugin
}
