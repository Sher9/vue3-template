import { defineConfig } from 'vite'
import path from 'path'
import createVitePlugins from './vite/plugins'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    base: './',
    resolve: {
      alias: {
        // 设置路径
        '~': path.resolve(__dirname, './'),
        // 设置别名
        "@": path.resolve(__dirname, "./src"),
        vue: 'vue/dist/vue.esm-bundler.js'
      },
      //导入时想要省略的扩展名列表
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    //解决  Warning @charset rule when using yarn build 
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove();
                }
              }
            }
          }
        ],
      },
    },
    //配置代理
    server: {
      host: '0.0.0.0',
      port: 8090,
      // proxy: {
      //   '/api': {
      //     target: 'http://10.64.7.122:17001', // 所要代理的目标地址
      //     rewrite: path => path.replace(/^\/api/, ''), // 重写传过来的path路径，比如 `/api/index/1?id=10&name=zs`（注意:path路径最前面有斜杠（/），因此，正则匹配的时候不要忘了是斜杠（/）开头的；选项的 key 也是斜杠（/）开头的）
      //     changeOrigin: true,  // true/false, Default: false - changes the origin of the host header to the target URL
      //   }
      // }
    },
    plugins: createVitePlugins(command === 'build'),
    build: {
      // 多页面打包配置
      rollupOptions: {
        input: {
          // 配置所有页面路径，使得所有页面都会被打包
          main: path.resolve(__dirname, 'index.html'),
          login: path.resolve(__dirname, 'login.html'),
        }
      },
      //生产环境去掉console.log
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      output: {
        // 去掉注释内容
        comments: true,
      },
    }
  }
})
