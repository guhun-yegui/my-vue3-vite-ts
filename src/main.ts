import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import "@/styles/index.scss";
import components from '@/components/global/index'
import '@/styles/font/iconfont.css';
import "element-plus/dist/index.css";
createApp(App).use(store).use(router).use(components).mount('#app')
