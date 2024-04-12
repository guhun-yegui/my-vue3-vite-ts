import { App } from 'vue'
/*
 **全局注册组件
 ** 放在components/global文件夹下
 */
const modulesFiles = import.meta.glob('/src/component/global/*.vue', { eager: true })/// import.meta.globEager用来代替require因为vite不支持node语法require
const globalResult = Object.keys(modulesFiles).filter(item => true)
export default (app: App<Element>) => {
  globalResult.forEach(item => {
    const component = modulesFiles[item]?.default
    app.component(component.name, component)
  })
}
