import vue from '@vitejs/plugin-vue'

import createAutoImport from './auto-import'
import createCompression from './compression'
import createSetupExtend from './setup-extend'
import createMockServer from './mock'
import createPages from './pages'
export default function createVitePlugins(isBuild = false) {
    const vitePlugins = [vue()]
    vitePlugins.push(createAutoImport())
    vitePlugins.push(createSetupExtend())
    isBuild && vitePlugins.push(...createCompression())
    vitePlugins.push(createMockServer())
    vitePlugins.push(createPages())
    return vitePlugins
}
