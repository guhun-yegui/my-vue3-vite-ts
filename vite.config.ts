import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'
import { viteMockServe } from "vite-plugin-mock";
import { visualizer } from 'rollup-plugin-visualizer';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    viteMockServe({
			enable: false,
			logger: true,
			mockPath: "./src/mock/",
			supportTs: false

		}),
    visualizer({
      emitFile: false,
      filename: 'analysis-chart.html', // 分析图生成的文件名
      open:true // 如果存在本地服务端口，将在打包后自动展示
    })
  ],
  resolve: {
    alias: {
      '@': resolve('./src'),
    },
  }, //别名
  server: {
		cors: true, // 允许跨域
		host: "0.0.0.0",
		open: true, // 服务启动时是否自动打开浏览器
		port: 9999, // 服务端口号
		proxy: {
			"/api": {
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
				target: "http://127.0.0.1:9999/"
				// target: "http://localhost:8080/"

			}
		}
	},
  base: './', // 打包路径
  build: {
    target: 'es2015',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      output: {
        //设置打包后的路径
        entryFileNames: `js/app.[hash].js`,
        chunkFileNames: `js/chunk.[hash].js`,
        assetFileNames: `assets/[hash].[ext]`,
      },
    },
  },
})
