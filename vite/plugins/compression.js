import compression from 'vite-plugin-compression'

export default function createCompression() {
    const plugin = []
    plugin.push(
        compression({
            threshold: 1024, // 文件容量大于这个值进行压缩
            ext: '.gz',
            deleteOriginFile: false
        })
    )
    return plugin
}
