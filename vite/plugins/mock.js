import { viteMockServe } from 'vite-plugin-mock'
export default function createMockServer() {
    const plugin = []
    plugin.push(
        viteMockServe({
            supportTs: false,
            logger: false,
            mockPath: "./mock/"
        })
    )
    return plugin
}
